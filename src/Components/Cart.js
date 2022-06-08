import React from 'react'

import {Navbar} from "./Navbar"
import { useState,useEffect } from 'react'
import { onAuthStateChanged} from 'firebase/auth'
import { getDoc,doc,data, updateDoc } from 'firebase/firestore'
import {auth,fs} from "./Config"
import { onSnapshot,collection,docs } from 'firebase/firestore'
import { CartProduct } from './CartProduct'
import { async } from '@firebase/util'

const Cart = () => {

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
         console.log( cartProduct)   
   
     
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
       
      

 
         

  
  return (<>
  
  
  <Navbar  current={current}/>
  <br></br>
  {cartProduct.length>1 && <>
  <div className='container-fluid'>
    <h1 className='text-center'> 
    <CartProduct cartProduct={cartProduct} cartProductIncrease={cartProductIncrease} cartProductDecrease={cartProductDecrease}/>

    </h1>
    <div className='products-box'></div>

  </div>
  
  </>}
  {cartProduct.length<1 &&<>
  <div className='container-fluid'>No Product


  </div>
  
  
  </>}
 
  </>
   
  )
}

export {Cart}
