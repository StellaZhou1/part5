import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [message,setMessage] = useState('')
  const [success,setSuccess] = useState(true)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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
        <div>
          {user.username} logged in
          <form onSubmit={handleLogout}>
            <input type="submit" value='logout'/>
          </form>
        </div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        <CreateBlogForm author={author} title={title} url={url} blogs={blogs} setAuthor={setAuthor} 
        setTitle={setTitle} setUrl={setUrl} setBlogs={setBlogs} setMessage={setMessage} setSuccess={setSuccess}/>
      </div>

    )
  }

}

export default App