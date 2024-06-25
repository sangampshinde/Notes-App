import React, { useState } from 'react'

function Passwordinput({value,onChange,placeholder}) {

const [IsShowpassword ,setIsShowpassword]=useState(false);

const togglePassword = ()=>{
    setIsShowpassword(!IsShowpassword); 
}


  return (
    <div className='flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3'>
      <input 
        value={value} 
        onChange={onChange}
        type={IsShowpassword ? 'text' : 'password'}
        placeholder={ placeholder || "Password" }
        className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
      />
    </div>
  )
}

export default Passwordinput
