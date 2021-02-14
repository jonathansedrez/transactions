import { useState, useRef } from 'react';

import { ReactComponent as Chevron } from '../../assets/chevron.svg';
import './dropdown.less';

export interface Option {
  key: string;
  value: string;
}

export interface DropdownProps {
  data: Option[];
  onClick(key: string): void;
}

export const Dropdown = (props: DropdownProps) => {
  const { data, onClick } = props;

  const [current, setCurrent] = useState('');
  const [isVisible, setVisible] = useState(false);

  const dropdown = useRef(null);

  return (
    <div className="dropdown-wrapper" ref={dropdown}>
      <input
        className="dropdown-header"
        data-testid="dropdown"
        value={current || 'Status'}
        onClick={() => setVisible(!isVisible)}
        readOnly
      />
      <Chevron
        className="dropdown-chevron"
        onClick={() => setVisible(!isVisible)}
      />
      {isVisible && (
        <ul className="dropdown-list">
          {data.map((option) => (
            <li
              className="dropdown-list-item"
              key={option.key}
              onClick={() => {
                setVisible(false);
                onClick(option.key);
                setCurrent(option.value);
              }}
            >
              {option.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
