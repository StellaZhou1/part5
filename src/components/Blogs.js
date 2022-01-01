import React from 'react'
import TogglableBlog from '../components/TogglableBlog'
import Blog from '../components/Blog'
import BlogDetails from '../components/BlogDetails'
const Blogs = ({blogs,setBlogs}) => {
  blogs.sort(function (a, b) {
    return b.likes - a.likes;
  })
  return (
    <div>
    {blogs.map(blog =>
      <div key={blog.id} className={'blog'}>
        <TogglableBlog hideButtonLabel='view' showButtonLabel='hide'>
          <Blog blog={blog} blogs={blogs} setBlogs={setBlogs}/>
          <BlogDetails blog={blog} blogs={blogs} setBlogs={setBlogs}/>
        </TogglableBlog>
      </div>
    )}
    </div>
  )
}
export default Blogs