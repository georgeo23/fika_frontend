import React, { Component } from "react";
import Board from "./Board";
import GameChat from "./GameChat";
import { connect } from "react-redux";
import { getUser } from "../Actions/actions";
import "../styles/tictactoe.css";

class Game extends Component {
  render() {
    return (
      <>
        <div >
            <Board />        
        </div>

      </>
    );
  }
}
const mSTP = (state) => ({ user: state });

export default connect(mSTP, { getUser })(Game);
