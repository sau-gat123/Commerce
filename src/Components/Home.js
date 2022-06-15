import React from 'react'
import { Navbar } from "./Navbar"
import {Product} from './Product'
import {Link,useNavigate} from "react-router-dom"
import {auth,fs} from "./Config"
import {useState,useEffect} from "react"
import {onAuthStateChanged}from "firebase/auth"
import { collection,doc, getDoc,docs, getDocs,setDoc ,onSnapshot} from "firebase/firestore";
import { async } from '@firebase/util'
import  {IndividualsFilterProduct} from './IndividualsFilterProduct'




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
//state of Total Product
const [TotalProduct,setTotalProduct]=useState(0);
//getting cart Producty

useEffect(()=>{
  onAuthStateChanged(auth,((user)=>{
    if(user){
      const unsub = onSnapshot(collection(fs, "user"+user.uid), (snapshot) => {
        const qty=snapshot.docs.length;
        setTotalProduct(qty);

          
              
            
           
              

          }
      
       
      )} 
          
          
      

    
    else{
        console.log("no user")

    }


  }))



},[])
//console.log(TotalProduct);






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


// filtered product States

const [filterProduct,setFilterProduct]=useState([]);
const [spans]=useState([{
  id:1,
  text:"Men"


  
},
{
  id:2,
  text:"women"


  
},
{
  id:3,
  text:"Casual"


  
},
{
  id:4,
  text:"Formal"


  
},
{
  id:5,
  text:"Men"


  
},
{
  id:6,
  text:"Summer"


  
}])
const[active,setActive]=useState('');
//category state
const[category,setCategory]=useState('');
 
const handleList=(IndividualSpan)=>{
  filterFunction(IndividualSpan.text);
  console.log(IndividualSpan.text);
  
  



}
const filterFunction=(text)=>{
  const filter=product.filter((product)=>product.category===text)
  setFilterProduct(filter);

}










 



    

    
    
  

  return (
    <div>
     <Navbar current={current} TotalProduct={TotalProduct}/>
 <br></br>
 
  <div className='filter'>
{
  <>
  <ul>
    {
spans.map((IndividualSpan,index)=>{
  return (<><li key={IndividualSpan.id} id={IndividualSpan.id} onClick={()=>{handleList(IndividualSpan)}}> {IndividualSpan.text}</li></>)


})
}
</ul>
</>

}


  </div>

  
  {
  filterProduct.length>0 &&(<>
  <IndividualsFilterProduct/>
  </>)


  }
  {
    filterProduct<1&&(
      <>
      {product.length>0 && (<>
      <div className='my-product'>
        <h1 className='text-center' >All Product</h1>
        <div className='product-box'>
          <Product products={product} AddToCart={AddToCart}/>


        </div>

      </div>
      
      
      </>)
     
      
      
      }
   {
    product.length<1&&(<>
    <div className='my-products please-wait'>Please Wait....</div>
    
    
    
    </>)
   }
      
      </>
    )
    
  }







 </div>


 
 
 
 
 
  )
}

export  {Home}
