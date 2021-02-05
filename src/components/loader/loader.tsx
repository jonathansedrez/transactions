import { ReactComponent as LoaderIcon } from '../../assets/loader.svg';
import './loader.less';

export interface LoaderProps {
  isVisible: boolean;
}
export const Loader = (props: LoaderProps) => {
  const { isVisible } = props;

  return (
    <>
      {isVisible && (
        <div className="loading">
          <LoaderIcon className="loading-icon" />
        </div>
      )}
    </>
  );
};

export default Loader;
