import { ReactComponent as Archive } from '../../assets/archive.svg';
import './emptyState.less';

export const EmptyState = () => {
  return (
    <div className="empty-state-wrapper" data-testid="empty-state">
      <Archive className="empty-state-icon" />
      <h2 className="empty-state-title">Nenhum resultado encontrado</h2>
      <p className="empty-state-subtitle">
        Tente ajustar os filtros para encontrar o que está buscando
      </p>
    </div>
  );
};

export default EmptyState;
