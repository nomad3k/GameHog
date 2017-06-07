import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import Template from '../containers/template';
import * as Actions from '../store/actions';

class Homepage extends React.Component {
  static propTypes = {
    identity: PropTypes.object,
    players: PropTypes.object,
    documents: PropTypes.object
  }
  render() {
    return (
      <Template title='Homepage'>
        <p>Homepage</p>
      </Template>
    );
  }
}

function mapStateToProps(state) {
  return {
    identity: state.identity,
    players: state.players,
    documents: state.documents
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
)(Homepage);
