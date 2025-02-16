// import logo from './logo.svg';
// import './App.css';
import BackgroundImage from './background1.jpg'

import React, { useState } from 'react';

function App() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  // const [screen, setScreen] = useState("Home");
  const [screen, setScreen] = useState("");
  const [moveLabel, setMoveLabel] = useState("X");
  const [message, setMessage] = useState("message");
  // const [message1, setMessage1] = useState("");
  const [messageColor, setMessageColor] = useState("white");
  // const [gameBoard, setGameBoard] = useState([['X', 'O', 'X'], ['X', 'X', 'X'], ['O', 'O', 'O']]);
  const [gameBoard, setGameBoard] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
  const [gameBoardColor, setGameBoardColor] = useState([['White', 'White', 'White'], ['White', 'White', 'White'], ['White', 'White', 'White']]);

  const winningMoves = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],

    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],

    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
  ]


  function handlePlayer1OnChange(e) {
    if (player1.trim() === '') {
      setPlayer1(e.target.value.trim());
    }
    else {
      setPlayer1(e.target.value);
    }

  }


  function handlePlayer2OnChange(e) {
    if (player2.trim() === '') {
      setPlayer2(e.target.value.trim());
    }
    else {
      setPlayer2(e.target.value);
    }
  }

  function handleStartGame() {

    if (player1 === '') {
      alert('Player 1 Name is Mandatory');
      return
    }

    if (player2 === '') {
      alert('Player 2 Name is Mandatory');
      return
    }

    if (player1.trim() === player2.trim()) {
      alert('Player names must be different');
      return
    }

    setPlayer1(player1.trim());
    setPlayer2(player2.trim());

    setScreen('Game')
    let localGameBoard = [['', '', ''], ['', '', ''], ['', '', '']]
    setGameBoard(localGameBoard);

    let localGameBoardColor = [['White', 'White', 'White'], ['White', 'White', 'White'], ['White', 'White', 'White']]
    setGameBoardColor(localGameBoardColor);

    setMessage('');
    setMessageColor('White')
    setMoveLabel('X')
  }

  function handleMove(index1, index2) {
    if (message.includes('wins'))
      return
    setMessageColor('White')
    setMessage('')
    let localGameBoard = gameBoard

    if (localGameBoard[index1][index2] === '') {
      localGameBoard[index1][index2] = moveLabel

      setGameBoard(localGameBoard)

      validateResult();

      setMoveLabel(moveLabel === 'X' ? 'O' : 'X')
    }
    else {
      setMessageColor('Red')
      setMessage('Invalid Move')
    }
  }



  function validateResult() {
    for (let i = 0; i < winningMoves.length; i++) {
      let moves = winningMoves[i]
      if (moves.every(move => gameBoard[move[0]][move[1]] === moveLabel)) {
        let localGameBoardColor = gameBoardColor

        localGameBoardColor[moves[0][0]][moves[0][1]] = 'Green'
        localGameBoardColor[moves[1][0]][moves[1][1]] = 'Green'
        localGameBoardColor[moves[2][0]][moves[2][1]] = 'Green'

        setGameBoardColor(localGameBoardColor)
        setMessageColor('Green')
        setMessage(`${moveLabel === 'X' ? player1 : player2} wins!`)

        return
      }
    }

    if (gameBoard[0].every(cell => cell !== '') && gameBoard[1].every(cell => cell !== '') && gameBoard[2].every(cell => cell !== '')) {
      setMessageColor('White')
      setMessage('Match Tied')
      return
    }


  }


  function handlePlayAgain() {
    setPlayer1('');
    setPlayer2('');
    setMoveLabel('O');
    setScreen('Home')
  }

  return (
    <div style={{
      backgroundImage: `url(${BackgroundImage})`,
      height: "100vh",
      backgroundPosition: "center",
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',

      display: 'flex',
      flexDirection: 'column',
      border: '3px solid gray',
      alignItems: 'center',
      justifyContent: 'center',
    }}>



      {screen !== "Game" &&
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid white',
          width: "60%",
          color: 'white',
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          padding: '100px 20px 100px 20px'
        }}>

          <div style={{ margin: 10, width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <span style={{ fontSize: 18, width: '15%', color: 'white', textAlign:'center', fontWeight: 'bolder' }}>X : </span>
            <input
              type='input'
              value={player1}
              style={{ padding: 0, paddingLeft: 10, width: '85%', paddingRight: 10, border: '2px solid lightgray', marginLeft: 5, flex: 1, height: 40, borderRadius: 25 }}
              placeholder={'Enter Player 1 Name'}
              onChange={handlePlayer1OnChange}
            />
          </div>

          <div style={{ margin: 10, width: '100%', display: 'flex',  textAlign:'center', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <span style={{ fontSize: 18,  width: '15%', color: 'white', fontWeight: 'bolder' }}>O : </span>
            <input
              type='input'
              value={player2}
              style={{ padding: 0, paddingLeft: 10, width: '85%', paddingRight: 10, border: '2px solid lightgray', marginLeft: 5, flex: 1, height: 40, borderRadius: 25 }}
              placeholder={'Enter Player 2 Name'}
              onChange={handlePlayer2OnChange}
            />
          </div>

          <button style={{ marginTop: 10, width: '40%', backgroundColor: 'sandybrown', borderRadius: 25, border: '2px solid lightgray', height: 35, color: 'white' }}
            onClick={handleStartGame}
          > START </button>

        </div>
      }


      {screen === "Game" &&
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          height:'100%',
          // alignItems: 'center',
          // justifyContent: 'center',
          // backgroundColor:'orange',
        }}>
          <div style={{ color: messageColor, marginTop:'20px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', fontSize: 40, fontWeight: 'bold' }}>{message}</div>
          { !(message.includes('wins') || message.includes('Tied')) &&
            <div style={{ color: 'white', marginTop:'20px',  display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', fontSize: 25, fontWeight: 'bold'}}>Its {moveLabel === 'X' ? player1 : player2}'s turn with {moveLabel}</div>
          } 
          <div
            style={{
              // backgroundColor:'green',
              position: 'absolute',
              marginTop: '20px',
              top: '50%',
              left: '50%',
              width: '100%',
              height: '70%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              // border: '1px solid',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <table style={{ width: '80%', height: '80%', tableLayout: 'fixed', borderCollapse: 'collapse', textAlign: 'center', fontSize: 80 }}>
              <tr style={{ borderBottom: '3px solid', color: 'white', height: '33.3%' }}>
                <td onClick={() => handleMove(0, 0)} style={{ color: gameBoardColor[0][0], borderColor: 'white' }}>{gameBoard[0][0]}</td>
                <td onClick={() => handleMove(0, 1)} style={{ borderRight: '3px solid', borderLeft: '3px solid', borderColor: 'white', color: gameBoardColor[0][1] }}>{gameBoard[0][1]}</td>
                <td onClick={() => handleMove(0, 2)} style={{ color: gameBoardColor[0][2], borderColor: 'white' }}>{gameBoard[0][2]}</td>
              </tr>
              <tr style={{ borderBottom: '3px solid', color: 'white', height: '33.3%' }}>
                <td onClick={() => handleMove(1, 0)} style={{ color: gameBoardColor[1][0], borderColor: 'white' }}>{gameBoard[1][0]}</td>
                <td onClick={() => handleMove(1, 1)} style={{ borderRight: '3px solid', borderLeft: '3px solid', borderColor: 'white', color: gameBoardColor[1][1] }}>{gameBoard[1][1]}</td>
                <td onClick={() => handleMove(1, 2)} style={{ color: gameBoardColor[1][2], borderColor: 'white' }}>{gameBoard[1][2]}</td>
              </tr>
              <tr>
                <td onClick={() => handleMove(2, 0)} style={{ color: gameBoardColor[2][0], borderColor: 'white' }}>{gameBoard[2][0]}</td>
                <td onClick={() => handleMove(2, 1)} style={{ borderRight: '3px solid', borderLeft: '3px solid', borderColor: 'white', color: gameBoardColor[2][1] }}>{gameBoard[2][1]}</td>
                <td onClick={() => handleMove(2, 2)} style={{ color: gameBoardColor[2][2], borderColor: 'white' }}>{gameBoard[2][2]}</td>
              </tr>
            </table>
          {
            (message.includes('wins') || message.includes('Tied')) &&
            <button
              style={{ marginTop: 20, height: 30, width: 100, color: 'white', backgroundColor: 'black' }}
              onClick={handlePlayAgain}
            > Play Again </button>
          }
          </div>
        </div>
      }
    </div>
  );
}

export default App;
