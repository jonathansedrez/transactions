import { useState } from 'react';
import { findAll } from '../../api/transactions';
import { AgregatedTransaction } from '../../api/transactions.types';
import './transactions.less';

type ListProps = {
  data: AgregatedTransaction[];
};
const List: React.FC<ListProps> = (props) => {
  const { data } = props;

  return (
    <ul>
      {data.map(({ date, transactions }) => (
        <li key={date} className="list">
          <p>{date}</p>
          {transactions.map((transaction) => (
            <div key={transaction.id}>
              <p>{transaction.title}</p>
              <p>{transaction.description}</p>
              <p>{transaction.status}</p>
              <p>{transaction.amount}</p>
            </div>
          ))}
        </li>
      ))}
    </ul>
  );
};

export const Transactions = () => {
  const [transactions, setTramsactions] = useState<AgregatedTransaction[]>();
  const [isLoading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const transactions = await findAll();
      setTramsactions(transactions);
    } catch (error) {
      console.log('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      {isLoading && <h2>CARREGANDO</h2>}

      {transactions && <List data={transactions} />}

      <button onClick={handleClick}>Click</button>
    </div>
  );
};

export default Transactions;
