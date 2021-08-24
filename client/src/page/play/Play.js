/*IMPORTS*/
import React, { useState, useContext , useEffect } from 'react'
import { Redirect, useParams } from "react-router-dom";
import { isLoggedIn } from '../../auth/index'
import Board from './tc-toe Board/Board'
import './play.css'
import { initiateSocket, disconnectSocket, waitingSecondPlayer, startGame, endGame} from './socket.util'

const Play = ({location}) => {
    const { gameId } = useParams();
    // console.log('gameId:', gameId, location)
    const { status } = location.state
    const [socketHasBeenInitialized, setSocketHasBeenInitialized] = useState(false)
    const [playNow, setPlayNow] = useState(false);
    const [waiting, setWaiting] = useState(false)
    const [playerOne, setPlayerOne] = useState(null)
    const [playerTwo, setPlayerTwo] = useState(null)
    const [newGame, setNewGame] = useState(false)

    useEffect(() => {
        if (!isLoggedIn()) {
            return;
        }
        if(gameId) {
            let init = initiateSocket(gameId)
            console.log('init:', init)
            setSocketHasBeenInitialized(init)
        } 

        waitingSecondPlayer((err, {game}) => {
            if(err) return;
            setPlayerOne(game?.users?.playerOne)
            setPlayerTwo(game?.users?.playerTwo)
            setWaiting(true)
        })

        startGame((err, {game}) => {
            if(err) return;
            setPlayerTwo(game?.users?.playerTwo)
            setPlayerOne(game?.users?.playerOne)
            setWaiting(false)
            setPlayNow(true);
        })

        endGame((err) => {
            if(err) return;
            setNewGame(true)
            setWaiting(false)
            setPlayNow(true);
        })  
        return () => {
            
            disconnectSocket();
          }
    }, [gameId])    

    
    // No point in countinuing if user does not exist
    if (!isLoggedIn()) {
        return <Redirect to='/login'/>;
    }
    
    return socketHasBeenInitialized && (        
        <div className='play'>
            <div>
                <p>Player one: {playerOne}</p>
                <p>Player two: {waiting ? 'Waiting...' : playerTwo}</p>
            </div>
            <Board gameId={gameId} newGame={newGame} playNow={playNow}/>
        </div>
    )
    // :(
        // <div><Loading/></div>
    // )
}

export default Play
