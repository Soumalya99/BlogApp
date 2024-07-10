/** Creating a global button to use  */

import React from 'react'

function Button({
  children,
  type = 'button',
  bgColor = 'bg-blue-400',
  textColor = 'text-white',
  className = '',
  ...props
  
}){
  return (
    /** Adding prev args & setting up for custom props from user */
    <button
      className={`px-4 py-2 rounded-xl ${bgColor}${textColor}${className}`}{...props}
      >
      {children}
    
    </button>
  )
}

export default Button