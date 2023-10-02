import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import styled from "styled-components";
import Loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/ApiRoutes";

const SetAvatar = () => {
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedavatar, setSelectedavatar] = useState(undefined);
  const navigate = useNavigate();
  const toastOption = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const api = `https://api.multiavatar.com/4645646`;
  useEffect(() => {
    const callStoreData = async () => {
      // const storeData = await JSON.parse(localStorage.getItem("chat-item"));
      if (!JSON.parse(localStorage.getItem("chat-item"))) {
        navigate("/login");
      }
    };
    callStoreData();
  }, []);
  const setProfilePicture = async () => {
    if (selectedavatar === undefined) {
      toast.error("Please select an avatar", toastOption);
    } else {
      try {
        const user = await JSON.parse(localStorage.getItem("chat-item"));
        const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
          image: avatars[selectedavatar],
        });
        if (data.isSet) {
          user.isAvaterImageSet = true;
          user.avaterImage = data.image;
          localStorage.setItem("chat-item", JSON.stringify(user));
          navigate("/");
        } else {
          toast.error("Error setting avatar. Please try again.", toastOption);
        }
      } catch (err) {
        console.log("Error setting profile picture", err);
        toast.error("An error occurred! Please try again later", toastOption);
      }
    }
  };
  useEffect(() => {
    // Your async data fetching logic here
    const fetchData = async () => {
      try {
        const data = [];
        for (let i = 0; i < 4; i++) {
          const image = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`,
            { responseType: "arraybuffer" }
          );
          const buffer = new Buffer(image.data);
          data.push(buffer.toString("base64"));
        }
        setAvatars(data);
        setIsLoading(false);
      } catch (error) {
        // Handle errors here
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [api]);

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={Loader} alt="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an avatar as an your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedavatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={index}
                    onClick={() => setSelectedavatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className="submit-btn" onClick={setProfilePicture}>
            Set profile picture
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
};
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #131324;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 3rem;
  .title-container {
    h1 {
      color: white;
    }
  }
  .loader {
    max-inline-size: 100%;
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 0.4rem solid transparent;
      border-radius: 5rem;
      padding: 0.4rem;
      transition: 0.5s ease-inout;
      img {
        height: 6rem;
        transition: 0.5s ease-inout;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;

export default SetAvatar;
