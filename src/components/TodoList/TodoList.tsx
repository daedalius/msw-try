import * as React from 'react';
import { TodoItem } from './components/TodoItem';
import { TodoItemProps } from './components/TodoItem/interfaces';

import * as api from './utils/api';

import './styles.css';

export const TodoList = React.memo(() => {
  const [todoItems, setTodoItems] = React.useState(undefined);

  React.useEffect(() => {
    api.getAllTodoItems().then((todoItems) => {
      setTodoItems(todoItems);
    });
  }, []);

  const handleTodoItemToggle = React.useCallback(
    (toggledTodoItem: TodoItemProps) => {
      api.updateTodoItem({ ...toggledTodoItem, checked: !toggledTodoItem.checked }).then((todoItems) => {
        setTodoItems(todoItems);
      });
    },
    [todoItems, setTodoItems]
  );

  const handleTodoItemRemove = React.useCallback(
    (removedTodoItem: TodoItemProps) => {
      api.removeTodoItem(removedTodoItem).then((todoItems) => {
        setTodoItems(todoItems);
      });
    },
    [todoItems, setTodoItems]
  );

  if(todoItems === undefined) {
    return <div>loading...</div>
  }

  if(todoItems.length === 0) {
    return <div>the list is empty</div>
  }

  return (
    <ul className="todo-list">
      {todoItems.map((item) => (
        <TodoItem
          key={item.text}
          text={item.text}
          checked={item.checked}
          onToggle={handleTodoItemToggle}
          onRemove={handleTodoItemRemove}
        />
      ))}
    </ul>
  );
});
