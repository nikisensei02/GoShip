import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from '../assets/CHATBOAT.png';

export default function Contacts({ contacts, changeChat ,darkMode}) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  // const [darkModeContacts, setDarkModeContacts] = useState(false);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    const fetchUserData = async () => {
      const data = JSON.parse(localStorage.getItem('chat-app-user'));
      if (data) {
        setCurrentUserName(data.username);
        // setCurrentUserImage(data.avatarImage);
      }
    };

    fetchUserData();
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserName && (
        <Container darkMode={darkMode}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>GOship</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact ? contact._id : index} // Add a conditional check
                  className={`contact ${index === currentSelected ? "selected" : ""}`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="username">
                    <h3>{contact ? contact.username : ''}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              {/* <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              /> */}
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: ${(props) => (props.darkMode ? "#000000" : "#ffffff")};

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: ${(props) => (props.darkMode ? "#ffffff" : "#000000")};
      text-transform: uppercase;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: ${(props) => (props.darkMode ? "#000000" : "#ffffff")};
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: ${(props) => (props.darkMode ? "#000000" : "#ffffff")};
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border: 1px solid black;
      border-radius: 10px;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: ${(props) => (props.darkMode ? "#ffffff" : "#000000")};
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: ${(props) => (props.darkMode ? "#000000" : "#ffffff")};
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: ${(props) => (props.darkMode ? "#ffffff" : "#000000")};
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }

  @media screen and (max-width: 720px) {
    grid-template-rows: 15% 70% 15%;
    
    .brand {
      gap: 0.5rem;
      img {
        height: 1.5rem;
      }
      h3 {
        font-size: 1rem;
      }
    }

    .contacts {
      gap: 0.5rem;
      .contact {
        min-height: 4rem;
        padding: 0.2rem;
        .avatar {
          img {
            height: 2.5rem;
          }
        }
        .username {
          h3 {
            font-size: 1rem;
          }
        }
      }
    }

    .current-user {
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h2 {
          font-size: 1.2rem;
        }
      }
    }
  }
`;
