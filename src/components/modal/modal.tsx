import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import './modal.less';

export interface ButtonWrapperProps {
  children: ReactNode;
}
export const ButtonWrapper = (props: ButtonWrapperProps) => {
  const { children } = props;
  return <button>{children}</button>;
};

export interface ModalProps {
  children: ReactNode;
  onClose(): void;
  isVisible: boolean;
  title?: string;
}
export const Modal = (props: ModalProps) => {
  const { children, title, onClose, isVisible } = props;

  return (
    <React.Fragment>
      {isVisible &&
        ReactDOM.createPortal(
          <div className="modal-overlay" onClick={onClose}>
            <div className="modal-card">
              {title && <h2 className="modal-title">{title}</h2>}
              {children}
            </div>
          </div>,
          document.body
        )}
    </React.Fragment>
  );
};

Modal.ButtonWrapper = ButtonWrapper;

export default Modal;
