import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Panel, Card, Row, Spacer, Button, Textfield } from '../controls';
import Template from '../containers/template';
import * as Actions from '../store/actions';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
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
        <Panel>
          <Card>
            <form onSubmit={this.onSubmit.bind(this)}>
              <Textfield label='Username'
                         value={this.state.userName}
                         onChange={e => this.setState({ userName: e.target.value })}
                         errors={this.state.errors.userName}
                         autoFocus
                         required />
              <Textfield type='password'
                         label='Password'
                         value={this.state.password}
                         onChange={e => this.setState({ password: e.target.value })}
                         errors={this.state.errors.password}
                         required />
              <Textfield type='password'
                         label='Confirm Password'
                         value={this.state.confirmPassword}
                         onChange={e => this.setState({ confirmPassword: e.target.value })}
                         errors={this.state.errors.confirmPassword}
                         required />
              <Textfield label='Player Name'
                         value={this.state.playerName}
                         onChange={e => this.setState({ playerName: e.target.value })}
                         errors={this.state.errors.playerName}
                         required />
              <Textfield label='Character Name'
                         value={this.state.characterName}
                         onChange={e => this.setState({ characterName: e.target.value })}
                         errors={this.state.errors.characterName}
                         required />
              <Row>
                <Spacer />
                <Button type='submit'>Register</Button>
              </Row>
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
)(RegisterPage);
