import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
        <div className='gh-unregister'>
          <form onSubmit={this.onSubmit.bind(this)}>
            <div>
              <button type='submit'>Unregister</button>
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
)(LogoutPage);
