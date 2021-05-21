import * as React from 'react';
import { TodoItemProps } from './interfaces';

import './styles.css';

export const TodoItem = React.memo((props: TodoItemProps) => {
  const { text, checked, onToggle, onRemove } = props;

  const handleToggle = React.useCallback(() => {
    onToggle(props);
  }, [text, onToggle]);

  const handleRemove = React.useCallback(() => {
    onRemove(props);
  }, [text, onRemove]);

  return (
    <li className="todo-item">
      <label className="todo-item__content">
        <input type="checkbox" onChange={handleToggle} checked={checked} />
        {text}
        <button className="todo-item__remove" onClick={handleRemove}>
          remove
        </button>
      </label>
    </li>
  );
});
