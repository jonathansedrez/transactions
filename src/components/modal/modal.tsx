import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import './modal.less';

export interface ButtonProps {
  children: ReactNode;
  onClick(): void;
}
export const Button = (props: ButtonProps) => {
  const { children, onClick } = props;
  return (
    <button className="modal-button" onClick={onClick}>
      {children}
    </button>
  );
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
    <>
      {isVisible &&
        ReactDOM.createPortal(
          <div className="modal-overlay">
            <div className="modal-card">
              <CloseIcon className="modal-close-icon" onClick={onClose} />
              {title && <h2 className="modal-title">{title}</h2>}
              {children}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

Modal.Button = Button;

export default Modal;
