import * as React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import theme from './theme';
import { ThemeProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
