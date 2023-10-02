import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import { allUserRoute, serverHost } from "../utils/ApiRoutes";
import {io} from 'socket.io-client';
import { useRef } from "react";

const Chat = () => {
  const navigate = useNavigate();
  const socket = useRef();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  useEffect(() => {
    try {
      const checkUser = async () => {
        if (!localStorage.getItem("chat-item")) {
          console.log("no user");
          navigate("/login");
        } else {
          setCurrentUser(await JSON.parse(localStorage.getItem("chat-item")));
        }
      };
      checkUser();
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(()=>{
    if(currentUser){
      socket.current = io(serverHost);
      socket.current.emit("add-user",currentUser._id);
    }
  },[currentUser])

  useEffect(() => {
    const checkAvatar = async () => {
      try {
        if (currentUser) {
          if (currentUser.isAvaterImageSet) {
            const { data } = await axios.get(
              `${allUserRoute}/${currentUser._id}`
            );
            setContacts(data);
            console.log(data);
          } else {
            navigate("/setAvatar");
          }
        }
      } catch (error) {
        // Handle errors here
        console.error("Error fetching user data:", error.message);
      }
    };

    checkAvatar();
  }, [currentUser, navigate]);

  const handelChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handelChatChange} />
          {currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
          )}
        </div>
      </Container>
    </>
  );
};
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: #131326;
  .container {
    height: 85vh;
    width: 85vw;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and(min-width:720px) and (max-width: 1080px) {
      grid-template-colmuns: 35% 65%;
    }
  }
`;
export default Chat;
