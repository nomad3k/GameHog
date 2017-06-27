import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SubHeader, Desktop, Document, Nav, NavItem, Button, Spacer } from 'react-controls-unchained';

import Template from '../containers/template';
import * as Actions from '../store/actions';

class Homepage extends React.Component {

  static propTypes = {
    identity: PropTypes.object,
    players: PropTypes.object,
    messages: PropTypes.array
  }

  renderPlayers(players) {
    if (!players) return null;
    const userNames = Object.getOwnPropertyNames(players);
    const style = {
      transitionDuration: '1s',
      transitionProperty: 'background-color'
    };
    return (
      <Nav>
        {userNames.map(userName => (
          <NavItem key={userName} className={players[userName].connected ? 'green-bg' : 'red-bg'} style={style}>
            {`${players[userName].characterName} (${players[userName].playerName})`}
          </NavItem>
        ))}
      </Nav>
    );
  }

  onRefreshClick(e) {
    const { actions } = this.props;
    actions.stateResync();
  }

  render() {
    const { players, messages } = this.props;
    return (
      <Template title='Homepage'>
        <SubHeader>
          {this.renderPlayers(players)}
          <Spacer />
          <Nav>
            <Button onClick={this.onRefreshClick.bind(this)}>Refresh</Button>
          </Nav>
        </SubHeader>
        <Desktop style={{ flex: '1 1 auto' }}>
          <Document className='gh-system' left={100} top={100} width={300} height={200} title='System Messages' id='system'>
            <div style={{ position: 'absolute', top: 5, right: 10, bottom: 5, left: 10, overflowY: 'scroll' }}>
            {messages.map((msg,ix) => (
              <div key={ix} className='gh-system__message' >{msg}</div>
            ))}
            </div>
          </Document>
        </Desktop>
      </Template>
    );
  }
}

function mapStateToProps(state) {
  return {
    identity: state.client.identity,
    players: state.shared.get('players').toJS(),
    messages: state.client.messages
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
