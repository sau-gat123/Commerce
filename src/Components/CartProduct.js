import React from "react";
import  {IndividualCartProduct}  from "./IndividualCartProduct";
import "./IndividualsCart.css"
 
 const CartProduct = ({cartProduct,cartProductIncrease, cartProductDecrease}) => {
     //console.log("p",cartProduct);
   return  cartProduct.map((cartProduct)=>{


        return (
        <div className="grid">
        
        <IndividualCartProduct key={cartProduct.ID} cartProduct={cartProduct}  cartProductIncrease={cartProductIncrease}  cartProductDecrease={ cartProductDecrease}/>
        </div>
     
        )



   })
     
   
 }
 
 export { CartProduct}
 