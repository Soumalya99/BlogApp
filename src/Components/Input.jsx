/** Creating input field that have 
label can be used for username, poassword tc so designing it accordingly */

import React, {useId} from 'react'

const Input = React.forwardRef( function Input({
  label,
  type = "text",
  className = "",
  ...props
  }, ref){
  const id = useId()
  return (
    <div className='w-full'>
      {label && 
        <label className='inline-block mb-1 pl-1' 
        htmlFor={id}>
          {label}
        </label>
      }
      <input 
         type={type}
         className={`px-3 py-2 rounded-lg text-white outline-none 
         focus:bg-stone-800/30 duration-200 border border-gray-200 w-full ${className}`}
         /** ref to parent component pass by user to get access of state
          * id = {id} wiring id to the input compo
          * {...props} giving access to other props by user
          */
         ref= {ref}
        {...props}
        id = {id}
         
         />
    </div>
  )
})

export default Input