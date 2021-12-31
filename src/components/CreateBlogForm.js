import blogService from '../services/blogs'
const createBlogForm = ({title,author,url,blogs,setTitle,setAuthor,setUrl,setBlogs,setMessage,setSuccess}) => {
    const handleCreateBlog = (event) => {
        event.preventDefault()
        const newBlog = {
            title:title,
            author:author,
            url:url
        }
        blogService.create(newBlog)
        .then(
            (createdBlog) => {
                setMessage(`A new blog ${createdBlog.title} by ${createdBlog.author} added`)
                setSuccess(true)
                setTimeout(() => {setMessage(null)}, 5000)
                setBlogs(blogs.concat(createdBlog))
                setTitle('')
                setAuthor('')
                setUrl('') 
            }
        )
        .catch(error => {
            setSuccess(false)
            setMessage(error.response.data.error)
            setTimeout(() => {setMessage(null)}, 5000)
          })
    }
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleCreateBlog}>
                <div>title<input type='text' name='title' onChange={({ target })=>{setTitle(target.value)}} value={title}/></div>
                <div>author<input type='text' name='author' onChange={({ target })=>{setAuthor(target.value)}} value={author}/></div>
                <div>url<input type='text' name='url' onChange={({ target })=>{setUrl(target.value)}} value={url}/></div>
                <input type="submit" value='create'/>
            </form>
        </div>
    )
}
export default createBlogForm