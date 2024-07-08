import React from 'react'
import Navbar from '../../Components/Navbar/Navbar';

const SignUp = () => {



  const handleSignup= async(e) => {
    e.preventDefault();
  };



  return (
    <>
     <Navbar/>
    <div className='flex item-center justify-center mt-28'>
    <div className='w-96 border rounded bg-white px-7 py-10'>
    <form onSubmit={handleSignup}>
    <h4 className='text-2xl mb-7'>SignUp</h4>
    </form>
    </div>
    </div>
    
    
    
    
    
    
    
    
    
    
    
    
    
    </>
    
  )
}

export default SignUp
