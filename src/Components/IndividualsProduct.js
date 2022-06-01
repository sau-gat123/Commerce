import React from 'react'

const IndividualsProduct = ({products,AddToCart}) => {
      
    const  handleAddTOCart=(e)=>{
        e.preventDefault();
        AddToCart(products)


    }

    
  return (
    

    
    
        
       
         

      <div className='card' >
      

        <div className='product-img'>
          <img  src={products.downloadURL} alt="product-img" className='card-img-top'/>
        </div>
        <div className='card-body'>
        <div className='product-text title'>{products.title}</div>
        <p className='card-text'>{products.description}</p>
        <div className='product-text price'>${products.price}</div>
        <button className='btn btn-danger btn-md cart-btn' onClick={handleAddTOCart} >Add to cart</button>
        </div>
        </div>
       


      
      
    
  )
}

export { IndividualsProduct}
