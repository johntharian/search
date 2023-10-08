import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from 'react-router-dom';

import axios from "axios";

import { Button } from "@mui/material";

function Login({setUser}) {

  const navigate = useNavigate();
  const SCOPES = "https://www.googleapis.com/auth/drive";

  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async ({ code }) => {
      console.log(code);
      const data = await axios.post("http://localhost:3001/auth/google", {
        // http://localhost:3001/auth/google backend that will exchange the code
        code,
      });

      console.log(data);
      console.log(3,data.data);
      
      localStorage.setItem('user', data.data.name)
      localStorage.setItem('picture', data.data.picture)
      localStorage.setItem('indexed', data.data.indexed)
      localStorage.setItem('email', data.data.email)

      

      setUser(data.data)
      navigate('/home');
    },
    onError: (errorResponse) => {
      console.log(errorResponse);
    },
    scope: SCOPES,
  });

  return (
    <>
        <Button variant="contained" onClick={() => login()}>
        Sign in with Google
      </Button>
    </>
  )
}

export default Login