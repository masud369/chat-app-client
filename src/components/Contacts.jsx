
import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";

const Contacts = ({ contacts, changeChat }) => {
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [currentUserName, setcurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);

  useEffect(() => {
    const callCurrentUerandImage = async() => {
      try{
        const data = await JSON.parse(localStorage.getItem("chat-item"));
      setcurrentUserName(data.username);
      setCurrentUserImage(data.avaterImage);
    
      }catch(err){console.log(err)}
      
  };
   callCurrentUerandImage();
  });
  const changeCurrentChat = (contact, index) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserName && currentUserImage &&(
        <Container>
            <div className="brand">
              <img src={Logo} alt="logo" />
              <h3>Chatty</h3>
            </div>
            <div className="contacts">
              {contacts.map((contact, index) => {
                return (
                  <div
                    className={`contact ${
                      index === currentSelected ? "selected" : ""
                    }`}
                    key={index}
                    onClick={() => {
                      changeCurrentChat(contact, index);
                    }}
                  >
                    <div className="avatar">
                      <img
                        src={`data:image/svg+xml;base64,${contact.avaterImage}`}
                        alt=""
                      />
                    </div>
                    <div className="username">
                      <h3>{contact.username}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="current-user">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentUserImage}`}
                  alt=""
                />
              </div>
              <div className="user-name">
                <h2>{currentUserName} </h2>
              </div>
            </div>
          </Container>
        )}
    </>
  );
};

const Container = styled.div`
display:grid;
grid-template-rows:10% 75% 15%;
overflow:hidden;
background-color:#080420;
.brand{
  display:flex;
  align-items:center;
  justify-content:center;
  gap:1rem;
  img{
    height:2rem;
  }
  h3{
    color:white;
    text-transform:uppercase;
  }
}
.contacts{
  display:flex;
  align-items:center;
  gap:0.8rem;
  flex-direction:column;
  overflow:auto;
  &::-webkit-scrollbar{
    width:0.2rem;
    &-thumb{
      background-color:#ffffff39;
      width:0.1rem;
      border-radius:1rem;
    }
  }
  
  .contact{
    background-color:#ffffff34;
    display:flex;
    min-height:5rem;
    cursor:pointer;
    border-radius:0.2rem;
    padding:0.4rem;
    align-items:center;
    gap:1rem;
    transition:0.5s ease-in-out;
    .avatar{
      img{
        height:3rem;
      }
    }
    .username{
      
      h3{
        color:white;
      }
    }
  }
  .selected{
    background-color:#9a86f3;
  }
}
.current-user{
  background-color:#0d0d30;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:2rem;
  .avatar{
    img{
      height:4rem;
      max-inline-size:100%;
    }
  }
  .user-name{
    h2{
      color:white;
    }
  }
  @media screen and(min-width:720px) and (max-width:1080px){
    gap:0.5rem;
    .user-name{
      h2{
        font-size:1rem;
      }
    }
  }
}

`;
export default Contacts;
