import React, { useState, useEffect , useRef } from 'react';
import Sqaure from './Sqaure'
import { useHistory } from 'react-router-dom'
import calculateWinner from "./calculateWinner";
import './Game.css'
import { squareClickedReceived, playAgainReceived, closeGame, squareClicked } from '../socket.util'

const Board = ({ gameId, newGame, playNow }) => {
    const history = useHistory()
	const username = localStorage.getItem('username')
	const [squares, setSquares] = useState(Array(9).fill(null))
	const [state, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);
	const xIsNext = useRef(true);
	const Chance = useRef(1);
	const Player = useRef('');
	
	const winner = calculateWinner(squares);
	let status;
	if (winner) {
        console.log('winner:',Player.current)
		// socket.emit('closeGame', {gameId, winner:Player.current})
		closeGame({gameId, winner:Player.current})
		status = (Player.current === username ) ? 
		    'Winner' : 'Looser';
		// status = 'Better Luck Next Time:' +Player.current;
	} else {
		console.log('notwinner:',Player.current)
		status = (Player.current !== username) ? 
		    'Your turn':'Opponent turn';
	}

	useEffect(() => {	
		squareClickedReceived((err, click) => {
			if(err) {
				console.log(err)
				return
			}
			const i = click.i;			
			squares[i] = xIsNext.current ? 'X' : 'O';
			xIsNext.current = !xIsNext.current;				
			setSquares(squares);
			Player.current = click.username;
			if ( Chance.current === 2 ) Chance.current = 1;
			if ( Chance.current === -1 ) Chance.current = 2;
			forceUpdate();
		})
	} , [squares, xIsNext ])


	useEffect(() => {

		playAgainReceived((err) => {
			if(err) {
				console.log(err)
				return 
			}
			squares.fill(null);
			setSquares(squares)
			Chance.current = 1;
			Player.current = '';
			forceUpdate();
		})
	}, [squares])
	

	const handleClick = (i) => {
		if ( Chance.current === 2 || Chance.current === -1 || calculateWinner(squares) || squares[i]) {
			return;
		}

		// console.log('emitting');
		const click = {
			i,
			username,
			gameId
		};
		// socket.emit('squareClicked', click);
		squareClicked(click)
		Chance.current = -1;
	}

	const startNewGame = () => {
		history.push('/')
	}

	const renderSquare = (i) => {
		return <Sqaure
			val={squares[i]}
			onClick={() => handleClick(i)}
		/>;
	}

	return (
		<div id="Board">
			{ playNow && <div className="status">{status}</div>}			
			<div className="boardGame">
				<div className="board-row">
					{renderSquare(0)}
					{renderSquare(1)}
					{renderSquare(2)}
				</div>
				<div className="board-row">
					{renderSquare(3)}
					{renderSquare(4)}
					{renderSquare(5)}
				</div>
				<div className="board-row">
					{renderSquare(6)}
					{renderSquare(7)}
					{renderSquare(8)}
				</div>
			</div>
			<button onClick={startNewGame} className='input-button' disabled={!newGame}>New Game</button>
		</div>
	)
}

export default Board
