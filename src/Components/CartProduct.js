import React from "react";
import  {IndividualCartProduct}  from "./IndividualCartProduct";
 
 const CartProduct = ({cartProduct}) => {
     //console.log("p",cartProduct);
   return  cartProduct.map((cartProduct)=>{

        return <IndividualCartProduct key={cartProduct.ID} cartProduct={cartProduct}/>
       



   })
     
   
 }
 
 export { CartProduct}
 