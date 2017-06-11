import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class CardFooter extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
  }

  render() {
    const { className, style } = this.props;
    const c = classnames('gh-card__footer', className);
    return (
      <footer className={c} style={style}>
        {this.props.children}
      </footer>
    );
  }
}
