import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

//<React.StrictMode>...</React.StrictMode> tags were removed temporary to remove twice rendering of the app.
root.render(
  <Provider store={store}>
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders:opsz,wght@10..72,100..900&display=swap');
    </style>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
