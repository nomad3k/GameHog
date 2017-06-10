import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Card extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
  }

  render() {
    const { className, style } = this.props;
    const c = classnames('gh-card', className);
    return (
      <div className={c} style={style}>
        {this.props.children}
      </div>
    );
  }
}
