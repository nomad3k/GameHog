import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Actions from '../store/actions';

class Startup extends React.Component {
  static propTypes = {
    socket: PropTypes.object
  }
  componentDidMount() {
    const { actions } = this.props;
    actions.connectSocket();
  }
  render() {
    return this.props.socket
      ? this.props.children
      : (
        <div>
          <h3>Connecting</h3>
          <p>
            If this happened mid-game, then it means your connection was
            interrupted.  The game will attempt to auto-connect, and will then
            re-load it's current state following login.
          </p>
          <p>You can try reloading the page.</p>
        </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    socket: state.client.socket
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
)(Startup);
