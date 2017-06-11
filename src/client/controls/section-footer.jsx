import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class SectionFooter extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
  }

  render() {
    const { className, style } = this.props;
    const c = classnames('gh-section__footer', className);
    return (
      <footer className={c} style={style}>
        {this.props.children}
      </footer>
    );
  }
}
