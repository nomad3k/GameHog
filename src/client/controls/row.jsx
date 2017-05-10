import React from 'react';
import classnames from 'classnames';

export default class Row extends React.Component {
  render() {
    const { className, style } = this.props;
    const c = classnames('gh-layout--row', className);
    return (
      <div className={c} style={style}>
        {this.props.children}
      </div>
    );
  }
}
