import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Row, Column } from './index';

export default class Textfield extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    maxLength: PropTypes.number.isRequired,
    description: PropTypes.string,
    label: PropTypes.string,
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
    const { description, type, maxLength, label, value, onChange, required, autoFocus, className, style, errors } = this.props;
    const attributes = { type, maxLength, placeholder: label, value, onChange, required, autoFocus };
    const c = classnames('gh-textfield', {
      'has-errors': errors && errors.length > 0
    }, className);
    return (
      <div className={c} style={style}>
        <Column>
          <Row>
            <input {...attributes} className='gh-textfield__input' style={{ flex: '1 1' }} />
            <div className='gh-textfield__indicators' style={{ flex: '0 0' }}>
              {!errors ? null : (
                <span className='gh-textfield__indicator--has-errors'>!!!</span>
              )}
              {!required ? null : (
                <span className='gh-textfield__indicator--is-required'>*</span>
              )}
            </div>
          </Row>
          {!description ? null : (
            <div className='gh-textfield__description'>{description}</div>
          )}
          {!errors ? null : (
            <ul className='gh-textfield__errors'>
              {errors.map(e => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          )}
        </Column>
      </div>
    );
  }
}
