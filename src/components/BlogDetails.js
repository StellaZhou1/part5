import React from 'react'
import blogService from '../services/blogs'
const BlogDetails = ({ blog,blogs,setBlogs }) => {
  const handleLike = () => {
    blogService.incrementLike(blog.likes+1,blog.id)
      .then(updatedBlog => {
        setBlogs(blogs.map(b => b.id!==blog.id ? b : updatedBlog))
      })
  }
  const handleRemove = () => {
    const confirmation=window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if(confirmation){
      blogService.remove(blog.id)
        .then(() => {
          let newBlogs = []
          blogs.forEach((b) => {
            if (b.id !== blog.id){
              newBlogs.push(b)
            }
          })
          setBlogs(newBlogs)
        })
    }

  }
  return (
    <div>
      <p>{blog.title}</p>
      <p>{blog.url}</p>
      <p className='likes'>likes {blog.likes}
        <button onClick={handleLike} id='like'>like</button>
      </p>
      <p>{blog.author}</p>
      <button onClick={handleRemove} id='remove-button'>remove</button>
    </div>)
}
export default BlogDetails