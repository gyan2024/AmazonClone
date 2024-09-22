import React, { useState, useContext } from 'react'
import "./signup.css"
import { Button } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from '../context/ContextProvider';

const Sign_in = () => {
  const [logdata, setData] = useState({
    email:"",
    password:""
  });

  const {account, setAccount} = useContext(LoginContext);

  const addData = (e)=>{
    const {name, value} = e.target;
    setData((logdata)=>{
      return {
        ...logdata,
        [name]:value
      }
    })
  }

  const senddata = async(e)=>{
    e.preventDefault();

    const {email, password} = logdata

    const res = await fetch("/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email, password
      })
    })
    const data = await res.json();
    console.log(data);

    if(res.status == 400 || !data){
      console.log("invalid details");
      toast.warn("invalid details", {
        position:"top-center",
      });
    }else{
      console.log("data valid");
      setAccount(data);
      setData({...logdata, email:"",password:""});
      toast.success("user valid", {
        position:"top-center",
      });
    }
  }

  return (
    <>
    <section>
        <div className="sign_container">
            <div className="sign_header">
                <img src="./blacklogoamazon.png" alt="amazonlogo" />
            </div>
            <div className="sign_form">
              <form method='POST'>
                <h1>Sign-In</h1>
                <div className='form_data'>
                  <label htmlFor='email'>Email</label>
                  <input type='email' onChange={addData} value = {logdata.email} name ='email' id='email'/>
                </div>
                <div>
                  <label htmlFor='password'>Password</label>
                  <input type='password' onChange={addData} value={logdata.password} name ='password' placeholder='At least 6 characters' id='password'/>
                </div>
                <button className='signin_btn' onClick={senddata}>Continue</button>
              </form>
              <ToastContainer/>
            </div>
            <div className="create_accountinfo">
              <p>New To Amazon</p>
              <NavLink to="/register"><button>Create your amazon account</button></NavLink> 
            </div>
        </div>
       
    </section>
    </>
  )
}

export default Sign_in
