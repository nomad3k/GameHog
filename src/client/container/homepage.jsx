import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Actions from '../store/actions';

import PlayerList from '../components/player-list';
import DocumentList from '../components/document-list';

class Homepage extends React.Component {
  static propTypes = {
  }
  render() {
    return (
      <div className='gh-homepage'>
        <div className='gh-homepage__header'>
          <PlayerList players={this.props.players} />
        </div>
        <div className='gh-homepage__content'>
          <DocumentList />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
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
