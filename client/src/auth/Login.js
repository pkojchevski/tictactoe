import React, { useState, useContext} from 'react'
import { Redirect, useHistory, withRouter} from "react-router-dom";
import Cookies from 'universal-cookie';
import axios from 'axios'
import serverURL from '../constant';
import axios from 'axios'

const Login = () => {
    const history = useHistory()
    const [username, setUsername] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const cookies = new Cookies();

    // submit username to server
    const login = async (e) => {
        e.preventDefault();  
            try {
                setLoading(true)
                console.log('username:', username)
                const res = await axios.post(`${serverURL}/api/login`, {username})
                console.log('res:', res)
                if(res.statusText === "OK") {
                    setLoading(false)
                    history.push('/')   
                    
                } else {
                    setError({message:"Error during loading"})
                    setLoading(false)
                }
            } catch(err) {
                console.log("Err:", err.response.data)
                setError(err.response.data)
                setLoading(false)
            }
    }
 
    // if (user !== null && user !== undefined ){
    //     console.log(cookies.get('user'));
    //     return <Redirect to="/"/>
    // }

    function ErrorMessage({ error, loading}) {
        if(loading) {
           return <p style={{margin:'auto'}}>Checking...</p>
        } else if (error) {
           return <p style={{color: 'red', margin:'auto'}}>{error.message}</p>
        } else {
            return <p></p>
        }
    }

    return (
        <div>
            <form onSubmit={login} id="room-form" >
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    id="username"
                    placeholder='Enter Your Username'
                    autoComplete="off" />
                <button className="input-button">Login</button>
                
            </form>
            <ErrorMessage error={error} loading={loading} />
        </div>
    )
}

export default withRouter(Login)
