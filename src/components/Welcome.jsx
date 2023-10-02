import React from "react";
import styled from "styled-components";
import welcome from "../assets/robot.gif";

const Welcome = ({ currentUser }) => {
  return (
    <>
      <Container>
        <img src={welcome} alt="welcome" />
        <h1><span>{currentUser?.username}</span> </h1>
        <h3>Please select any of your frind to start the chat</h3>
      </Container>
    </>
  );
};
const Container = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    color:white;
    img{
        height:20rem;
    }
    span{
        color:#4e0eff;
    }
`;

export default Welcome;
