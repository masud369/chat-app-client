import React from 'react';
import {BiPowerOff} from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const Logout = () => {
    const navigate = useNavigate()
    const handelLogout = ()=>{
        localStorage.clear();
        navigate("/login")

    }

    return (
        <Button onClick={handelLogout}>
            <BiPowerOff/>            
        </Button>
    );
};
const Button = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    padding:0.5rem;
    border-redius:0.5rem;
    border:none;
    color:#9a56f3;
    cursor:pointer;
    svg{
        color:#ebe7ff;
        font-size:1.3rem;
    }
`;
export default Logout;