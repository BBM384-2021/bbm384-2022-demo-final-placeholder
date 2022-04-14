import React from 'react'

export default function Button(isActive) {
  return (
    <div>
      {/* ToDo: this will render a red button when active and a borderless button when passive */}
      {/* for passive check go Back button in design */}
        {isActive && <></>}
    </div>
  )
}
