import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './components/app/app';
import store from './services/store';
import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

root.render(
  <Provider store={store}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
