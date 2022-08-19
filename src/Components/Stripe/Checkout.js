import React, { useState, useEffect } from "react";
import {loadStripe} from "@stripe/react-stripe-js"


let stripePromise
const  getStripe=()=>{
  if(!stripePromise){
     stripePromise=loadStripe(process.env.REACT_APP_STRIPE_KEY)

  }
  return stripePromise;
}
  const CheckOut=()=>{
  
    
    return(
<>




<button className="btn-success">
      
        <div className="text-container">
          <p className="text">Buy</p>
        </div>
      </button>







</>





    )




  }


export {CheckOut};