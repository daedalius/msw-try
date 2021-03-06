import { rest } from 'msw';

import * as todoListMocks from '../components/TodoList/mocks';

let appState = {
  todoListItems: todoListMocks.prefilled,
};

export const handlers = [
  // TODO: move to TodoList mocks folder
  rest.get('http://127.0.0.1/todoList', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ items: appState.todoListItems }));
  }),
  // TODO: move to TodoList mocks folder
  rest.delete('http://127.0.0.1/todoList', (req, res, ctx) => {
    const todoItemToRemove = JSON.parse(req.body);
    appState = {
      ...appState,
      todoListItems: appState.todoListItems.filter(todo => todo.text !== todoItemToRemove.text)
    }

    return res(ctx.status(200), ctx.json({ items: appState.todoListItems }));
  }),
  // TODO: move to TodoList mocks folder
  rest.put('http://127.0.0.1/todoList', (req, res, ctx) => {
    const todoItemToUpdate = JSON.parse(req.body);
    appState = {
      ...appState,
      todoListItems: appState.todoListItems.map(todo => todo.text === todoItemToUpdate.text ? todoItemToUpdate : todo)
    }

    return res(ctx.status(200), ctx.json({ items: appState.todoListItems }));
  })
];
