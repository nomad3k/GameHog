import React from 'react';

import { Navigation, Icon } from 'react-mdl';
import { Link } from 'react-router-dom';

export default class Nav extends React.Component {
  static propTypes = {
    header: React.PropTypes.bool
  }
  static defaultProps = {
    header: false
  }

  render() {
    return (
      <Navigation>
        <Link to='/'><Icon name='home' /> Home</Link>
        <Link to='/lipsum'><Icon name='new_releases' /> Lipsum</Link>
        <Link to='/undefined-route'><Icon name='error' /> Not Found</Link>
      </Navigation>
    );
  }
}
