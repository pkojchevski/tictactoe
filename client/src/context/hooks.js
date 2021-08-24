
import { useEffect, useState } from 'react'

export function useUsernameData() {
    const [username, setUsername] = useState(null)

    useEffect(()=> {
        setUsername(localStorage.getItem('username'))
    }, [])

    return { username}
}
