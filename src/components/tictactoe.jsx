import { Link } from 'react-router-dom';
import './tictactoe.css';
import confetti from 'canvas-confetti';
import { useState } from 'react';
const TURNS = {
    X: '❌',
    O: '⚪'
}

const Square = ({ children, updateBoard, index, isSelected }) => {
    const className = `square ${isSelected ? 'is-selected' : ''}`



    const handleClick = () => {
        updateBoard(index) 
    }



    return(
        <div onClick={handleClick} className={className}>
            {children}
        </div>
    )
}

const WINNER_COMBOS = [
    [0, 1, 2], // Horizontal wins
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Vertical wins
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonal wins
    [2, 4, 6]
]

function Tictactoe ()  {


    const checkEndGame = (newBoard) => {
        return newBoard.every((square) => square !== null)
    }

    const [board, setBoard] = useState(
        Array(9).fill(null)
    )
    console.log(board)
    const [turn, setTurn] = useState(TURNS.X)
    const [winner,setWinner] = useState(null)

    const checkWinner = (boardToCheck) => {
        for (const combo of WINNER_COMBOS){
        const [a,b,c] = combo
        if (
            boardToCheck[a] &&
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c] 
        ) {
            return boardToCheck[a]
        }
        }
        return null
    }

    const resetGame = () => {
        setBoard(Array(9).fill(null))
        setTurn(TURNS.X)
        setWinner(null)
    }


    const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [... board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    const newWinner = checkWinner(newBoard)
    if (newWinner){
        confetti()
        setWinner(newWinner)
    } else if (checkEndGame(newBoard)){
        setWinner(false)
    }
    }
    
    
    
    return (  
        <div className="pokedexx">
        <div>
          <div id="site-border-left"></div>
          <div id="site-border-right"></div>
          <div id="site-border-top"></div>
          <div id="site-border-bottom"></div>

            <NavBarHeader />

        <div className='tictactoe'>

        <main className='board'>
        <h1>Tic tac toe </h1>
        <div className='reset'>
        <button onClick={resetGame}>Reset Game</button>
        </div>
        <section className='game'>
            {
                board.map((_, index) => {
                    return (
                        <Square
                        key = {index}
                        index={index}
                        updateBoard={updateBoard}
                        >
                        {board[index]}
                        </Square>
                    )
                }

                )
            }
        </section>
        <section className='turn'>
            <Square isSelected={ turn === TURNS.X}>{TURNS.X}</Square>
            <Square isSelected={ turn === TURNS.O}>{TURNS.O}</Square>

        </section>
         {
            winner !== null && (
                <section className='winner'> 
                <div className='text'>
                    <h2>
                        {
                            winner === false
                            ? 'Draw'
                            : `Winner`

                        }
                    </h2>
                    <header className='win'>
                        {winner && <Square>{winner}</Square>}
                    </header>
                    <footer>
                        <button onClick={resetGame}>Start again</button>
                    </footer>

                </div></section>)

         }

        </main>

        </div>
        </div>
        </div>
        

    

    );
}
 
export default Tictactoe;