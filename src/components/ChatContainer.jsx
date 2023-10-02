import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { sendMessage, getMessage} from "../utils/ApiRoutes";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import axios from "axios";
import { useState } from "react";


const ChatContainer = ({ currentChat, currentUser, socket}) => {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    console.log(currentChat._id)
    const callStrogeUser = async()=>{
      const data = await JSON.parse(
        localStorage.getItem("chat-item")
      );
      const response = await axios.post(getMessage, {
        from: data._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    }
    callStrogeUser();
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem("chat-item")
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem("chat-item")
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessage, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        console.log(msg)
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);
  console.log(arrivalMessage)

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat?.avaterImage}`}
              alt="avaterimage"
            />
          </div>
          <div className="user-name">
            <h3>{currentChat?.username} </h3>
          </div>
        </div>
          <Logout />
      </div>
      <div className="chat-massege">
        {
          messages.map((message, index)=>{
            return (<div key={index}>
              <div className={`message ${message?.fromSelf ? "send":"recived"}`}>
              <div className="content"> <p>{message?.message}</p> </div>
              </div>
            </div>);
          })
        }
      </div>
      <ChatInput handleSendMsg={handleSendMsg}/>
    </Container>
  );
};
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 0.1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .user-name {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-massege{
    padding:1rem 2rem;
    display:flex;
    flex-direction:column;
    gap:1rem;
    overflow:auto;
    .message{
      display:flex;
      align-items:center;
      .content{
      max-width:40%;
      overflow-wrap:break-word;
      padding:1rem;
      font-size:1.1rem;
      border-radius:1rem;
      color:#d1d1d1;
      }
    }
    .send{
      justify-content:flex-end;
      .content{
        background-color:#4f04ff21;
      }
    }
    .recived{
      justify-content:flex-start;
      .content{
        background-color:#4f04ff21;
      }
    }
  }

`;
export default ChatContainer;
