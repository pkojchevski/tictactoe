import { API } from '../constant';
import axios from 'axios'

export const login = async (username) => {
        // try {
            return await axios.post(`${API}/api/login`, {username})
        //     console.log('res:', res)
        //     return ({error:null, username: res.data.username})
        // } catch(err) {
        //   console.log('err:', err.response.data)
        //     return err.response.data
        // }
}

export const register = async (username) => {
        try {
            const res = await axios.post(`${API}/api/saveUsername`, {username})
            console.log('res:', res)
            return res
        } catch(e) {
            return e
        }
}

export const isLoggedIn = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  console.log('isLoggedIn():', localStorage.getItem('username') ? true : false)
    return localStorage.getItem('username') ? true : false
};

export const signout = (next) => {
   localStorage.removeItem('username')
   next()
}

export const isUsernameUnique = async username => {
   try {
    const res = await axios.post(`${API}/api/checkUsername`,{username})
      return res.data.userNameExists
   } catch(err) {
      return err.response.data
   }

}


