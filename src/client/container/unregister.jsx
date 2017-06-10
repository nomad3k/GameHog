import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Panel, Button, Card, CardHeader, CardContent, CardFooter,
  Checkbox, Row, Spacer } from '../controls';
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
  }

  render() {
    return (
      <Template title='Unregister'>
        <Panel className='gh-unregister'>
          <Card>
            <form onSubmit={this.onSubmit.bind(this)}>
              <CardHeader>Unregister</CardHeader>
              <CardContent>
                <Checkbox label='Yes, delete my account' required />
              </CardContent>
              <CardFooter>
                <Spacer />
                <Button type='submit'>Unregister</Button>
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
