import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Template from '../containers/template';
import * as Actions from '../store/actions';

class RegisterPage extends React.Component {
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
  }

  render() {
    return (
      <Template title='Register'>
        <div className='gh-register'>
          <form onSubmit={this.onSubmit.bind(this)}>
            <div>
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
                <input type='password'
                       placeholder='Confirm Password'
                       value={this.state.confirmPassword}
                       onChange={e => this.setState({ confirmPassword: e.target.value })}
                       required />
                <span className='gh-validation--fail'>{this.state.errors.confirmPassword}</span>
              </div>
              <div>
                <input type='text'
                       placeholder='Player Name'
                       value={this.state.playerName}
                       onChange={e => this.setState({ playerName: e.target.value })}
                       required />
                     <span className='gh-validation--fail'>{this.state.errors.playerName}</span>
              </div>
              <div>
                <input type='text'
                       placeholder='Character Name'
                       value={this.state.characterName}
                       onChange={e => this.setState({ characterName: e.target.value })}
                       required />
                <span className='gh-validation--fail'>{this.state.errors.characterName}</span>
              </div>
            </div>
            <div>
              <button type='submit'>Register</button>
            </div>
          </form>
        </div>
      </Template>
    );
  }
}

function mapStateToProps(_state) {
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
