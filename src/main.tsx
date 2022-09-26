import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { EthereumProvider } from './context/EthereumContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <EthereumProvider>
      <App />
    </EthereumProvider>
  </React.StrictMode>
);
