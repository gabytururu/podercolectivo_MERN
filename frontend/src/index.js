import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'
import { QuejasContextProvider } from './Context/QuejasContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QuejasContextProvider>
      <App />
    </QuejasContextProvider>
  </React.StrictMode>
);


