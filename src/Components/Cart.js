import React from 'react'

import {Navbar} from "./Navbar"
import { useState,useEffect } from 'react'
import { onAuthStateChanged} from 'firebase/auth'
import { getDoc,doc,data, updateDoc } from 'firebase/firestore'
import {auth,fs} from "./Config"
import { onSnapshot,collection,docs } from 'firebase/firestore'
import { CartProduct } from './CartProduct'
import { async } from '@firebase/util'
import StripeCheckout from 'react-stripe-checkout'; 
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify'


 
const Cart = () => {
  const Navigate=useNavigate();

    const[cartProduct,setCartProduct]=useState([]);
     // getin current user  uid
  
    
     const [current,setCurrent]=useState(null)
  useEffect(()=>{
    onAuthStateChanged(auth,( async(user)=>{
        const DocRef=doc(fs,"user",user.uid);
        const getUser=await getDoc(DocRef);
        if(getUser.exists()){
          setCurrent(getUser.data().name)
        }
        else{
          setCurrent(null)
        }
        

  

      
       
    }))
    console.log(current);
    
  })
  // State of Cart Product
  
  // getting collectin of cart product form firestore

  useEffect(()=>{
      onAuthStateChanged(auth,(user)=>{

          if(user){
            const unsub = onSnapshot(collection(fs, "user"+user.uid), (doc) => {
                const newCartProduct= doc.docs.map((doc)=>{
                    console.log(doc.data());
                  
                    return (
                        {
                            ID: doc.id,
                            ...doc.data()
                        }
                    )
                    

                })
            
                setCartProduct(newCartProduct);
              
                
                
            });

          }
          else{
              console.log("no user")

          }

      })
      

  },[])
         console.log("s",cartProduct)   
     // gettting the product quanity in seoerate array
     const Qty=cartProduct.map((cartProduct)=>{
       return cartProduct.qty;

     })  
     //console.log("p",reduceQty);  
   //reducing the quantity in single Value

   const reduceOfQty=(accumulator,currentValue)=>accumulator+ currentValue;
    const totalQty=Qty.reduce(reduceOfQty,0);
     console.log(totalQty);
     //getting the product price   in a seperate array
    const Price =cartProduct.map((cartProduct)=>{
       return cartProduct.total;

     })
    console.log("total",Price);
     const reducePrice= (accumulator,currentValue)=>accumulator + currentValue;
     const TotalPrice=Price.reduce(reducePrice,0)
     
   let prdt
         
         //CartProductIncrease
         const cartProductIncrease=(cartProduct)=>
         {
           console.log(cartProduct);
        prdt=cartProduct;
        prdt.qty=prdt.qty+1;
        prdt.total=prdt.qty *prdt.price;
        onAuthStateChanged(auth,async (user)=>{
          if(user){
           // doc(fs,"user"+user.uid,cartProduct.ID)
            await updateDoc(  doc(fs,"user"+user.uid,cartProduct.ID),prdt)
            await console.log("incremented")

            


          }
          else{
            console.log("user not logged in")
          }


        })


         } 
         //cart Product Decrease functionaliy
         const  cartProductDecrease=(cartProduct)=>{
           prdt=cartProduct
           if(prdt.qty>1){
            prdt.qty=prdt.qty-1;
            prdt.total=prdt.qty *prdt.price;
            onAuthStateChanged(auth,async (user)=>{
              if(user){
               // doc(fs,"user"+user.uid,cartProduct.ID)
                await updateDoc(  doc(fs,"user"+user.uid,cartProduct.ID),prdt)
                await console.log("Decremented")
    
                
    
    
              }
              else{
                console.log("user not logged in")
              }
    
    
            })

           }

         }
       
      // charging Payment 
      const handleToken=async(token)=>{
        console.log(token);
      
      const cart ={name:'All product',TotalPrice:TotalPrice}
      const response = await axios.post("http://localhost:8081/checkout",{
        token,
        cart
    })
    console.log(response);
      
      let {status}=response.data;
      console.log(status);
      if(status==="success"){
         Navigate('/')
         toast.success('Your order has been placed successfully', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      }
      else{
      alert("some thing went wrong in checkout");
        
         toast.success('Your order has been placed successfully', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          
        });
        Navigate('/')
        

      }

    


      } 
const key="pk_test_51L927lSGxWwnG8rhtspkqDAQn7wdaUHRuHVyzlTf4IclRSlp2r8mby5Ojf9aNIqxXFhjJVIOz52tj4O2rSfvqehj00LTpZ6vEk"

         

  
  return (<>
  
  
  <Navbar  current={current}/>
  <br></br>
  {cartProduct.length>1 && <>
  <div className='container-fluid'>
    <h1 className='text-center'> 
    <CartProduct cartProduct={cartProduct} cartProductIncrease={cartProductIncrease} cartProductDecrease={cartProductDecrease}/>

    </h1>
   

  </div>
  <>
  <div className='summary-box'>
  <h5>Cart Summary</h5>
                        <br></br>
                        <div>
                        Total No of Products: <span>{totalQty}</span>
                        </div>
                        <div>
                        Total Price to Pay: <span>${TotalPrice}</span>
                        </div>
                        <br></br>

                        <form action="/create-checkout-session" method="POST">
      <button type="submit">Checkout</button>
    </form>
                        
                       
                    </div>  
  </>
  
  </>}
  
  {cartProduct.length<1 &&<>
  <div className='container-fluid'>No Product


  </div>
  
  
  </>}
 
  </>
   
  )
}

export {Cart}
