import React from 'react';

import Template from '../containers/template';

class NotFound extends React.Component {
  render() {
    const title = 'Not Found';
    return (
      <Template title={title}>
        <h3>Not Found</h3>
        <p>We cannot find the page you were looking for.</p>
      </Template>
    );
  }
}

export default NotFound;
