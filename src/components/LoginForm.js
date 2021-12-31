import React from 'react'
import * as loginService from '../services/login'

const LoginForm = ({username,password,setUsername,setPassword,setUser}) => {
    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
      }
      
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }
    
    const handleLogin = async (event) =>{
        event.preventDefault()
        //console.log('logging in with', username, password)
        try {
            const user = await loginService.login({
              username, password
            })
            setUser(user)
            setUsername('')
            setPassword('')
          } catch (exception) {
              console.log("wrong password")
            //setErrorMessage('Wrong credentials')
            // setTimeout(() => {
            //   setErrorMessage(null)
            // }, 5000)
          }
    }
    return (
    <div>
        <form onSubmit={handleLogin}>
            <div>username<input type='text' name='username' onChange={handleUsernameChange} value={username}/></div>
            <div>password<input type='password' name='password' onChange={handlePasswordChange} value={password}/></div>
            <input type="submit" value='login'/>
        </form>
    </div>  
)}

export default LoginForm