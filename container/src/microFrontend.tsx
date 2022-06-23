import React from 'react';

interface IProps {
  name: string
  host: string
  // document: any
  // window: any
  history: any
}

class MicroFrontend extends React.Component<IProps> {
  componentDidMount() {
    const { name, host } = this.props;
    const scriptId = `micro-frontend-script-${name}`;

    if (document.getElementById(scriptId)) {
      this.renderMicroFrontend();
      return;
    }

    fetch(`${host}/asset-manifest.json`)
      .then(res => res.json())
      .then(manifest => {
        const script = document.createElement('script');
        script.id = scriptId;
        script.crossOrigin = '';
        script.src = `${host}${manifest['files']['main.js']}`;
        script.onload = this.renderMicroFrontend;
        document.head.appendChild(script);
      });
  }

  componentWillUnmount() {
    const { name } = this.props;
    const w: any = window
    w[`unmount${name}`] && w[`unmount${name}`](`${name}-container`);
  }

  renderMicroFrontend() {
    const { name, history } = this.props
    const w: any = window
    w[`render${name}`] && w[`render${name}`](`${name}-container`, history);
  }

  render() {
    return <main id={`${this.props.name}-container`} />
  }
}

// MicroFrontend.defaultProps = {
//   document,
//   window,
// };

export default MicroFrontend;