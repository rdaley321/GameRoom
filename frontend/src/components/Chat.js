import React from "react";
import io from "socket.io-client";
import { connect } from 'react-redux'

class Chat extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            message: '',
            messages: []
        };

        this.socket = io('localhost:80');

        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });

        const addMessage = data => {
            this.setState({messages: [...this.state.messages, data]});
        };

        this.sendMessage = e => {
            e.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.props.currentUser,
                message: this.state.message
            })
            this.setState({message: ''});

        }
    }
    render(){
      return (
        <div className="main-chat-div">
          <div>
            <div>
              Global Chat
            </div>
            <hr/>
            <div>
              {this.state.messages.map(message => {
              return (
                <div>{message.author}: {message.message}</div>
              )
              })}
            </div>
          </div>
          <div>
              <input type="text" placeholder="Message" value={this.state.message} onChange={e => this.setState({message: e.target.value})}/>
              <br/>
              <button className="pointer" onClick={this.sendMessage}>Send</button>
          </div>
        </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser
  }
}

export default connect(mapStateToProps)(Chat);
