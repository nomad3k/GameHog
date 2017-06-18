import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Header, Spacer } from 'controls-unchained';

import * as Actions from '../store/actions';

class Template extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    identity: PropTypes.object
  }

  static defaultProps = {
    loading: false
  }

  render() {
    const { identity, title } = this.props;
    document.title = `${title} - Gamehog`;
    return (
      <div>
        <Header>
          <Link to='/'>Home</Link>
          <Spacer />
          { identity ? null : <Link to='/register'>Register</Link>}
          { identity ? null : <Link to='/login'>Login</Link>}
          { !identity ? null : <Link to='/unregister'>Unregister</Link>}
          { !identity ? null : <Link to='/logout'>Logout</Link>}
        </Header>
        {this.props.children}
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    identity: state.client.identity
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Template);
