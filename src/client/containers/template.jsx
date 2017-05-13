import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Layout, Header, Drawer, Content, ProgressBar } from 'react-mdl';

import * as Actions from '../store/actions';
import Nav from './nav';

class Template extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    loading: PropTypes.bool
  }
  static defaultProps = {
    loading: false
  }
  render() {
    const { name, title, loading } = this.props;
    document.title = `${title} - ${name}`;
    return (
      <Layout fixedHeader>
        <Header title={name}>
          <Nav header={true} />
        </Header>
        <Drawer title={name}>
          <Nav header={false} />
        </Drawer>
        <Content>
          <ProgressBar indeterminate={loading} style={{ width: '100%' }} />
          {this.props.children}
        </Content>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    name: state.name,
    loading: state.loading !== 0
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
