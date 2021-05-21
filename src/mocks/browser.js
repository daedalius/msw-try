import { setupWorker } from 'msw';
import { handlers } from './mockHandlers';

export const worker = setupWorker(...handlers);
