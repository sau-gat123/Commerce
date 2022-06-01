import React from 'react'
import {auth,fs} from "./Config"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc,setDoc } from 'firebase/firestore'

import {Link, Navigate} from "react-router-dom"
import { useState } from 'react'
import { connectStorageEmulator } from 'firebase/storage'
import { fireEvent } from '@testing-library/react'
import {  } from 'react-router-dom'

const SignUp = () => {
  const [FullName,setFullName]= useState("")
  const [password,setpassword]= useState("")
  const [email,setEmail]= useState("")

  const [errMessage,setErrMessage]=useState('')
  const [success,setSuccess]=useState('');
  const handleSignUp=(e)=>{
    e.preventDefault();
    console.log(FullName,email,password);
    createUserWithEmailAndPassword(auth,email,password).then((credential)=>{
      console.log(credential);
    
  
      setDoc(doc(fs, "user",credential.user.uid), {
        name: FullName,
        email: email,
        password: password
      }).then(()=>
      {
        setSuccess('SignUp SuccesFul');
        setFullName('')
        setpassword("")
        setEmail('')
        setErrMessage('')
       
      }
      
 
      ).catch((err)=>{

setErrMessage(err.message);
      })
        
    })

  
    }

 
    


    
  
  
  return (
    <div className='container'>
      <br></br>
      <br></br>
    {success&& <>
    <div className='success-msg'>{success}</div></>}
      <h1>SignUp</h1>
      <hr></hr>
      <form className='form-group ' autoComplete="off" onSubmit={handleSignUp}>
        <label>Name</label>
        
        <input type="text" className='form-control' required value={FullName}  onChange={(e)=>setFullName(e.target.value)}/>
        <br></br>
        <label>Email</label>

        <input type="Email" className='form-control' required  value={email}  onChange={(e)=>setEmail(e.target.value)} />
        <br></br>
        <label>password</label>
        <input type="password" className='form-control' required  value={password}  onChange={(e)=>setpassword(e.target.value)} />
        <div  className='btn-box'>
          <span>Already have an account<Link to="/login">Here</Link></span>
          <button  type="submit"  className='btn btn-success btn-md'>Submit</button>
        </div>

      </form>




  
    </div>
  )
}

export  {SignUp}
