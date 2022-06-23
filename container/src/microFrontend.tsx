import React, { useEffect } from 'react';

interface IProps {
  name: string
  host: string
  history: any
}

const MicroFrontend = ({ name, host, history }: IProps) => {

  //useEffect call twice with <React.StrictMode>
  useEffect(() => {
    const scriptId = `micro-frontend-script-${name}`;
    
    const renderMicroFrontend = () => {
      const w: any = window
      w[`render${name}`] &&
        w[`render${name}`](`${name}-container`, history);
    };

    if (document.getElementById(scriptId)) {
      renderMicroFrontend();
      return;
    }

    console.log(`effect. ${name} ${host}`)

    fetch(`${host}/asset-manifest.json`)
      .then(res => res.json())
      .then(manifest => {
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
          }, [name, host, history]);
        Promise.allSettled(promises).then(() => {
          renderMicroFrontend();
        });
      });

    return () => {
      console.log('unmount')
      const w: any = window
      w[`unmount${name}`] && w[`unmount${name}`](`${name}-container`);
    };
  }, []);

  return <main id={`${name}-container`} />;
};

export default MicroFrontend;
