import React from 'react'
import {Icon} from 'react-icons-kit'
import {plus} from 'react-icons-kit/feather/plus'
import {minus} from 'react-icons-kit/feather/minus'
import { Grid } from '@mui/material';
import {auth,fs} from "./Config"



import { deleteDoc,doc} from 'firebase/firestore';
import "./IndividualsCart.css"
import { onAuthStateChanged } from 'firebase/auth';
const IndividualCartProduct = ({cartProduct,cartProductIncrease, cartProductDecrease}) => {
  const handleCartProductIncrease=()=>{
    cartProductIncrease(cartProduct);


  }
  const handleCartProductDecrease=()=>{
    cartProductDecrease(cartProduct);
  }
  const handleCartProductDelete=()=>{
    console.log("ok")
    onAuthStateChanged(auth,async (user)=>{
      if(user){
        doc(fs,"user"+user.uid,cartProduct.ID)
        await deleteDoc(  doc(fs,"user"+user.uid,cartProduct.ID))

       
        await console.log("Deleted successfully")

        


      }
      else{
        console.log("user not logged in")
      }


    })

  }
    console.log( "s",cartProduct);
  return (
      <>
      <Grid container spacing={3}>
        <Grid item xs>
          
    <div>
    
       <div className='product'>
            <div className='product-img'>
                <img src={cartProduct.downloadURL} alt="product-img"/>
            </div>
            <div className='product-text title'>{cartProduct.title}</div>
            <div className='product-text description'>{cartProduct.description}</div>
            <div className='product-text price'>${cartProduct.price}</div>
            <span>Quantity</span>
            <div className='product-text quantity-box'>

                <div className='action-btns minus'   onClick={handleCartProductDecrease}>
                <Icon icon={minus} size={20}/>
                    
                </div>                
                <div>{cartProduct.qty}</div>               
                <div className='action-btns plus' onClick={handleCartProductIncrease} >
                <Icon icon={plus} size={20}/>
                   
                </div>
            </div>
            <div className='product-text cart-price'>$ {cartProduct.total}</div>
            <div className='btn btn-danger btn-md cart-btn' onClick={handleCartProductDelete}>DELETE</div>            
        </div>
      
    </div>
    
    </Grid>
    </Grid>
    </>
  )
}

export  {IndividualCartProduct}
