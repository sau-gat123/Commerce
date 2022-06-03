import React from 'react'
import {Icon} from 'react-icons-kit'
import {plus} from 'react-icons-kit/feather/plus'
import {minus} from 'react-icons-kit/feather/minus'

const IndividualCartProduct = ({cartProduct}) => {
    console.log( "s",cartProduct);
  return (
      
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
                <div></div>               
                <div className='action-btns plus' >
                <Icon icon={plus} size={20}/>
                   
                </div>
            </div>
            <div className='product-text cart-price'>$ {cartProduct.total}</div>
            <div className='btn btn-danger btn-md cart-btn'>DELETE</div>            
        </div>
      
    </div>
  )
}

export  {IndividualCartProduct}
