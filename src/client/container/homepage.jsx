import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SubHeader, Desktop, Nav, NavItem, Button, Spacer } from 'react-controls-unchained';

import Template from '../containers/template';
import * as Actions from '../store/actions';

class Homepage extends React.Component {

  static propTypes = {
    identity: PropTypes.object,
    players: PropTypes.object
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
          <NavItem className={players[userName].connected ? 'green-bg' : 'red-bg'} style={style}>
            {`${players[userName].characterName} (${players[userName].playerName})`}
          </NavItem>
        ))}
      </Nav>
    );
  }

  onRefreshClick(e) {
    const { actions } = this.props;
    debugger;
    actions.stateResync();
  }

  render() {
    const { players } = this.props;
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
        </Desktop>
      </Template>
    );
  }
}

function mapStateToProps(state) {
  return {
    identity: state.client.identity,
    players: state.shared.get('players').toJS()
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
