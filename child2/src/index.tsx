import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MicroFrontend } from './common/microfrontend';

const microfrontendName = 'createreactapp'

const appFactory = (history: any) => {
  return <React.StrictMode><App /></React.StrictMode>
}
MicroFrontend.create(microfrontendName, appFactory)

// render micro frontend function

// Mount to root if it is not a micro frontend
if (!document.getElementById(`${microfrontendName}-container`)) {
  debugger
  const root = ReactDOM.createRoot(document.getElementById('root')!);
  root.render(<React.StrictMode><App /></React.StrictMode>);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
