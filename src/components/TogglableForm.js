import React, { useState } from 'react'
import PropTypes from 'prop-types'
const TogglableForm = (props) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.hideButtonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>{props.showButtonLabel}</button>
      </div>
    </div>
  )
}
TogglableForm.propTypes = {
  hideButtonLabel: PropTypes.string.isRequired,
  showButtonLabel: PropTypes.string.isRequired
}
export default TogglableForm