import { useEffect, useState } from 'react';

import { findAll } from '../../api/transactions';
import {
  AgregatedTransaction,
  Transaction,
} from '../../api/transactions.types';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';
import { ReactComponent as FilterIcon } from '../../assets/filter.svg';
import { Modal } from '../../components';
import './transactions.less';
import Loader from '../../components/loader/loader';

type ListProps = {
  data: AgregatedTransaction[];
  handleSelect(transaction: Transaction): void;
};
const List: React.FC<ListProps> = (props) => {
  const { data, handleSelect } = props;

  return (
    <ul className="agregated-list-wrapper">
      {data.map(({ date, transactions }) => (
        <li key={date} className="agregated-list">
          <p className="agregated-list__title">{date}</p>
          <table>
            {transactions.map((transaction) => (
              <tr
                className="agregated-list__transaction"
                onClick={() => handleSelect(transaction)}
              >
                <td className="agregated-list__text">
                  <p>{transaction.title}</p>
                </td>
                <td className="agregated-list__text">
                  <p>{transaction.description}</p>
                </td>
                <td className="agregated-list__text">
                  <p>{transaction.status}</p>
                </td>
                <td className="agregated-list__text">
                  <p>{transaction.amount}</p>
                </td>
              </tr>
            ))}
          </table>
        </li>
      ))}
    </ul>
  );
};

type TransactionModalProps = {
  transaction?: Transaction;
  isVisible: boolean;
  onClose(): void;
};
const TransactionModal: React.FC<TransactionModalProps> = (props) => {
  const { transaction, isVisible, onClose } = props;

  return (
    <Modal title={transaction?.title} isVisible={isVisible} onClose={onClose}>
      <div className="transaction-modal">
        <p>{transaction?.status}</p>
        <div>
          <p className="transaction-modal-title">Transferido de</p>
          <span className="transaction-modal-values">
            <p>{transaction?.from}</p>
            <p className="transaction-modal-values-amount">
              {transaction?.amount}
            </p>
          </span>
        </div>
        <div>
          <p className="transaction-modal-title">Para</p>
          <span className="transaction-modal-values">
            <p>{transaction?.to}</p>
            <p className="transaction-modal-values-amount">
              {transaction?.amount}
            </p>
          </span>
        </div>
      </div>
    </Modal>
  );
};

export const Transactions = () => {
  const [transactions, setTransactions] = useState<AgregatedTransaction[]>();
  const [isLoading, setLoading] = useState(false);
  const [erroModal, setErrorModal] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<
    Transaction | undefined
  >();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const transactions = await findAll();
        setTransactions(transactions);
      } catch (error) {
        setErrorModal(true);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <>
      <div className="filter">
        <SearchIcon className="filter-icon" />
        <input className="filter-input" placeholder="ex: Depósito" />
        <button className="filter-button">
          <FilterIcon className="filter-button-icon" />
        </button>
      </div>
      <div className="wrapper">
        <Loader isVisible={isLoading} />
        {transactions && (
          <List
            data={transactions}
            handleSelect={(transaction) => setCurrentTransaction(transaction)}
          />
        )}
      </div>
      <TransactionModal
        transaction={currentTransaction}
        isVisible={currentTransaction ? true : false}
        onClose={() => setCurrentTransaction(undefined)}
      />
      <Modal
        isVisible={erroModal}
        onClose={() => setErrorModal(false)}
        title="Ops, algo deu errado!"
      >
        <p>Erro ao efetuar requisição. Tente novamente mais tarde.</p>
        <Modal.Button onClick={() => setErrorModal(false)}>Certo!</Modal.Button>
      </Modal>
    </>
  );
};

export default Transactions;
