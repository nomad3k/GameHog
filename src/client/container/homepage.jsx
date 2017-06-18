import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Template from '../containers/template';
import * as Actions from '../store/actions';

class Homepage extends React.Component {
  static propTypes = {
    identity: PropTypes.object,
    players: PropTypes.object,
    documents: PropTypes.object
  }
  render() {
    const colors = ['primary', 'secondary', 'tertiary', 'complementary'];
    const shades = ['-darkest', '-darker', '', '-lighter', '-lightest'];
    const style = { width: 80, textAlign: 'center' };
    return (
      <Template title='Homepage'>
        <p>Homepage</p>
        <div id='colors'style={{ backgroundColor: 'white', borderRadius: 10, display: 'inline-block', padding: 10, margin: 10 }}>
          <table>
            <thead>
              <tr>
                <th></th>
                {shades.map(s => (
                  <th key={s}>{s}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {colors.map(c => (
                <tr key={c}>
                  <th>{c}</th>
                  {shades.map(s => (
                    <td key={s} className={`${c}${s}-bg`} style={style}>x</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Template>
    );
  }
}

function mapStateToProps(state) {
  return {
    identity: state.identity,
    players: state.players,
    documents: state.documents
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
)(Homepage);
