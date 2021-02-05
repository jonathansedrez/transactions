import { useEffect, useState } from 'react';

import { findAll } from '../../api/transactions';
import { AgregatedTransaction } from '../../api/transactions.types';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';
import { ReactComponent as FilterIcon } from '../../assets/filter.svg';
import { Modal } from '../../components';
import './transactions.less';

type ListProps = {
  data: AgregatedTransaction[];
};
const List: React.FC<ListProps> = (props) => {
  const { data } = props;

  return (
    <ul className="agregated-list-wrapper">
      {data.map(({ date, transactions }) => (
        <li key={date} className="agregated-list">
          <p className="agregated-list__title">{date}</p>
          <>
            <table>
              {transactions.map((transaction) => (
                <tr className="agregated-list__transaction">
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
          </>
        </li>
      ))}
    </ul>
  );
};

export const Transactions = () => {
  const [transactions, setTransactions] = useState<AgregatedTransaction[]>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const transactions = await findAll();
        setTransactions(transactions);
      } catch (error) {
        console.log('error');
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
        {isLoading && <h2>CARREGANDO</h2>}
        {transactions && <List data={transactions} />}
      </div>
      <Modal isVisible={true} onClose={() => console.log('cliose')}>
        <p>teste</p>
      </Modal>
    </>
  );
};

export default Transactions;
