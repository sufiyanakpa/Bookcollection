
import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { registerApi } from '../AllApiServices/allApis';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Reg() {
    const nav=useNavigate()

  const [data,setData]=useState({
    username:"",email:"",password:""
  })
  const handleSubmit=async()=>{
    console.log(data)
    const {username,password,email}=data
    if(!username || !password || !email){
      alert("invalid inputs")
    }
    else{
      try{
        const result=await registerApi(data)
        console.log(result)
        if(result.status==201){
          toast.success("registration successfull")
          nav('/')
        }
        else{
          toast.error("registration failed")
        }

      }
      catch(err){
        toast.warning("registarion failed")
      }
    }

  }

  return (
    <>
    <div className='d-flex justify-content-center align-items-center container-fluid' style={{heigh:"80vh"}}>
        <div className='w-50 border border-2 shadow p-4'>
            <h3 className='my-3 text-center text-secondary'>Mechanic Login</h3>
            <FloatingLabel controlId="floatingInput" label="Email ID" className="mb-3">
              <Form.Control type="email" name="email" onChange={(e)=>{setData({...data,email:e.target.value})}}  placeholder="name@gmail.com" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Username"className="mb-3">
              <Form.Control type="text" name="username"onChange={(e)=>{setData({...data,username:e.target.value})}}  placeholder="user" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password"className='mb-3'>
              <Form.Control type="password" name='password' onChange={(e)=>{setData({...data,password:e.target.value})}}  placeholder="Password" />
            </FloatingLabel>
           
           <div className='d-flex justify-content-between mt-4'>
            <button className='btn ' onClick={handleSubmit} style={{backgroundColor:"#8FBC8F"}} to={'/'}>SignUp</button>
            <Link to={'/'}>Already a User</Link>
            
           </div>
        </div>
    </div>
    </>
  )
}

export default Reg