import * as React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';

import { rest } from 'msw';
import { server } from '../../mocks/node';

import { Application } from './Application';
import { act } from 'react-dom/test-utils';

test('Application component renders welcome message', async () => {
  server;
  const { findByLabelText } = render(<Application />);

  const element = await findByLabelText('Do shopping')

  expect(element).toBeInTheDocument();
});

test('App lets check an item', async () => {
  server.use(
    rest.get('http://127.0.0.1/todoList', (req, res, ctx) =>
      res.once(
        ctx.status(200),
        ctx.json({
          items: [
            {
              text: '123',
              checked: false,
            },
            {
              text: '456',
              checked: false,
            },
          ],
        })
      )
    ),
    rest.put('http://127.0.0.1/todoList', (req, res, ctx) =>
      res.once(
        ctx.status(200),
        ctx.json({
          items: [
            {
              text: '123',
              checked: true,
            },
            {
              text: '456',
              checked: false,
            },
          ],
        })
      )
    )
  );

  const { findByLabelText } = render(<Application />);

  const element = await findByLabelText('123')
  act(() => {
    element.click()
  })

  await waitFor(async () =>  {
     const element = await findByLabelText('123')
     expect(element).toBeChecked()
  })
});
