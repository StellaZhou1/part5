import React, { useState } from 'react'
import PropTypes from 'prop-types'
const TogglableBlog = (props) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const children=React.Children.toArray(props.children)
  const blog=children[0]
  const details=children[1]
  if(details){
    return (
      <div>
        <div style={hideWhenVisible}>
          {blog}
          <button onClick={toggleVisibility}>{props.hideButtonLabel}</button>
        </div>
        <div style={showWhenVisible}>
          {details}
          <button onClick={toggleVisibility}>{props.showButtonLabel}</button>
        </div>
      </div>
    )
  }
  else{
    return (
      <div>
        <div style={hideWhenVisible}>
          {blog}
          <button onClick={toggleVisibility}>{props.hideButtonLabel}</button>
        </div>
        <div style={showWhenVisible}>
          {blog}
          <button onClick={toggleVisibility}>{props.showButtonLabel}</button>
        </div>
      </div>
    )
  }
}
TogglableBlog.propTypes = {
  hideButtonLabel: PropTypes.string.isRequired,
  showButtonLabel: PropTypes.string.isRequired
}

export default TogglableBlog