import React from 'react'
import {Icon} from 'react-icons-kit'
import {plus} from 'react-icons-kit/feather/plus'
import {minus} from 'react-icons-kit/feather/minus'
import { Grid } from '@mui/material';
import "./IndividualsCart.css"
const IndividualCartProduct = ({cartProduct,cartProductIncrease}) => {
  const handleCartProductIncrease=()=>{
    cartProductIncrease(cartProduct);


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

                <div className='action-btns minus' >
                <Icon icon={minus} size={20}/>
                    
                </div>                
                <div>{cartProduct.qty}</div>               
                <div className='action-btns plus' onClick={handleCartProductIncrease} >
                <Icon icon={plus} size={20}/>
                   
                </div>
            </div>
            <div className='product-text cart-price'>$ {cartProduct.total}</div>
            <div className='btn btn-danger btn-md cart-btn'>DELETE</div>            
        </div>
      
    </div>
    
    </Grid>
    </Grid>
    </>
  )
}

export  {IndividualCartProduct}
