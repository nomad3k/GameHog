import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Textfield extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    errors: PropTypes.array
  }

  static defaultProps = {
    type: 'text'
  }

  render() {
    const { type, placeholder, value, onChange, required, autoFocus, className, style, errors } = this.props;
    const attributes = { type, placeholder, value, onChange, required, autoFocus };
    const c = classnames('gh-textfield', className);
    return (
      <div className={c} style={style}>
        <input {...attributes} className='gh-textfield__input' />
        {!errors ? null : (
          <ul className='gh-textfield__errors gh-errors'>
            {errors.map(e => (
              <li className='gh-errors__item' key={e}>{e}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
