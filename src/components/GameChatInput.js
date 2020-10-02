import React, { Component } from "react";
import PropTypes from "prop-types";
import '../styles/GameChatInput.css'
class GameChatInput extends Component {
  static propTypes = {
    onSubmitMessage: PropTypes.func.isRequired,
  };
  state = {
    message: "",
  };
  render() {
    return (
      <form
        className="tttChatForm"
        action="."
        onSubmit={(e) => {
          e.preventDefault();
          this.props.onSubmitMessage(this.state.message);
          this.setState({ message: "" });
        }}
      >
        <input
          className="tttChatInput"
          type="text"
          placeholder={"Enter message..."}
          value={this.state.message}
          onChange={(e) => this.setState({ message: e.target.value })}
        />
        <input className="tttChatSubmit" type="submit" value={"Send"} />
      </form>
    );
  }
}
export default GameChatInput;