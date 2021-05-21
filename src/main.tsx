import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Application } from '#components/Application';

function prepare(): Promise<void> {
  // @ts-ignore
  if (process.env.NODE_ENV !== 'production') {
    // @ts-ignore
    const { worker } = require('./mocks/browser');
    return worker.start();
  }

  return Promise.resolve();
}

prepare().then(() => {
  ReactDOM.render(<Application />, window.document.querySelector('#app'));
});
