import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Layout, Header, Main, Spacer, Nav, NavItem } from 'react-controls-unchained';

import * as Actions from '../store/actions';

class Template extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    identity: PropTypes.object
  }

  static defaultProps = {
    loading: false
  }

  render() {
    const { identity, title } = this.props;
    document.title = `${title} - Gamehog`;
    return (
      <Layout>
        <Header>
          <Nav>
            <Link to='/'>Home</Link>
          </Nav>
          <Spacer />
          { identity ? (
            <Nav>
              <Link to='/unregister'>Unregister</Link>
              <Link to='/logout'>Logout</Link>
            </Nav>
          ) : (
            <Nav>
              <Link to='/register'>Register</Link>
              <Link to='/login'>Login</Link>
            </Nav>
          ) }
        </Header>
        <Main>
          {this.props.children}
        </Main>
      </Layout>
    );
  }

}

function mapStateToProps(state) {
  return {
    identity: state.client.identity
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
)(Template);
