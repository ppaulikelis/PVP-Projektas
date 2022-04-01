import React from 'react'

export const Background = ({ children }) => {
  return (
    <div style={{
      background: 'url("/background.png") rgba(67, 127, 151, 0.4) no-repeat center center fixed',
			backgroundSize: 'cover',
      backgroundBlendMode: 'multiply',
      minHeight: "100vh"
    }}>
			{children}
    </div>
  )
}

export default Background
