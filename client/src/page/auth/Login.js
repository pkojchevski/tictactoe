import React, { useState } from 'react'
import { Redirect, useHistory } from "react-router-dom";
import { login, isLoggedIn } from '../../auth/index'
import './auth.css'
import ErrorMessage from './ErrorMessage'

const Login = () => {
    const history = useHistory()
    const [username, setUsername] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    // submit username to server
    const handleSubmit = async (e) => {
        e.preventDefault();  
        try {
            setLoading(true)
            const res = await login(username)
            setLoading(false)
            localStorage.setItem('username', res.data.username)
            window.location.reload();
        } catch(err) {
            console.log(err.response.data)
            setError(err.response.data)
            setLoading(false)
        }
    }

    const redirectUser = () => {
        if(isLoggedIn()) {
            return <Redirect to="/"/>
        }
    }



    return (
        <div>
            <form onSubmit={handleSubmit} className="form" >
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input-username"
                    placeholder='Enter Your Username'
                    autoComplete="off" />
                <button className="input-button">Login</button>
                
            </form>
            <ErrorMessage error={error} loading={loading} />
            {redirectUser()}
        </div>
    )
}

export default Login
