import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  if (user === null){
    return (
      <div>
        <h2>Log in to application</h2>
        <LoginForm username={username} password={password} setUsername={setUsername} setPassword={setPassword} setUser={setUser}/>
      </div>
    )
  }
  else{
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.username} logged in</p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

}

export default App