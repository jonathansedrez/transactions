import axios from 'axios';

import {
  AgregatedTransaction,
  Transaction,
  Status,
} from './transactions.types';
import { filterTransaction } from '../utils/filters';

export const BASE_URL = 'https://warren-transactions-api.herokuapp.com/api/';

export const findById = async (id: string): Promise<Transaction> => {
  return await axios
    .get(`${BASE_URL}/transactions/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => error);
};

export const findAll = async (filter?: {
  title?: string;
  status?: Status;
}): Promise<AgregatedTransaction[]> => {
  return await axios
    .get(`${BASE_URL}/transactions`)
    .then((response) => {
      const transactions: Transaction[] = response.data;

      const dates = transactions.map((transaction) => transaction.date);

      let agregatedTransaction: AgregatedTransaction[] = [];

      dates.forEach((date, index) => {
        if (dates.indexOf(date) === index) {
          agregatedTransaction.push({
            date: date,
            transactions: [],
          });
        }
      });

      agregatedTransaction = agregatedTransaction.map((agregated) => {
        const filteredTransactions = transactions.filter(
          (transaction) =>
            transaction.date === agregated.date &&
            filterTransaction(transaction.title, filter?.title) &&
            filterTransaction(transaction.status, filter?.status)
        );
        return {
          date: agregated.date,
          transactions: filteredTransactions,
        };
      });

      const validTransactions = agregatedTransaction.filter(
        (transaction) => transaction.transactions.length > 0
      );

      return validTransactions;
    })
    .catch((error) => error);
};
