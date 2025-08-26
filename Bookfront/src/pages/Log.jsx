import React from 'react'
import { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { loginApi } from '../AllApiServices/allApis';

function Log() {
    const [user,setUser]=useState({
        username:"",password:""
      })
      const nav=useNavigate()
      const handleLogin=async()=>{
        const {username,password}=user
        if(!username|| !password){
          toast.warning('Enter valid input')
    
        }
        else{
          try{
            const result= await loginApi(user)
            console.log(result)
            if(result.status==200){
              toast.success("login successfull")
              sessionStorage.setItem("token",result.data.token)
              nav('/dash')
            }
            else{
              toast.error("Login failed")
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
            <h3 className='my-3 text-center text-secondary'> Login</h3>
            <FloatingLabel controlId="floatingInput"label="Username"className="mb-3">
              <Form.Control type="text" name="username" onChange={(e)=>{setUser({...user,username:e.target.value})}} placeholder="user" />
            </FloatingLabel>
           <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control type="password" name="password" onChange={(e)=>{setUser({...user,password:e.target.value})}} placeholder="Password" />
           </FloatingLabel>
           <div className='d-flex justify-content-between mt-4'>
            <button className='btn ' onClick={handleLogin} style={{backgroundColor:"#8FBC8F"}}>Login</button>
            <Link to={'/reg'}> New User</Link>
           </div>
        </div>
    </div>
    </>
  )
}

export default Log