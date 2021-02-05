import './progressBar.less';
import { Status } from '../../api/transactions.types';

export interface ProgressBarProps {
  status?: Status;
}
export const ProgressBar = (props: ProgressBarProps) => {
  const { status } = props;

  return (
    <>
      {status && (
        <div className="progress-bar-wrapper">
          <div className={['progress-bar', `--${status}`].join(' ')} />
          <div className="progress-text-wrapper">
            <p
              className={[
                'progress-text',
                status === 'created' && '--active',
              ].join(' ')}
            >
              Solicitado
            </p>
            <p
              className={[
                'progress-text',
                status === 'processing' && '--active',
              ].join(' ')}
            >
              Processando
            </p>
            <p
              className={[
                'progress-text',
                status === 'processed' && '--active',
              ].join(' ')}
            >
              Concluída
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProgressBar;
