import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';



const extendWindow = () => {
  const w: any = window

  w.roots = {}
  w.renderBrowse = (containerId: string, history: any) => {
    const mfRoot = createRoot(document.getElementById(containerId)!)
    mfRoot.render(<App history={history} />);
    w.roots[containerId] = mfRoot
    // unregister();
  };
  
  w.unmountBrowse = (containerId: string) => {
    if(w.roots[containerId]) {
      const mfRoot: Root = w.roots[containerId]
      mfRoot.unmount()
    }
  };
}

extendWindow()

const root = createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
