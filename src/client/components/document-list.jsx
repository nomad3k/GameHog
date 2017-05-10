import React from 'react';
import PropTypes from 'prop-types';

export default class DocumentList extends React.Component {
  render() {
    return (
      <div className='gh-document-list'>
        <div className='gh-document-list__header'>
          <h5 className='gh-document-list__header-title'>Documents</h5>
        </div>
        <div className='gh-document-list__content'>
        </div>
      </div>
    );
  }
}
