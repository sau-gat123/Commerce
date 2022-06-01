import React, { useEffect } from 'react'
import {Link}from "react-router-dom"
import {useState} from "react"
  import { signInWithEmailAndPassword } from 'firebase/auth'
  import { doc,setDoc } from 'firebase/firestore'
  import {auth,fs} from "./Config"
  import { useNavigate } from 'react-router-dom'
const Login = () => {
  const navigate=useNavigate()
    const [FullName,setFullName]= useState("")
  const [password,setpassword]= useState("")
  const [email,setEmail]= useState("")

  const [errMessage,setErrMessage]=useState('')
  const [success,setSuccess]=useState('');
  const handleLogin=(e)=>{
      e.preventDefault();
    //  console.log(email,FullName,password);
     signInWithEmailAndPassword(auth,email,password).then(()=>{
    
        setSuccess('Login SuccesFul');
        setFullName('')
        setpassword("")
        setEmail('')
        setErrMessage('')
        
     })
     
       
  }
  useEffect(()=>{
    if(success){
      navigate('/')
    }
  }
  )


  return (
    <div className='container'>
      <br></br> 
      <br></br>
    {setSuccess&& <>
    <div className="success"> {success}</div></>}
      <h1>Login</h1>
      <hr></hr>
      <form className='form-group ' autoComplete="off" onSubmit={handleLogin}>
        <label>Name</label>
        
        <input type="text" className='form-control' required  value={FullName}  onChange={(e)=>setFullName(e.target.value)}  />
        <br></br>
        <label>Email</label>

        <input type="Email" className='form-control' required   value={email}  onChange={(e)=>setEmail(e.target.value)}/>
        <br></br>
        <label>password</label>
        <input type="password" className='form-control' required  value={password}  onChange={(e)=>setpassword(e.target.value)}/>
        <div  className='btn-box'>
          <span>Dont't have an account<Link to="/SignUp">Click here</Link></span>
          <button type='submit' className='btn btn-success btn-md'>Submit</button>
        </div>

      </form>




  
    </div>
  )
}

export  {Login}
