const cors = require('cors');
const express=require("express");
//add stripe secret key
const stripe=require("express")("sk_test_51L927lSGxWwnG8rh1vNZuK4indKUb41awFNirLzHkwHogE0JDId6Z4INMkI9iSebRcSc3G0meDDc6dhIsEADhW4u00ISontRLY");
  const app =express();
  const uuid=require("uuid");

  //middleware
  app.use(express.json());
  app.use(cors());

  //routes
app.get("/",(req,res)=>{
    res.send('IT WORKS ')
})
//post routes
app.post('/payment ',async(req,res)=>{
    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'T-shirt',
              },
              unit_amount: 2000,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'https://localhost:3000/success',
        cancel_url: 'https://example.com:3000/cancel',
      });
      res.redirect(303, session.url);
})


  //listen
  app.listen(8000
    ,()=>{console.log("listing at port 8282")})