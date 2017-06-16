import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Checkbox } from 'controls-unchained';
import { Panel, Card, CardHeader, CardContent, CardFooter, Spacer, Button } from '../controls';
import Template from '../containers/template';
import * as Actions from '../store/actions';

class LogoutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: { }
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.actions.logout()
      .then(() => this.props.history.push('/login'))
      .catch(errors => {
        alert(JSON.stringify(errors));
      });
  }

  render() {
    return (
      <Template title='Logout'>
        <Panel>
          <Card>
            <form onSubmit={this.onSubmit.bind(this)}>
              <CardHeader>Logout</CardHeader>
              <CardContent>
                <Checkbox label='Yes, log me out' required />
              </CardContent>
              <CardFooter>
                <Spacer />
                <Button type='submit'>Logout</Button>
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
)(LogoutPage);
