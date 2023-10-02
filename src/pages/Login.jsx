import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from '../assets/logo.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRout, registerRout } from "../utils/ApiRoutes";
import { useEffect } from "react";


const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username:"",
    email:"",
    password:"",
    confirmpassword:''
  })
  useEffect(()=>{
    if(localStorage.getItem('chat-item')){
      navigate("/")
    }
  },[])
  const handelSubmit = async(e) => {
    e.preventDefault();
    if(handelValidation()){
      console.log("api check ",registerRout)
      const {username,email,password} = values;
      const {data} = await axios.post(loginRout,{
        username,
        password
      })
      if(data.status === false){
        toast.error(data.msg,toastOption)
      }
      if(data.status === true){
        console.log(data.user)
        localStorage.setItem("chat-item", JSON.stringify(data.user))
        navigate("/")
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
    const {username,password} = values;
    if(username.length === "" ){
      toast.error("username and password are required ",toastOption)
    } else if(password === ""){
        toast.error("username and password are required",toastOption)
        return false;
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
            min="3"
          />
          <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => handelChange(e)}
        />
         
          <button type="submit">Login</button>
          <span>Don't have an account? <Link to="/register">Singup</Link> </span>
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
export default Login;
