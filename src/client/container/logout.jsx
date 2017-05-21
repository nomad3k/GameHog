import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

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
    this.props.actions.logout(response => {
      if (response.ok) {
        alert('Success');
      } else {
        this.setState({ errors: response.errors })
      }
    });
  }
  render() {
    return (
      <div className='gh-login'>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div>
            <button type='submit'>Logout</button>
            <div className='gh-menu'>
              <Link to='/register'>Register</Link>
              <Link to='/login'>Login</Link>
              <Link to='/'>Home</Link>
            </div>
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
)(LogoutPage);
