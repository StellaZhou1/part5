//import blogService from '../services/blogs'
import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const handleCreateBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title:title,
      author:author,
      url:url
    }
    createBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>title<input type='text' name='title' id='title' onChange={({ target }) => {setTitle(target.value)}} value={title}/></div>
        <div>author<input type='text' name='author' id='author' onChange={({ target }) => {setAuthor(target.value)}} value={author}/></div>
        <div>url<input type='text' name='url' id='url' onChange={({ target }) => {setUrl(target.value)}} value={url}/></div>
        <input type="submit" value='create'/>
      </form>
    </div>
  )
}
export default BlogForm