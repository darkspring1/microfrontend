import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// render micro frontend function
window.renderCreatereactapp = (containerId, history) => {
  const root = ReactDOM.createRoot(document.getElementById(containerId));
  root.render(<App history={history}/>);
  // serviceWorker.unregister();
};

// unmount micro frontend function
window.unmountCreatereactapp = containerId => {
  debugger
  const root = ReactDOM.createRoot(document.getElementById(containerId));
  root.unmount(document.getElementById(containerId));
};

// Mount to root if it is not a micro frontend
if (!document.getElementById('Createreactapp-container')) {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<React.StrictMode><App /></React.StrictMode>);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
