import React from 'react'
import { Navbar } from "./Navbar"
import {Product} from './Product'
import {Link,useNavigate} from "react-router-dom"
import {auth,fs} from "./Config"
import {useState,useEffect} from "react"
import {onAuthStateChanged}from "firebase/auth"
import { collection,doc, getDoc,docs, getDocs,setDoc } from "firebase/firestore";
import { async } from '@firebase/util'




const Home = () => {
  const  navigation=useNavigate();

  // getin current user  uid
  const GetUserUid=()=>{
 const[UID,setUserUID]=useState(null);
  useEffect(()=>{
     onAuthStateChanged(auth,(user)=>{
       if(user){
         setUserUID(user.uid)
       }



     })





  })
  return UID




  }
  var user=GetUserUid();
  console.log(user)
 


  




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
  // state of product 
   
  const [product,setProduct]=useState([]);
  //getting product function
const getProduct=async()=>{
const data= await getDocs(collection(fs,"Product"))
console.log(data)
const productArray=[];
for (var snap of data.docs){

  var datas=snap.data();
  datas.ID=snap.id
  productArray.push({
    ...datas
  })
  setProduct(productArray)
  console.log(product)

}


}
 
 

 




   


  
useEffect(()=>{

  getProduct();




},[])


let Productsss
 function AddToCart (product){
   if(!user){
   navigation("/Login")
   console.log("hi");
   }
   else{
     console.log(product)
     Productsss=product;
     Productsss["qty"]=1;
     Productsss["total"]=Productsss.qty*Productsss.price
      setDoc(doc(fs, "user"+user, Productsss.ID), Productsss).then(()=>{
        console.log("product added successfully")
      });
    

   

   }

}










 



    

    
    
  

  return (
    <div>
     <Navbar current={current}/>
 <br></br>
 {product.length>0 &&<>
  <div className='container-fluid'>

   <h1 className='text-center'>Product</h1>
   <Product products={product} AddToCart={AddToCart}/>
  

 </div>
 </>

 }
 
 
 
 
    </div>
  )
}

export  {Home}
