import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ToastContainer } from 'react-toastify';
import { AppProvider } from './contexts/AppContext';
import 'react-toastify/dist/ReactToastify.css';
import { ServicesProvider } from './contexts/ServiceContext'
import { ProductsProvider } from './contexts/ProductContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>
      <ServicesProvider>
        <ProductsProvider>
        <ToastContainer />
        <App />
        </ProductsProvider>
      </ServicesProvider>
    </AppProvider>
  </React.StrictMode>
);




