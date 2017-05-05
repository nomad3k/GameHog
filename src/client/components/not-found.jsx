import React from 'react';

import { Grid, Cell } from 'react-mdl';

import Template from '../containers/template';

class NotFound extends React.Component {
  render() {
    const title = 'Not Found';
    return (
      <Template title={title}>
        <Grid>
          <Cell col={6} offsetDesktop={3} offsetTablet={1}>
            <h3>Not Found</h3>
            <p>We cannot find the page you were looking for.</p>
          </Cell>
        </Grid>
      </Template>
    );
  }
}

export default NotFound;
