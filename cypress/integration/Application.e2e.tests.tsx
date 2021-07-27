import { SetupWorkerApi } from 'msw/lib/types/setupWorker/glossary';

describe('Application', () => {
  afterEach(() => {
    cy.window().then((win) => {
      const worker: SetupWorkerApi = win.msw.worker;
      worker.resetHandlers();
    });
  });

  it('renders welcome message', () => {
    cy.visit('/');
    cy.contains('to-do list').should('be.visible');
  });

  it('App lets check an item', () => {
    cy.visit('/');

    cy.window().then((win) => {
      const worker: SetupWorkerApi = win.msw.worker;
      const rest: any = win.msw.rest;

      worker.use(
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

      cy.contains('123').find('input').click();
      cy.contains('123').find('input').should('be.checked');
    });
  });
});
