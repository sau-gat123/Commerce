import React from 'react'
import { IndividualsProduct, } from './IndividualsProduct'


const Product = ({products,AddToCart}) => {
  console.log("product",products)
  
 
  
  return (
<>

    
      
      
    {products.map((s)=>{
      return <>
      
        <div className='product'>
     <IndividualsProduct key={s.ID} products={s} AddToCart={AddToCart} />
     </div>
     
     
     </>
     

     
     
    }

    )
  }




     </> 
    
  
    
  )
    
}



export {Product}
