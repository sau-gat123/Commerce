import React from 'react'
import { Link } from 'react-router-dom'
import Icons from "./image/Daraz-Logo.jpg"
import {Icon} from "react-icons-kit"
import {shoppingCart} from "react-icons-kit/feather/shoppingCart"
import { auth } from './Config'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'



const Navbar = ({current,TotalProduct}) => {
  const navigate=useNavigate()
  const HandleLogut=async()=>{
     const  Logout=  await signOut(auth) 
    navigate("/login");

  
  }
  
  console.log(current);
  return (
    <div className="navbar">
      <div className='leftside'>
        <div className='logo'>

          <Link className='navLink' to="/">
          <img src={Icons} alt="logo"/> 

         </Link>
{
  
 
  
  
  

}
        </div>
        </div>
        <div className='rightside'>

        {!current&&<>
          
         <div> <Link to="/signup">SignUP</Link></div>
       <div> <Link to="/Login">Login</Link></div>
       </> }
       {current&&<>
                    <div><Link className='navlink' to="/">{current}</Link></div>
                    <div className='cart-menu-btn'>
                        <Link className='navlink' to="/cart">
                          <Icon icon={shoppingCart} size="20"></Icon>
                          
                        </Link>
                        <span className='cart-indicator'>{TotalProduct}</span> 
                    </div>
                    <div className='btn btn-danger btn-md'
                    onClick={HandleLogut}>LOGOUT</div>
                </>}              



        </div>


      </div>

    
  
    
  )
}

export  {Navbar}
