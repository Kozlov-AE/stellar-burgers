import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './components/app/app';
import store from './services/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

// For push
root.render(
  <Provider store={store}>
    <BrowserRouter
      basename={process.env.PUBLIC_PATH ? process.env.PUBLIC_PATH : '/'}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
