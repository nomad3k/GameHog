import React from 'react';
import PropTypes from 'prop-types';

import Document from './content/document';
import Chat from './content/chat';
import Map from './content/map';

export default class DocumentItem extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    document: PropTypes.object.isRequired,
    players: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }
  renderContent(id, document) {
    switch(document.type) {
      case 'chat':
        return (<Chat id={id}
                      data={document.data}
                      players={this.props.players}
                      actions={this.props.actions}/>);
      case 'map':
        return (<Map id={id} data={document.data} />);
      default:
        return (<span>(unhandled)</span>);
    }
  }
  render() {
    const { id, document } = this.props;
    const style = {
      position: 'absolute',
      left: document.window.x,
      top: document.window.y,
      width: document.window.width,
      height: document.window.height
    };
    return (
      <Document id={id}
                position={document.window}
                title={`${document.title} [${document.type}]`}
                style={style}>
        {this.renderContent(id, document)}
      </Document>
    );
  }
}
