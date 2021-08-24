import React, { useState, useCallback , useEffect} from 'react'
import { useHistory} from "react-router-dom";
import { debounce } from 'lodash'
import { isUsernameUnique, register } from '../../auth/index'
import './auth.css'
import ErrorMessage from './ErrorMessage'

const Register = () => {
    const history = useHistory()
    const [username, setUsername] = useState('')
    const [error, setError] = useState(null)
    const [isValid, setIsValid] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        checkUsername(username)
    }, [username]);

    const onChange = (e) => {
        // Force form value typed in form to match correct format
        const val = e.target.value.toLowerCase();
        const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    
        // Only set form value if length is < 3 OR it passes regex
        if (val.length < 3) {
          setUsername(val);
          setLoading(true);
          setIsValid(false);
        }
    
        if (re.test(val)) {
          setUsername(val);
          setLoading(true);
          setIsValid(false);
        }
      };

    const checkUsername = useCallback(
        debounce (async (username) => {
            if(username.length >= 3) {
                setLoading(true)
                const res = await isUsernameUnique(username)
                setIsValid(!res)
                setLoading(false)
            }
        }, 500),[])

    // submit username to server
    const handleSubmit = async (e) => {
        console.log(e)
        e.preventDefault();
            try {
                const res = await register(username)
                console.log('res:', res)
                if(res.statusText === "OK") {
                    history.push('/login')  
                }
            } catch(e) {
                console.log(e)
                setError(e)
            }
    }



    return (
        <div>
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="text"
                    value={username}
                    onChange={onChange}
                    className="input-username"
                    placeholder='Enter Your Username'
                    autoComplete="off" 
                />
                <button className="input-button" disabled={!isValid}>Register</button>
                
            </form>
            <ErrorMessage username={username} isValid={isValid} loading={loading} />
            {error && <p style={{color:'red'}}>{error}</p>}
        </div>
    )
}

export default Register
