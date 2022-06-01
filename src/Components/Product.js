import React from 'react'
import { IndividualsProduct, } from './IndividualsProduct'

const Product = ({products,AddToCart}) => {
  console.log("product",products)
  
 
  
  return (
<>
<div className='d-inline' >
    <div className='container'>
      <div className='row'>
        <div className='col-md-3' styles={"position:relative"}>
    {products.map((s)=>{
      return <>
      <br></br>
      
      
      
        
     <IndividualsProduct key={s.ID} products={s} AddToCart={AddToCart} />
     
     
     </>
     

     
     
    }

    )
  }
</div>
</div>
</div>
</div>
     </> 
    
  
    
  )
    
}



export {Product}
