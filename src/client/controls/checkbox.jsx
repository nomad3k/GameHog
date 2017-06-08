import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Checkbox extends Component {
  static propTypes = {
    label: PropTypes.string,
    checked: PropTypes.any,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    errors: PropTypes.array
  }

  static defaultProps = {
  }

  render() {
    const { label, checked, onChange, required, autoFocus, className, style, errors } = this.props;
    const attributes = { checked, onChange, required, autoFocus };
    const c = classnames('gh-checkbox', className);
    return (
      <div className={c} style={style}>
        <label>
          <input type='checkbox' {...attributes} className='gh-checkbox__input' />
          <span>{label}</span>
        </label>
        {!errors ? null : (
          <ul className='gh-checkbox__errors gh-errors'>
            {errors.map(e => (
              <li className='gh-errors__item' key={e}>{e}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
