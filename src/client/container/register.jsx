import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { Section, SectionFooter, Panel, Card, CardHeader, CardContent, CardFooter, Spacer, Button, Textfield } from '../controls';
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
      errors: {
      }
    };
  }

  onSubmit(e) {
    e.preventDefault();
    const { actions } = this.props;
    const { userName, password, confirmPassword, playerName, characterName } = this.state;
    actions.register({ userName, password, confirmPassword, playerName, characterName })
      .then(() => {
        this.props.history.push('/login');
      })
      .catch(errors => {
        this.setState({ errors });
      });
  }

  render() {
    return (
      <Template title='Register'>
        <Panel>
          <Card>
            <form onSubmit={this.onSubmit.bind(this)}>
              <CardHeader>Player Registration</CardHeader>
              <CardContent>
                <Section>
                  <Textfield label='Username'
                             maxLength={20}
                             value={this.state.userName}
                             description='Provide a unique username'
                             onChange={e => this.setState({ userName: e.target.value })}
                             errors={this.state.errors.userName}
                             autoFocus
                             required />
                  <Textfield type='password'
                             maxLength={255}
                             label='Password'
                             value={this.state.password}
                             onChange={e => this.setState({ password: e.target.value })}
                             errors={this.state.errors.password}
                             required />
                  <Textfield type='password'
                             maxLength={255}
                             label='Confirm Password'
                             value={this.state.confirmPassword}
                             onChange={e => this.setState({ confirmPassword: e.target.value })}
                             errors={this.state.errors.confirmPassword}
                             required />
                  <SectionFooter>
                    Please remember the details above, as you will need
                    them each time you connect to this game
                  </SectionFooter>
                </Section>
                <Section>
                  <Textfield label='Player Name'
                             maxLength={255}
                             value={this.state.playerName}
                             onChange={e => this.setState({ playerName: e.target.value })}
                             errors={this.state.errors.playerName}
                             required />
                  <Textfield label='Character Name'
                             maxLength={255}
                             value={this.state.characterName}
                             onChange={e => this.setState({ characterName: e.target.value })}
                             errors={this.state.errors.characterName}
                             required />
                  <SectionFooter>
                    How will you be identified by the other players in the game.
                  </SectionFooter>
                </Section>
              </CardContent>
              <CardFooter>
                <Link className='gh-link' to='/login'>Login</Link>
                <Spacer />
                <Button type='submit'>Register</Button>
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
)(RegisterPage);
