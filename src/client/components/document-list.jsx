import React from 'react';
import PropTypes from 'prop-types';

import DocumentItem from './document-item';

export default class DocumentList extends React.Component {
  static propTypes = {
    documents: PropTypes.object.isRequired,
    players: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }
  render() {
    const { documents, players, actions } = this.props;
    const ids = Object.getOwnPropertyNames(documents);
    return (
      <div className='gh-document-list'>
        <div className='gh-document-list__header'>
          <h5 className='gh-document-list__header-title'>Documents</h5>
        </div>
        <div className='gh-document-list__content'>
          {ids.map(id => (
            <DocumentItem key={id} id={id}
                          document={documents[id]}
                          players={players}
                          actions={actions}
                          />
          ))}
        </div>
      </div>
    );
  }
}
