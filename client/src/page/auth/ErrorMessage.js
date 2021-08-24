import './auth.css'

const ErrorMessage = ({ username, isValid, error, loading}) => {
   if(username) {
    if(loading) {
        return <p style={{textAlign:'center'}}>Checking...</p>
     } else if (isValid) {
        return <p style={{color: 'green', textAlign:'center'}}>{username} is available</p>
     } else if(username && !isValid) {
         return <p style={{color:'red', textAlign:'center'}}>That username is taken</p>
     } else {
         return <p></p>
     }
   } else {
    if(loading) {
        return <p style={{textAlign:'center'}}>Checking...</p>
     } else if (error) {
        return <p style={{color: 'red',textAlign:'center'}}>{error.message}</p>
     } else {
         return <p></p>
     }
   }
}

export default ErrorMessage
