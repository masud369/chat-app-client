import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from '../assets/logo.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRout } from "../utils/ApiRoutes";

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username:"",
    email:"",
    password:"",
    confirmpassword:''
  })
    useEffect(() => {
    if (localStorage.getItem('chat-item')) {
      navigate("/");
    }
  }, []);
  const handelSubmit = async(e) => {
    e.preventDefault();
    if(handelValidation()){
      console.log("api check ",registerRout)
      const {username,email,password} = values;
      const {data} = await axios.post(registerRout,{
        username,
        email,
        password
      })
      console.log(data)
      if(data.status === false){
        toast.error(data.msg,toastOption)
      }
      if (data.status === true) {
        localStorage.setItem(
          "chat-item",
          JSON.stringify(data.user)
        );
        navigate("/");
      }

    }
  };
  const toastOption = {
    position:"bottom-right",
    autoClose:5000,
    pauseOnHover:true,
    draggable: true,
    theme:"dark",
  }
  const handelValidation = ()=>{
    const {username,email,password,confirmpassword} = values;
    if(password !== confirmpassword){
      toast.error("password and confirm password should be same",toastOption
      );
      return false;
    }else if(username.length <= 3 || username.length > 8 ){
      toast.error("username should be greater than 3 character and less than 8 character",toastOption)
    }else if(password <= 8){
      toast.error("password hould be more than equal 8 charater",toastOption)
      return false;
    }else if(email === ""){
      toast.error("email is requiired!!",toastOption)
    }
    return true;
  }
  
  const handelChange = (e) => {
    setValues({...values,[e.target.name]:e.target.value})
  };

  return (
    <>
      <FormContainer>
        <form
          onSubmit={(e) => {
            handelSubmit(e);
          }}
        >
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>Chatly</h1>
          </div>
          <input
            type="text"
            name="username"
            placeholder="username"
            onChange={(e) => handelChange(e)}
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            onChange={(e) => handelChange(e)}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={(e) => handelChange(e)}
          />
          <input
            type="password"
            name="confirmpassword"
            placeholder="confirm-password"
            onChange={(e) => handelChange(e)}
          />
          <button type="submit">Create User</button>
          <span>already have an account? <Link to="/login">Login</Link> </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};
const FormContainer = styled.div`
    height:100vh;
    width:100vw;
    display:flex;
    flex-direction:colmun;
    justify-content:center;
    background-color:#131324;
    .brand{
        display:flex;
        align-items:center;
        gap:1rem;
        justify-content:center;
        img{
            height:5rem;
        }
        h1{
            color:white;
        }
    }
    form{
        display:flex;
        flex-direction:column;
        gap:2rem;
        background-color:#00000076;
        border-radius:2rem;
        padding:3rem 5rem;
        input{
            background-color:transparent;
            padding:1rem;
            border:0.1rem solid #4e0eff;
            border-radius:0.4rem;
            color:white;
            width:100%;
            font-size:1rem;
            &:focuse{
                border:0.1rem solid #997af0;
                outline:none;
            }
        }
        button{
            background-color:#997af0;
            color:white;
            padding:1rem 2rem;
            border:none;
            font-weight:bold;
            cursor:pointer;
            border-radius:0.4rem;
            font-size:1rem;
            text-transform:uppercase;
            transition:0.5s ease-in-out;
            &:hover{
                background-color:#4e0eff;
            }
        }
        span{
            color:white;
            text-transform:uppercase;
            a{
              text-decoration:none;
              font-weight:bold;
            }
        }
    }

`;
export default Register;
