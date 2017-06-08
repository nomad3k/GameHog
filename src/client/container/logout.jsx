import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Panel, Card, Row, Spacer, Checkbox } from '../controls';
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
      <Template title='Logout'>
        <Panel>
          <Card>
            <form onSubmit={this.onSubmit.bind(this)}>
              <Checkbox label='Yes, log me out' required />
              <Row>
                <Spacer />
                <button type='submit'>Logout</button>
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
)(LogoutPage);
