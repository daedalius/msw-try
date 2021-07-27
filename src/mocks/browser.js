import { setupWorker, rest } from 'msw';
import { handlers } from './mockHandlers';

export const worker = setupWorker(...handlers);

// Exposing methods globally to make them available in integration tests
window.msw = { worker, rest };
