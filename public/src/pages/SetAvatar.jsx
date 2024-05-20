import React, { useEffect} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function SetAvatar() {

    const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('chat-app-user')) {
      Navigate('/login');
    }
    else{
        navigate("/");
    }
  }, [navigate]);


//   
  return (
    <>
      redirecting
    </>
  )
}

export default SetAvatar