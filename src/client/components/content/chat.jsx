import React from 'react';
import PropTypes from 'prop-types';

export default class Chat extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    players: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      history: []
    };
  }
  scrollToBottom() {
    this.output.scrollTop = this.output.scrollHeight;
  }
  componentDidUpdate(_prevProps, _prevState) {
    this.scrollToBottom();
  }
  componentDidMount() {
    this.scrollToBottom();
  }
  onSend(e) {
    e.preventDefault();
    const { id, actions } = this.props;
    const { message } = this.state;
    actions.chatSend(id, message);
    this.input.select();
  }
  render() {
    const { id, data, players } = this.props;
    return (
      <div className='gh-chat'>
        <div className='gh-chat__output' ref={x => this.output = x}>
          <div className='gh-chat__output-lines'>
            {data.lines.map(line => (
              <p key={line.id} className='gh-chat__output-line'>{players[line.who].name} says "{line.text}".</p>
            ))}
          </div>
        </div>
        <form className='gh-chat__input' onSubmit={this.onSend.bind(this)}>
          <input type='text'
                 className='gh-chat__input-text'
                 ref={x => this.input = x}
                 value={this.state.message}
                 onChange={e => this.setState({ message: e.target.value })}
                 placeholder='Message'
                 autoFocus
                 />
          <button type='submit'
                  className='gh-chat__input-button'>Send</button>
        </form>
      </div>
    );
  }
}
