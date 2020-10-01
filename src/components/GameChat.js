import React, { Component } from "react";
import GameChatInput from "./GameChatInput";
import GameChatMessage from "./GameChatMessage";
import GameUserMessage from "./GameUserMessage";
import { getUser } from "../Actions/actions";
import { connect } from "react-redux";

const URL = "wss://fika-game-chat.herokuapp.com/";

class GameChat extends Component {
  state = {
    message: [],
  };
  ws = new WebSocket(URL);
  componentDidMount() {
    this.props.getUser();
    this.ws.onopen = () => {
      // on connecting, log it to the console
      console.log("A user has connected");
    };
    this.ws.onmessage = (evt) => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(evt.data);
      this.addMessage(message);
    };
    this.ws.onclose = () => {
      console.log("disconnected");
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(URL),
      });
    };
  }

  addMessage = (data) =>
    this.setState((state) => ({ message: [...state.message, data] 
  }));

  submitMessage = (messageString) => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    const message = {
      username: this.props.user.userData.username,
      message: messageString,
    };
    this.ws.send(JSON.stringify(message));
    this.addMessage(message);
  };
  render() {
    // console.log(this.props.user.message);
     const name = this.props.user.userData.username;
    let message = this.state.message.map((message, index) =>
      name !== message.username ? (
        <GameChatMessage
          className="otherGameUsers"
          key={index}
          message={message.message}
          name={message.username}
          time={message.created_at}
        />
      ) : (
        <GameUserMessage
          className="currentGameUser"
          key={index}
          message={message.message}
          name={message.username}
          time={message.created_at}
        />
      )
    );
    return (
      <div className="gameWrapper" id="wholeGameChat">
        <div className="chatGameBox">{message}</div>
        <GameChatInput
          ws={this.ws}
          onSubmitMessage={(messageString) => this.submitMessage(messageString)}
        />
      </div>
    );
  }
}
const mSTP = (state) => ({ user: state });
export default connect(mSTP, { getUser })(GameChat);
// export default Chat;