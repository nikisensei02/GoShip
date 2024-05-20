import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userKey = "chat-app-user";
      const storedData = localStorage.getItem(userKey);

      if (!storedData) {
        navigate("/login");
      } else {
        try {
          const parsedData = JSON.parse(storedData);
          setCurrentUser(parsedData);
        } catch (error) {
          console.error("Error parsing user data from localStorage:", error);
          navigate("/login");
        }
      }
    };

    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchContacts = async () => {
      if (currentUser) {
        try {
          const { data } = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data);
        } catch (error) {
          console.error('Error fetching contacts:', error);
        }
      }
    };

    fetchContacts();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Container darkMode={darkMode}>
      <div className="container">
        <Contacts contacts={contacts} changeChat={handleChatChange} darkMode={darkMode}/>
        {currentChat === undefined ? (
          <Welcome darkMode={darkMode}/>
        ) : (
          <ChatContainer currentChat={currentChat} socket={socket} darkMode={darkMode}/>
        )}
      </div>
      <DarkModeButton darkMode={darkMode} onClick={toggleDarkMode}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </DarkModeButton>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: ${(props) => (props.darkMode ? "#131324" : "#ffffff")};

  .container {
    height: 85vh;
    width: 85vw;
    background-color: ${(props) =>
      props.darkMode ? "#00000076" : "#f0f0f0"};
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

const DarkModeButton = styled.button`
  position: absolute;
  bottom: 2px;
  left: 50%;
  background-color: ${(props) => (props.darkMode ? "#ffffff" : "#000000")};
  color: ${(props) => (props.darkMode ? "#000000" : "#ffffff")};
  border: 2px solid gray;
  border-radius: 100px;
  cursor: pointer;
  padding: 10px;
`;
