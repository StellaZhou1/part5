import React from 'react'
const Notification = ({ message,success }) => {
  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message===null)
  {
    return null
  }
  if (success)
    return (<div style={successStyle} className='notification'>
      {message}</div>)
  else
    return (<div style={errorStyle} className='notification'>
      {message}
    </div>)
}

export default Notification