import React, { useState, useEffect } from 'react'

import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'

import TogglableForm from './components/TogglableForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message,setMessage] = useState('')
  const [success,setSuccess] = useState(true)

  const createBlog = (newBlog) => {
    blogService.create(newBlog)
      .then(
        (createdBlog) => {
          setMessage(`A new blog ${createdBlog.title} by ${createdBlog.author} added`)
          setSuccess(true)
          setTimeout(() => {setMessage(null)}, 5000)
          setBlogs(blogs.concat(createdBlog))

        }
      )
      .catch(error => {
        setSuccess(false)
        setMessage(error.response.data.error)
        setTimeout(() => {setMessage(null)}, 5000)
      })
  }


  useEffect(() => {
    blogService.getAll().then(blogs =>
    {setBlogs( blogs )
    }
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
  }
  if (user === null){
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification success={success} message={message}/>
        <LoginForm username={username} password={password} setUsername={setUsername}
          setPassword={setPassword} setUser={setUser} setMessage={setMessage} setSuccess={setSuccess}/>
      </div>
    )
  }
  else{
    return (
      <div>
        <h2>blogs</h2>
        <Notification success={success} message={message}/>
        <div className='logged-in'>
          {user.username} logged in
          <form onSubmit={handleLogout}>
            <input type="submit" value='logout'/>
          </form>
        </div>
        <Blogs blogs={blogs} setBlogs={setBlogs}/>
        <TogglableForm hideButtonLabel='create new blog' showButtonLabel='cancel'>
          <BlogForm createBlog={createBlog}/>
        </TogglableForm>

      </div>

    )
  }

}

export default App