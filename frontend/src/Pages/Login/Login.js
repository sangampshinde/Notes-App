import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Passwordinput from '../../Components/PasswordInput/Passwordinput'
import{Link}from "react-router-dom"

const Login = () => {

  return (
   <>
   <Navbar/>
   <div className='flex item-center justify-center mt-28'>
      <div className='w-96 border rounded bg-white px-7 py-10'>
        <form onSubmit={()=>{}}>
          <h4 className='text-2xl mb-7'>Login</h4>
          <input type="text" placeholder='Email'className='input-box'/>
          <Passwordinput/>

          <button type='submit' className='btn-primary'>Login</button>
          <p className=' text-sm text-center mt-4'>Not Register yet ?{" "} 
            <Link to='/signup'className="font-medium text-primary underline">Create an Account</Link>
          </p>
        </form>

      </div>
   </div>
   
   
   </>
  )
}

export default Login
