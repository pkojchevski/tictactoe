import React, { useState, useContext, useCallback , useEffect} from 'react'
import { Redirect, useHistory} from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Cookies from 'universal-cookie';
import axios from 'axios'
import serverURL from '../../constant';
import { debounce } from 'lodash'

const Register = () => {
    const history = useHistory()
    //user context
    const { user } = useContext(UserContext);
    const [username, setUsername] = useState('')
    const [isValid, setIsValid] = useState(false)
    const [loading, setLoading] = useState(false)
    const cookies = new Cookies();

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
                const res = await axios.post(`${serverURL}/api/checkUsername`,{username})
                setIsValid(!res.data.userNameExists)
                setLoading(false)
            }
        }, 500),[])

    // submit username to server
    const register = async (e) => {
        e.preventDefault();
        if (username) {
            cookies.set('user', username , { path: '/' });
            try {
                const res = await axios.post(`${serverURL}/api/saveUsername`, {username})
                console.log('res:', res)
                if(res.statusText === "OK") history.push('/login')
            } catch(e) {
                console.log(e)
            }

        }
    }

    // if (user !== null && user !== undefined ){
    //     console.log(cookies.get('user'));
    //     return <Redirect to="/"/>
    // }

    function UsernameMessage({ username, isValid, loading}) {
        if(loading) {
           return <p style={{margin:'auto'}}>Checking...</p>
        } else if (isValid) {
           return <p style={{color: 'green', margin:'auto'}}>{username} is available</p>
        } else if(username && !isValid) {
            return <p style={{color:'red', margin:'auto'}}>That username is taken</p>
        } else {
            return <p></p>
        }
    }

    return (
        <div>
            <form onSubmit={register} id="room-form">
                <input
                    type="text"
                    value={username}
                    onChange={onChange}
                    id="username"
                    placeholder='Enter Your Username'
                    autoComplete="off" />
                <button className="input-button" disabled={!isValid}>Register</button>
                
            </form>
            <UsernameMessage username={username} isValid={isValid} loading={loading} />
        </div>
    )
}

export default Register
