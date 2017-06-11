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
      : (<p>Loading...</p>);
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
