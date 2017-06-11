import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Template extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  }
  static defaultProps = {
    loading: false
  }
  render() {
    const { name, title } = this.props;
    document.title = `${title} - Gamehog`;
    return (
      <div>
        <div>
          <Link to='/'>Home</Link>
          <Link to='/register'>Register</Link>
          <Link to='/login'>Login</Link>
          <Link to='/unregister'>Unregister</Link>
          <Link to='/logout'>Logout</Link>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default Template;
