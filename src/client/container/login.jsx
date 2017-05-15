import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import * as Actions from '../store/actions';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: { }
    }
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.actions.login({
      username: this.state.username,
      password: this.state.password
    }, response => {
      if (response.ok) {
        alert('Success');
      } else {
        this.setState({ errors: response.errors })
      }
    });
  }
  render() {
    return (
      <div className='gh-login'>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div>
            <input type='text'
                   placeholder='Username'
                   value={this.state.username}
                   onChange={e => this.setState({ username: e.target.value })}
                   autoFocus
                   required />
            <span className='gh-validation--fail'>{this.state.errors.username}</span>
          </div>
          <div>
            <input type='password'
                   placeholder='Password'
                   value={this.state.password}
                   onChange={e => this.setState({ password: e.target.value })}
                   required />
            <span className='gh-validation--fail'>{this.state.errors.password}</span>
          </div>
          <div>
            <button type='submit'>Login</button>
            <Link to='/register'>Register</Link>
            <Link to='/'>Home</Link>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
