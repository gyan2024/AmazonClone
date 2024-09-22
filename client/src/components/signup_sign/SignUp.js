import { rootShouldForwardProp } from '@mui/material/styles/styled';
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [udata, setUdata]=useState({
    fname:"",
    email:"",
    mobile:"",
    password:"",
    cpassword:""
  });
  console.log(udata);

const addData = (e)=>{
  const {name, value}=e.target;

  setUdata(()=>{
    return{
      ...udata,
      [name]:value
    }
  })
}

const senddata = async(e)=>{
  e.preventDefault();
  const {fname,email, mobile,password,cpassword} = udata;

  const res = await fetch("register",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      fname,email, mobile, password, cpassword
    })
  });
  const data = await res.json();
  console.group(data);

  if(res.status === 422 || !data){
    //alert("no data");
    toast.warn("invalid details", {
      position:"top-center",
    })
  }else{
    toast.success("data successfully added", {
      position:"top-center",
    })
    setUdata({...udata, fname:"",email:"",mobile:"",password:"",cpassword:""});
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
              <form>
                <h1>Sign-up</h1>
                <div className='form_data'>
                  <label htmlFor='fmail'>Your name</label>
                  <input type='text' name ='fname' onChange={addData} value={udata.fname} id='fname'/>
                </div>
                <div className='form_data'>
                  <label htmlFor='email'>Email</label> 
                  <input type='text' name ='email' onChange={addData} value={udata.email} id='email'/>
                </div>
                <div className='form_data'>
                  <label htmlFor='number'>Mobile</label>
                  <input type='text' name ='mobile' onChange={addData} value={udata.mobile} id='mobile'/>
                </div>
                <div>
                  <label htmlFor='password'>Password</label>
                  <input type='password' name ='password' onChange={addData} value={udata.password} placeholder='At least 6 char' id='password'/>
                </div>
                <div>
                  <label htmlFor='cpassword'>Password Again</label>
                  <input type='password' name ='cpassword' onChange={addData} value={udata.cpassword} id='cpassword'/>
                </div>
                <button className='signin_btn' onClick={senddata}>Continue</button>
              </form>
              <div className="signin_info">
              <p>Already Have an Account?</p>
              <NavLink to="/login">Signin</NavLink> 
            </div>
            </div>
            <ToastContainer />
        </div>
    </section>
    </>
  )
}

export default SignUp
