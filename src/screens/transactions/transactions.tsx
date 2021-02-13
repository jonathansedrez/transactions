import { useCallback, useEffect, useState } from 'react';

import { findAll } from '../../api/transactions';
import {
  AgregatedTransaction,
  Transaction,
  Status,
} from '../../api/transactions.types';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';
import { ReactComponent as FilterIcon } from '../../assets/filter.svg';
import { parseAmount } from '../../utils';
import { useDebounce } from '../../hook';
import {
  Modal,
  Loader,
  ProgressBar,
  StatusTag,
  Dropdown,
} from '../../components';
import './transactions.less';

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
          <p className="agregated-list-title">{date}</p>
          <table>
            <tbody>
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="agregated-list-transaction"
                  onClick={() => handleSelect(transaction)}
                >
                  <td className="agregated-list-text">
                    <p>{transaction.title}</p>
                  </td>
                  <td className="agregated-list-text agregated-list-description">
                    <p>{transaction.description}</p>
                  </td>
                  <td className="agregated-list-text agregated-list-status">
                    <StatusTag status={transaction.status} />
                  </td>
                  <td className="agregated-list-text agregated-list-amount">
                    <p>{parseAmount(transaction.amount)}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </li>
      ))}
    </ul>
  );
};

type DetailsProps = {
  transaction?: Transaction;
  isVisible: boolean;
  onClose(): void;
};
const Details: React.FC<DetailsProps> = (props) => {
  const { transaction, isVisible, onClose } = props;

  return (
    <Modal title={transaction?.title} isVisible={isVisible} onClose={onClose}>
      <div className="details">
        <ProgressBar status={transaction?.status} />
        <div>
          <p className="details-title">Transferido de</p>
          <span className="details-values">
            <p>{transaction?.from}</p>
            <p className="details-values-amount">
              {parseAmount(transaction?.amount || 0)}
            </p>
          </span>
        </div>
        <div>
          <p className="details-title">Para</p>
          <span className="details-values">
            <p>{transaction?.to}</p>
            <p className="details-values-amount">
              {parseAmount(transaction?.amount || 0)}
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
  const [isFitlerActive, setFilterActive] = useState(false);
  const [erroModal, setErrorModal] = useState(false);
  const [filter, setFilters] = useState<{ title?: string; status?: Status }>();
  const [currentTransaction, setCurrentTransaction] = useState<
    Transaction | undefined
  >();

  const debouncedTitleFilter = useDebounce(filter?.title || '');

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const transactions = await findAll({
        status: filter?.status,
        title: filter?.title,
      });
      setTransactions(transactions);
    } catch (error) {
      setErrorModal(true);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter?.status, debouncedTitleFilter]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <>
      <div className="filter">
        <SearchIcon className="filter-search-icon" />
        <input
          className="filter-input"
          placeholder="ex: Depósito"
          data-testid="filter-input"
          onChange={(e) =>
            setFilters((previousFilters) => ({
              status: previousFilters?.status,
              title: e.target.value.toLowerCase(),
            }))
          }
        />
        <div
          className={['filter-button', isFitlerActive && 'filter--active'].join(
            ' '
          )}
        >
          <button
            className="filter-button-icon"
            onClick={() => {
              setFilterActive((isActive) => !isActive);
            }}
          >
            <FilterIcon />
          </button>
          <Dropdown
            onClick={(value) =>
              setFilters((previousFilters) => ({
                title: previousFilters?.title,
                status: value as Status,
              }))
            }
            data={[
              { key: '', value: 'Nenhum' },
              { key: 'created', value: 'Solicitado' },
              { key: 'processed', value: 'Concluído' },
              { key: 'processing', value: 'Processando' },
            ]}
          />
        </div>
      </div>
      <div className="wrapper">
        <Loader isVisible={isLoading} />
        {transactions?.length && !isLoading ? (
          <List
            data={transactions}
            handleSelect={(transaction) => setCurrentTransaction(transaction)}
          />
        ) : null}
      </div>
      <Details
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
