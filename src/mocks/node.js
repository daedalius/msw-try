import { setupServer } from 'msw/node';
import { handlers } from './mockHandlers';

export const server = setupServer(...handlers);

beforeAll(() => {
  // Enable mocking.
  server.listen();
});

afterEach(() => server.resetHandlers());

afterAll(() => {
  // Clean up once the tests are done.
  server.close();
});
