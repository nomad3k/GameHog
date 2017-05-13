import React from 'react';
import PropTypes from 'prop-types';

import PlayerItem from './player-item';

export default class PlayerList extends React.Component {
  static propTypes = {
    players: PropTypes.object.isRequired,
    identity: PropTypes.object.isRequired
  }
  render() {
    const { players, identity } = this.props;
    const ids = Object.getOwnPropertyNames(players);
    return (
      <div className='gh-player-list'>
        <div className='gh-player-list__header'>
          <h5 className='gh-player-list__header-title'>Players</h5>
        </div>
        <div className='gh-player-list__content'>
          {ids.map(id => (
            <PlayerItem key={id}
                        id={id}
                        player={players[id]}
                        me={identity.id == id} />
          ))}
        </div>
      </div>
    );
  }
}
