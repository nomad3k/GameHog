import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Template from '../containers/template';
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
  }

  render() {
    return (
      <Template title='Login'>
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
)(LoginPage);
