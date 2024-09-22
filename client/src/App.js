import './App.css';
import Footer from './components/footer/Footer';
import Navbar from './components/header/Navbar';
import Maincomp from './components/home/Maincomp';
import Newnav from './components/newnavbar/Newnav';
import SignUp from './components/signup_sign/SignUp';
import Sign_in from './components/signup_sign/Sign_in';
import {Routes, Route} from "react-router-dom";
import Cart from './components/cart/Cart'
import Buynow from './components/buynow/Buynow';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';


function App() {
  const [data, setData] = useState(false);

  useEffect(()=>{
    setTimeout(()=>{
      setData(true)
    },2000)
  })

  return (
    <>
    {
      data?(
        <>
          <Navbar/>
      <Newnav/>
      <Routes>
        <Route path='/' element={<Maincomp />} />
        <Route path='/login' element={<Sign_in />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/getproductsone/:id' element={<Cart/>}/>
        <Route path='/buynow' element={<Buynow/>}/>
      </Routes>
      {/* <Maincomp/> */}
      <Footer/>
        </>
      ):(
        <div className='circle'>
          <CircularProgress/>
          <h2>loading...</h2>
        </div>
      )
    }
    
    </>
  );
}

export default App;
 