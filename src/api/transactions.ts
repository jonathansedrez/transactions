import axios from 'axios';

import {
  AgregatedTransaction,
  Transaction,
  Filters,
} from './transactions.types';
import { filterTransaction } from '../utils/filters/filters';

export const BASE_URL = 'https://warren-transactions-api.herokuapp.com/api';

export const groupDates = (
  transactions: Transaction[],
  filters?: Filters
): AgregatedTransaction[] => {
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
        filterTransaction(transaction.title.toLowerCase(), filters?.title) &&
        filterTransaction(transaction.status, filters?.status)
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
};

export const findAll = async (
  filters?: Filters
): Promise<AgregatedTransaction[]> => {
  return await axios
    .get(`${BASE_URL}/transactions`)
    .then((response) => {
      const transactions: Transaction[] = response.data;
      return groupDates(transactions, filters);
    })
    .catch((error) => {
      throw Error(error);
    });
};
