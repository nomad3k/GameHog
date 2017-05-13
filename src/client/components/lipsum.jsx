import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Cell, IconButton } from 'react-mdl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Actions from '../store/actions';

import Template from '../containers/template';

class LipsumPage extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    loading: PropTypes.bool
  }
  onStartClick(_e) {
    const { actions } = this.props;
    actions.loadingStart();
  }
  onStopClick(_e) {
    const { actions } = this.props;
    actions.loadingStop();
  }
  render() {
    const title = 'Lorem Ipsum';
    return (
      <Template title={title}>
        <Grid>
          <Cell col={6} offsetDesktop={3} offsetTablet={1}>
            <h3>{title}</h3>
            <IconButton className='mdl-color-text--green-500' name='timer' onClick={this.onStartClick.bind(this)} />
            <IconButton className='mdl-color-text--red-500'name='timer_off' onClick={this.onStopClick.bind(this)} />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec nisi ligula. Ut fringilla malesuada scelerisque. Phasellus blandit arcu blandit neque vehicula posuere. Phasellus quis convallis justo, sollicitudin pretium ipsum. Aliquam et massa tellus. Nam dictum, nibh vitae blandit dignissim, tellus nulla condimentum dolor, sit amet suscipit ipsum nulla sit amet quam. Sed lacinia condimentum justo, vel egestas libero vulputate sed. Nulla placerat enim nec ligula sodales pharetra non at sapien.</p>
            <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Ut dapibus lectus dui, pellentesque pulvinar libero elementum in. Praesent auctor luctus est, eu porttitor risus semper in. Praesent tortor enim, dictum eu ultricies sit amet, auctor et urna. Etiam laoreet sollicitudin convallis. Fusce orci mauris, molestie in nibh non, pellentesque ullamcorper velit. Donec vitae pharetra metus. Donec vel erat in arcu auctor dictum ac ut justo. Mauris suscipit nunc orci, a mollis neque iaculis et. Integer et dictum dui. Integer hendrerit tincidunt erat.</p>
            <p>Maecenas et interdum odio, ac molestie nunc. Morbi sed nibh rutrum, hendrerit lacus nec, eleifend nisl. Suspendisse dignissim interdum enim aliquet malesuada. Curabitur posuere gravida pellentesque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nunc ac arcu nisl. Nunc quis varius est. Mauris fermentum ante vel convallis feugiat. Nam nec lacus vitae risus finibus suscipit ut ut ligula. Donec tincidunt lectus non dui gravida, pulvinar lobortis purus elementum. In ultrices est imperdiet orci elementum tempus. Nunc ut efficitur purus. Sed fringilla ornare arcu. Vivamus rhoncus purus in augue iaculis, eget ultrices orci pellentesque.</p>
          </Cell>
        </Grid>
      </Template>
    );
  }
}

function mapStateToProps(state) {
  return {
    title: state.title,
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
)(LipsumPage);
