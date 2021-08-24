import React, { useState } from 'react'
import "./Home.css";
import { useHistory } from "react-router-dom";
import { API } from '../../constant'

const axios = require('axios');

const Home = () => {
    const [error, setError] = useState('')
    const history = useHistory()
    const username = localStorage.getItem('username')
    
    const startGame = async () => { 
        const res = await axios.post(`${API}/api/startgame`, {username})
        console.log('res:', res)
        history.push(`/play/${res.data.gameId}`, {status: res.data.status})
    }

    return (
        <div className="home-container">
            Hi, {username} 😀
            <div className="error" style={{display: !error?'none':'flex'}} >{error}</div>
            <button className="input-button" onClick={startGame}>Start Game</button>
        </div>
    )
}

export default Home
