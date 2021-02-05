import './status.less';
import { Status as StatusType } from '../../api/transactions.types';

enum StatusParsed {
  'created' = 'Solicitado',
  'processing' = 'Processando',
  'processed' = 'Concluído',
}

export interface StatusProps {
  status: StatusType;
}
export const Status = (props: StatusProps) => {
  const { status } = props;

  return (
    <span className="status">
      <p className={`status--${status}`}>{StatusParsed[status]}</p>
    </span>
  );
};

export default Status;
