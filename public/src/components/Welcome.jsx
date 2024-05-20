import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

export default function Welcome({darkMode}) {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const fetchUserName = async () => {
      const userData = localStorage.getItem("chat-app-user");
      if (userData) {
        const { username } = JSON.parse(userData);
        setUserName(username);
      }
    };
  
    fetchUserName();
  }, []);
  return (
    <Container darkMode={darkMode}>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.darkMode ? "#ffffff" : "#000000")};
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;