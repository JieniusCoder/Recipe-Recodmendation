// TicTacToe.tsx
import React, { useState, useEffect } from 'react';

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<string | null>(null);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  useEffect(() => {
    const newWinner = calculateWinner(board);
    if (newWinner || !board.includes(null)) {
      setWinner(newWinner);
    }
    if (!isXNext && !newWinner) {
      // AI's turn
      const emptySquares = board
        .map((value, index) => value === null ? index : null)
        .filter(index => index !== null) as number[];
      if (emptySquares.length > 0) {
        const randomMove = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        setTimeout(() => handleClick(randomMove), 500);
      }
    }
  }, [isXNext, board]);

  const renderSquare = (index: number) => (
    <button
      style={{ width: '60px', height: '60px', fontSize: '24px' }}
      onClick={() => handleClick(index)}
    >
      {board[index]}
    </button>
  );

  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
      }}>
      <h3>
        {winner ? `Winner: ${winner}` : `Next Player: ${isXNext ? 'You' : 'AI'}`}
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 60px)', gap: '5px' }}>
        {[0, 1, 2].map(row =>
          [0, 1, 2].map(col =>
            renderSquare(row * 3 + col)
          )
        )}
      </div>
      <button
        style={{ marginTop: '20px', padding: '10px', fontSize: '16px' }}
        onClick={handleRestart}
      >
        Restart Game
      </button>
    </div>
  );
};

// Utility function to determine the winner
const calculateWinner = (squares: Array<string | null>) => {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        if (squares[a] === 'X') {
            return 'You';
        } else {
            return 'AI';
        }
    }
  }
  return null;
};

export default TicTacToe;
