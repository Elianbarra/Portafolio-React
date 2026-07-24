import { useState } from "react";
import confetti from "canvas-confetti";
import PlaygroundShell from "../../components/PlaygroundShell.jsx";

const TURNS = { X: "❌", O: "⭕" };

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkWinner = (board) => {
  for (const [a, b, c] of WINNER_COMBOS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  return null;
};

const Square = ({ value, onClick, highlighted }) => (
  <button
    onClick={onClick}
    className={`flex h-20 w-20 items-center justify-center rounded-xl border text-3xl transition sm:h-24 sm:w-24 ${
      highlighted ? "border-accent/60 bg-accent/10" : "border-white/10 bg-white/5 hover:border-white/20"
    }`}
  >
    {value}
  </button>
);

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (newBoard.every((square) => square !== null)) {
      setWinner(false);
    } else {
      setTurn(turn === TURNS.X ? TURNS.O : TURNS.X);
    }
  };

  return (
    <PlaygroundShell title="Tic Tac Toe" description="Classic 3x3 grid — get three in a row to win.">
      <div className="flex flex-col items-center gap-8">
        <div className="flex items-center gap-4 font-mono text-sm text-slate-300">
          <span>Turn: {turn}</span>
          <button onClick={resetGame} className="btn-secondary px-4 py-1.5 text-xs">
            Reset
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {board.map((value, index) => (
            <Square key={index} value={value} onClick={() => updateBoard(index)} />
          ))}
        </div>

        {winner !== null && (
          <div className="card p-6 text-center">
            <p className="text-lg font-bold text-white">
              {winner === false ? "It's a draw!" : `${winner} wins!`}
            </p>
            <button onClick={resetGame} className="btn-primary mt-4 px-5 py-2 text-sm">
              Play again
            </button>
          </div>
        )}
      </div>
    </PlaygroundShell>
  );
};

export default TicTacToe;
