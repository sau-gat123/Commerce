import React from 'react'
import "./../index.css"

const IndividualsFilterProduct = ({filterProduct,AddToCart}) => {
   
const handleAddTOCart=()=>{
    //AddToCart(fi)
}

  return  filterProduct.map((filterProduct)=>{
    
return (
    <>
    <div key={filterProduct.ID}>
   <div  className='product'>
    <div className='product-img'>
        <img src={filterProduct.downloadURL} />
    </div>
    <div className='product-title'>{filterProduct.title}</div>
    <div className='product-description'>{filterProduct.description}</div>
    <div className="product-price">${filterProduct.price}</div>
    <button className='btn btn-danger btn-md cart-btn' onClick={handleAddTOCart} >Add to cart</button>

    
     
     



</div>

</div>
</>





)
  }
  )

  
    
   
}

export  {IndividualsFilterProduct}
