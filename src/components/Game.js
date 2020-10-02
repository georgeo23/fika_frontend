import React, { useState } from "react";
import Board from "./Board";
import GameChat from "./GameChat";
import Modal from 'react-modal';
import "../styles/tictactoe.css";
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    // right                 : '50%',
    // bottom                : '50%',
    // marginRight           : '-50%',
    marginLeft            :'17%',
    transform             : 'translate(-5%, -30%)',
    backgroundColor       : 'white'
  }
};
function Game (){
  const [modalIsOpen,setModalIsOpen] = useState(false);
  const setModalTrue =()=>{
    setModalIsOpen(true)
  }
  const setModalFalse =()=>{
    setModalIsOpen(false)
  }
  return(
    <div className='container'>
      <div className="game-board"><Board /> </div>
      <div>
        <button className='gameChatBTN'onClick={setModalTrue}>Game Chat</button>
        <Modal isOpen={modalIsOpen} shouldCloseOnOverlayClick={true} onRequestClose={()=> setModalIsOpen(false)} style={customStyles}>
            <button onClick={setModalFalse}>x</button>
            <GameChat/>
        </Modal>
      </div>
    </div>
  )
}
export default Game;
