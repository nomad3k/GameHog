import React from 'react';
import classnames from 'classnames';

export default class Column extends React.Component {
  render() {
    const { className, style } = this.props;
    const c = classnames('gh-layout--column', className);
    return (
      <div className={c} style={style}>
        {this.props.children}
      </div>
    );
  }
}
