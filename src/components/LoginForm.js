import React from 'react'
import * as loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({username,password,setUsername,setPassword,setUser,setMessage,setSuccess}) => {
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
            window.localStorage.setItem(
                'loggedBlogUser', JSON.stringify(user)
              ) 
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            setMessage(`${user.username} logged in`)
            setSuccess(true)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          } catch (exception) {
            setMessage('Wrong credentials')
            setSuccess(false)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
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