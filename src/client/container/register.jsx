import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import * as Actions from '../store/actions';

class RegisterPage extends React.Component {
  static propTypes = {
  }
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      playerName: '',
      characterName: '',
      errors: { }
    };
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.actions.register({
      username: this.state.username,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      playerName: this.state.playerName,
      characterName: this.state.characterName
    }, response => {
      if (response.ok) {
        alert('ok');
      } else {
        this.setState({ errors: response.errors })
      }
    });
  }
  render() {
    return (
      <div className='gh-register'>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div>
            <div>
              <input type='text'
                     placeholder='Username'
                     value={this.state.username}
                     onChange={e => this.setState({ username: e.target.value })}
                     autoFocus />
              <span className='gh-validation--fail'>{this.state.errors.username}</span>
            </div>
            <div>
              <input type='password'
                     placeholder='Password'
                     value={this.state.password}
                     onChange={e => this.setState({ password: e.target.value })} />
              <span className='gh-validation--fail'>{this.state.errors.password}</span>
            </div>
            <div>
              <input type='password'
                     placeholder='Confirm Password'
                     value={this.state.confirmPassword}
                     onChange={e => this.setState({ confirmPassword: e.target.value })} />
              <span className='gh-validation--fail'>{this.state.errors.confirmPassword}</span>
            </div>
            <div>
              <input type='text'
                     placeholder='Player Name'
                     value={this.state.playerName}
                     onChange={e => this.setState({ playerName: e.target.value })} />
                   <span className='gh-validation--fail'>{this.state.errors.playerName}</span>
            </div>
            <div>
              <input type='text'
                     placeholder='Character Name'
                     value={this.state.characterName}
                     onChange={e => this.setState({ characterName: e.target.value })} />
              <span className='gh-validation--fail'>{this.state.errors.characterName}</span>
            </div>
          </div>
          <div>
            <button type='submit'>Register</button>
            <Link to='/login'>Login</Link>
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
)(RegisterPage);
