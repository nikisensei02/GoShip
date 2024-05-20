// components/Login.js
import React, { useEffect,useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import styled from 'styled-components';
import Logo from '../assets/CHATBOAT.png';
import axios from 'axios';
import { loginRoute } from '../utils/APIRoutes';

function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        password: ""
    });

    const toastOptions = {
        position: "top-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    };

    const handleValidation = () => {
        const { username, password } = values;
        if (username === "" || password === "") {
            toast.error("Username and password are required.", toastOptions);
            return false;
        }
        return true;
    };

    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
          navigate('/');
        }
      }, [navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const { username, password } = values;
            try {
                const { data } = await axios.post(loginRoute, { username, password });
                if (data.status === false) {
                    toast.error(data.msg, toastOptions);
                } else {
                    localStorage.setItem('chat-app-user', JSON.stringify(data.user));
                    navigate("/");
                }
            } catch (error) {
                toast.error("An error occurred. Please try again later.", toastOptions);
            }
        }
    };

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    return (
        <>
            <FormContainer>
                <form onSubmit={handleSubmit}>
                    <div className="brand">
                        <img src={Logo} alt="Logo" />
                        <h1>GoShip</h1>
                    </div>
                    <input
                        type="text"
                        placeholder='Username'
                        name='username'
                        onChange={handleChange}
                        min="3"
                    />
                    <input
                        type="password"
                        placeholder='Password'
                        name='password'
                        onChange={handleChange}
                    />
                    <button type='submit'>Login</button>
                    <span>
                        Don't have an account? <Link to="/register">Create</Link>
                    </span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    );
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;

    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img {
            height: 5rem;
        }
        h1 {
            color: white;
            text-transform: uppercase;
        }
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;
    }

    input {
        background-color: transparent;
        padding: 1rem;
        border: 0.1rem solid #191970;
        border-radius: 0.4rem;
        color: white;
        width: 100%;
        font-size: 1rem;
        &:focus {
            border: 0.1rem solid #191970;
            outline: none;
        }
    }

    button {
        background-color: #98f5ff;
        color: black;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        &:hover {
            background-color: white;
            color: black;
        }
    }

    span {
        color: white;
        text-transform: uppercase;
        a {
            color: #4e0eff;
            text-decoration: none;
            font-weight: bold;
        }
    }
`;

export default Login;
