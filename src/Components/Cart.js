import React from 'react'

import {Navbar} from "./Navbar"
import { useState,useEffect } from 'react'
import { onAuthStateChanged} from 'firebase/auth'
import { getDoc,doc,data } from 'firebase/firestore'
import {auth,fs} from "./Config"
import { onSnapshot,collection,docs } from 'firebase/firestore'

const Cart = () => {
    const[cartProduct,setCartProduct]=useState(null);
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
   
     
   
         
          
       
      

 
         

  
  return (<>
  
  
  <Navbar  current={current}/>
  
  </>
   
  )
}

export {Cart}
