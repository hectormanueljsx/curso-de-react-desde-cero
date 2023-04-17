import { useState } from 'react';
import confetti from 'canvas-confetti';

import { Square } from './components/Square';
import { WinnerModal } from './components/WinnerModal';
import { TURNS } from './constants';
import { checkEndGame, checkWinnerFrom } from './logic/board';
import { resetGameStorage, saveGameToStorage } from './logic/storage';
import './App.css';

export const App = () => {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    if (boardFromStorage) return JSON.parse(boardFromStorage);
    return Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.X;
  });

  // null si no hay ganador, false si hay empate
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    resetGameStorage();
  };

  const updateBoard = index => {
    // No actualizamos el tablero si ya tiene un valor
    if (board[index] || winner) return;

    // Actualizamos el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    // Cambiamos el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    // Guardamos la partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn,
    });

    // Revisamos si hay un ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      confetti();
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>

      <button onClick={resetGame}>Reiniciar juego</button>

      <section className='game'>
        {board.map((square, index) => {
          return (
            <Square key={index} updateBoard={updateBoard} index={index}>
              {square}
            </Square>
          );
        })}
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
};
