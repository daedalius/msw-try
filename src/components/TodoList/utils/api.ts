import { Todo } from '../interfaces';

export function getAllTodoItems(): Promise<Array<Todo>> {
  return fetch('http://127.0.0.1/todoList')
    .then((response) => response.json())
    .then((body) => body.items);
}

export function updateTodoItem(todoItem: Todo): Promise<Array<Todo>> {
  return fetch('http://127.0.0.1/todoList', { method: 'PUT', body: JSON.stringify(todoItem) })
    .then((response) => response.json())
    .then((body) => body.items);
}

export function removeTodoItem(todoItem: Todo): Promise<Array<Todo>> {
  return fetch('http://127.0.0.1/todoList', { method: 'DELETE', body: JSON.stringify(todoItem) })
    .then((response) => response.json())
    .then((body) => body.items);
}
