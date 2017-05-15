import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import * as Actions from '../store/actions';

import PlayerList from '../components/player-list';
import DocumentList from '../components/document-list';

class Homepage extends React.Component {
  static propTypes = {
    identity: PropTypes.object,
    players: PropTypes.object,
    documents: PropTypes.object
  }
  static connected = false;
  componentDidMount() {
    const { actions } = this.props;
    if (!Homepage.connected) {
      Homepage.connected = true;
      actions.socketConnect();
    }
  }
  render() {
    const { identity, players, documents, actions } = this.props;
    return (
      <div className='gh-homepage'>
        <div className='gh-homepage__header'>
          <PlayerList identity={identity}
                      players={players} />
          <Link to='/register'>Register</Link>
          <Link to='/login'>Login</Link>
        </div>
        <div className='gh-homepage__content'>
          <DocumentList documents={documents}
                        players={players}
                        actions={actions}
                        />
        </div>
      </div>
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
