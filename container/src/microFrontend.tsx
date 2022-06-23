import React, { useEffect, useRef } from 'react';

interface IProps {
  name: string
  host: string
  history: any
}

const MicroFrontend = ({ name, host, history }: IProps) => {

  const loading = useRef(Promise.resolve())
  // useEffect call twice with <React.StrictMode>
  useEffect(() => {
    const scriptId = `micro-frontend-script-${name}`;
    
    const renderMicroFrontend = () => {
      const mf = window.microFrontends[name]
      if(!mf.isRendered) {
        mf.render(`${name}-container`, history)
      }
    };

    const loadMicroFrontend = async () => {

      await loading.current
      if (document.getElementById(scriptId)) {
        renderMicroFrontend();
        return;
      }
  
      const manifestJson = await fetch(`${host}/asset-manifest.json`)
      const manifest = await manifestJson.json()

      const promises = Object.keys(manifest['files'])
        .filter(key => key.endsWith('.js'))
        .reduce((sum: Promise<void>[], key) => {
          sum.push(
            new Promise(resolve => {
              const path = `${host}${manifest['files'][key]}`;
              const script = document.createElement('script');
              if (key === 'main.js') {
                script.id = scriptId;
              }
              script.onload = () => {
                resolve();
              };
              script.src = path;
              document.head.appendChild(script);
            })
          );
          return sum;
        }, []);

      await Promise.allSettled(promises)
      renderMicroFrontend();
    }

    loading.current = loadMicroFrontend()

    return () => {
      if(window.microFrontends) {
        const mf = window.microFrontends[name]
        if(mf && mf.isRendered) {
          mf.unmount()
        }
      }
    };
  }, [name, history, host]);

  return <main id={`${name}-container`} />;
};

export default MicroFrontend;
