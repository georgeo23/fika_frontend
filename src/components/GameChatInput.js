import React, { Component } from "react";
import PropTypes from "prop-types";

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
        className="chatGameForm"
        action="."
        onSubmit={(e) => {
          e.preventDefault();
          this.props.onSubmitMessage(this.state.message);
          this.setState({ message: "" });
        }}
      >
        <input
          className="chatGameInput"

          type="text"
          placeholder={"Enter message..."}
          value={this.state.message}
          onChange={(e) => this.setState({ message: e.target.value })}
        />
        <input className="chatGameSubmit" type="submit" value={"Send"} />
      </form>
    );
  }
}
export default GameChatInput;
