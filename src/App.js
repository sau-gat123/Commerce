import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import {Home} from "./Components/Home"
import {SignUp} from './Components/SignUp';
import { Login } from './Components/Login';
import{ NotFound} from "./Components/Notfound";
import {app} from "./Components/Config"
import {AddProduct} from "./Components/AddProduct"
import {Cart}from "./Components/Cart"


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home/>}></Route>
  <> Ecommerce Sites with react hook and firebase</>
  <Route path="/signup" element={<SignUp/>}></Route>
  <Route path="/Login" element={<Login/>}></Route>
  <Route path="/product" element={<AddProduct/>}></Route>
  <Route path="/cart" element ={<Cart/>}></Route>
  <Route path="/create-checkout-session" element ={<Cart/>}></Route>

<Route path='*' element={<NotFound/>}></Route>
</Routes>
  </BrowserRouter>
  );
}

export default App;
