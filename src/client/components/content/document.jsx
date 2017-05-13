import React from 'react';
import PropTypes from 'prop-types';

export default class Document extends React.Component {
  static propTypes = {
    position: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired
  }
  render() {
    const { position, title, children } = this.props;
    const style = {
      position: 'absolute',
      left: position.x,
      top: position.y,
      width: position.width,
      height: position.height
    };
    return (
      <div className='gh-document-item' style={style}>
        <div className='gh-document-item__header'>
          <h4 className='gh-document-item__header-title'>{title}</h4>
        </div>
        <div className='gh-document-item__content'>
          {children}
        </div>
      </div>
    );
  }
}
