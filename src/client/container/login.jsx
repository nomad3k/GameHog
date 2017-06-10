import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { Panel, Card, CardHeader, CardContent, CardFooter, Section,
  Spacer, Button, Textfield } from '../controls';
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
        <Panel>
          <Card>
            <form onSubmit={this.onSubmit.bind(this)}>
              <CardHeader>Login</CardHeader>
              <CardContent>
                <Section>
                  <Textfield label='Username'
                             value={this.state.username}
                             onChange={e => this.setState({ username: e.target.value })}
                             errors={this.state.errors.username}
                             autoFocus
                             required />
                  <Textfield type='password'
                             label='Password'
                             value={this.state.password}
                             onChange={e => this.setState({ password: e.target.value })}
                             errors={this.state.errors.password}
                             required />
                </Section>
              </CardContent>
              <CardFooter>
                <Link className='gh-link' to='/register'>Register</Link>
                <Spacer />
                <Button type='submit'>Login</Button>
              </CardFooter>
            </form>
          </Card>
        </Panel>
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
