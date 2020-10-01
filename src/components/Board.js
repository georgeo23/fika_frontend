import React, { Component } from "react";
import Square from "./Square";
import GameChat from "./GameChat";
import { connect } from "react-redux";
import { getUser } from "../Actions/actions";
import "../styles/circle.svg";

const URL = "ws://fika-tictactoe.herokuapp.com/";

class Board extends Component {
  state = {
    squares: Array(9).fill(null),
    xIsNext: true,
    player1: null,
    player2: null
  };

  ws = new WebSocket(URL);

  updateBoard = (sqs) => {
    this.setState({
      squares: sqs,
      xIsNext: !this.state.xIsNext,
    });
  };

  calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  handleClick = (i, name) => {
    console.log(this.state.player1);
    console.log(this.state.xIsNext);

    if (this.state.player1 === name && this.state.xIsNext === true) {
      const squares = this.state.squares;
      const data = this.state.squares;

      if (this.calculateWinner(squares) || squares[i]) {
        return;
      }

      squares[i] = this.state.xIsNext ? "X" : "O";

      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
      });
      this.updateBoard(this.state.squares);
      this.ws.send(JSON.stringify(data));
      //fetch
    } else if (this.state.player2 === name && this.state.xIsNext === false) {
      const squares = this.state.squares;
      const data = this.state.squares;

      if (this.calculateWinner(squares) || squares[i]) {
        return;
      }

      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
      });

      this.updateBoard(this.state.squares);
      this.ws.send(JSON.stringify(data));
      //fetch
    } else {
      window.alert("it's not your go!");
    }
  };
  assignX = () => {
    if (this.state.player1 == null) {
      this.setState({ player1: this.props.user.userData.username });
      this.ws.send(JSON.stringify([this.props.user.userData.username, "X"]));
    } else {
      window.alert("This spot has already been taken!");
    }
    if (this.state.player1 != null && this.state.player2 != null) {
      window.alert("The game is already full, you are a spectator");
    }
  };
  assignO = () => {
    if (this.state.player2 == null) {
      this.setState({ player2: this.props.user.userData.username });
      this.ws.send(JSON.stringify([this.props.user.userData.username, "O"]));
    } else {
      window.alert("This spot has already been taken!");
    }
    if (this.state.player1 != null && this.state.player2 != null) {
      window.alert("The game is already full, you are a spectator");
    }
  };
  handleNewGame = () => {
   //resets the state of the game to begin a new one 
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
      player1: null,
      player2: null
    });
  };
  async componentDidMount() {
    await this.props.getUser();

    this.ws.onopen = () => {
      // on connecting, log it to the console
      console.log(`${this.props.user.userData.username} has connected`);
    };

    //this.props.getGame()
  }

  renderSquare = (i) => {
    return (
      <>
        <Square
          value={this.state.squares[i]}
          onClick={() => this.handleClick(i, this.props.user.userData.username)}
        />
      </>
    );
  };

  render() {
    this.ws.onmessage = (evt) => {
      // on receiving a message, this sorts between the type of data to determine what to update on the board.
      const squares = JSON.parse(evt.data);
      console.log(squares);
      //this will check the square to update
      if (squares.length > 3) {
        this.updateBoard(squares);
        //This will check if player 1 has played
      } else if (this.state.player1 == null && squares[1] == "X") {
        console.log("X click");
        this.setState({ player1: squares[0] });
        //this will check if player 2 has played
      } else if (this.state.player2 == null && squares[1] == "O") {
        console.log("O click");
        this.setState({ player2: squares[0] });
      }
    };

    const winner = this.calculateWinner(this.state.squares);
    let status;
    
    if (winner) {
      status = "Winner: " + (winner == "X" ? this.state.player1 : this.state.player2) + `(${winner})`;
    } else if (this.state.squares.includes(null) == false) {
      status = "The game is a draw!";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div>
        <div>
          <a onClick={this.assignX} id="xOrO">
            Play as X:
          </a>
          {this.state.player1 == null ? (
            <label>Awaiting X</label>
          ) : (
            <label>{this.state.player1} is X</label>
          )}
            <img src="../styles/circle.svg"></img>
         </div>
         <div>
          <a onClick={this.assignO} id="xOrO">
            Play as O:
          </a>
          {this.state.player2 == null ? (
            <label>Awaiting O</label>
          ) : (
            <label>{this.state.player2} is O</label>
          )}
          </div>
        <div className="status">{status}
          <button onClick={this.handleNewGame} hidden={status.includes('Next player') ? true : false}> Click for new game</button>
        </div>
        
        <div className="gameArea">
          
          <div className="boardRows">
            <div className="board-row">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
            </div>
            <div className="board-row">
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
            </div>
            <div className="board-row">
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
            </div>
          </div>
          <div className="playAs playAsCross">
          {/* <GameChat /> */}
          </div>
        </div>
        <div>
          
        </div>
        
      </div>
    );
  }
}
const mSTP = (state) => ({ user: state });
export default connect(mSTP, { getUser })(Board);
