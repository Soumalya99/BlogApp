import React, {useId} from 'react'

/** Selector of options in dropdown */
function Selector({
/** Adding args */
  label,
  options,
  className ,
  ...props
}, ref){
  const id = useId()
  return(
    <div className='w-full'>
      {label && <label htmlFor={id} className=''></label>}
      <select 
        id={id}
        {...props}
        ref={ref}
        className={`rounded-lg text-black px-3 py-2 outline-none focus:bg-slate-900 duration-200 w-full ${className}`}
        >
        {options?(options.map((option)=>{
          console.log(option),
          <option key={option} value={option}
            >
            {option}
          </option>
        })): (console.log("No options"))}
      
      </select>
    </div>
  )
}


export default React.forwardRef(Selector)