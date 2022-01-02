import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogDetails from './BlogDetails'
import BlogForm from './BlogForm'
import TogglableBlog from './TogglableBlog'
import { useState } from 'react'
const blog = {
  author: 'author of blog',
  likes: 5,
  title: 'title of blog',
  url: 'www.google.com'
}
const useBlogs = () => {
  const [blogs, setBlogs] = useState([blog])
  return { blogs, setBlogs }
}


describe('test <TogglableBlog />', () => {
  let component
  const { blogs,setBlogs } = renderHook(() => useBlogs())

  beforeEach(() => {
    component = render(
      <TogglableBlog hideButtonLabel='view' showButtonLabel='hide'>
        <Blog blog={blog} blogs={blogs} setBlogs={setBlogs}/>
        <BlogDetails blog={blog} blogs={blogs} setBlogs={setBlogs}/>
      </TogglableBlog>
    )
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('after clicking the like button twice, the event handler is called twice', () => {
    const handler = jest.fn()
    const button = component.getByText('like',{ selector: 'button' })
    const element = document.getElementById('like')
    element.addEventListener('click', handler)
    fireEvent.click(button)
    fireEvent.click(button)
    expect(handler).toHaveBeenCalledTimes(2)
  })
})

test('submitting a new blog form, the event handler passed as input is called', () => {
  const create = jest.fn()
  const component = render(
    <BlogForm createBlog={create}/>
  )
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(author, { target: { value: 'author of blog' } })
  fireEvent.change(title, { target: { value: 'title of blog' } })
  fireEvent.change(url, { target: { value: 'www.google.com' } })
  fireEvent.submit(form)
  expect(create.mock.calls).toHaveLength(1)
  expect(create.mock.calls[0][0].title).toBe('title of blog' )
  expect(create.mock.calls[0][0].author).toBe('author of blog' )
  expect(create.mock.calls[0][0].url).toBe('www.google.com' )
})

test('renders a blog', () => {
  const component = render(
    <Blog blog={blog} />
  )
  expect(component.container).toHaveTextContent(blog.author)
  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).not.toHaveTextContent(blog.url)
  expect(component.container).not.toHaveTextContent(blog.likes)
})