
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { authActions } from "../store";
import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography } from '@mui/material';



const Auth = () => {
  const navigate = useNavigate()
  const dispath = useDispatch();
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isSignup, setIsSignup] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (type = 'login') => {
    try {
      const res = await axios.post(`http://localhost:5000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
  
      const data = await res.data;
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (isSignup) {
      sendRequest('signup').then((data) =>localStorage.setItem("userId",data.user._id))
        .then(() => dispath(authActions.login())).then(()=>navigate("/blogs"))
        .then((data) => console.log(data));
    } else {
      sendRequest()
        .then((data) =>localStorage.setItem("userId",data.user._id))
        .then(() => dispath(authActions.login()))
        .then(()=>navigate("/blogs"))
        .then((data) => console.log(data));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          maxWidth={400}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
          sx={{ backgroundColor: 'pink', padding: 'pink' }}
        >
          <Typography variant="h5" padding={3} textAlign="center" sx={{ color: 'black' }}>
            {isSignup ? 'Signup' : 'Login'}
          </Typography>
          {isSignup && (
            <TextField name="name" onChange={handleChange} value={inputs.name} placeholder="Name" margin="normal" textColor="inherit" />
          )}
          <TextField name="email" onChange={handleChange} value={inputs.email} type="email" placeholder="Email" margin="normal" sx={{ color: 'pink' }} />
          <TextField
            name="password"
            onChange={handleChange}
            value={inputs.password}
            type="password"
            placeholder="Password"
            margin="normal"
            sx={{ color: 'pink' }}
          />

          <Button type="submit" sx={{ borderRadius: 1, marginTop: 3, backgroundColor: 'black', color: 'pink' }}>
            Submit
          </Button>
          <Button onClick={() => setIsSignup(!isSignup)} sx={{ marginTop: 1, color: 'black' }}>
            Change To {isSignup ? 'Login' : 'Signup'}
          </Button>

          <br />
        </Box>
      </form>
    </div>
  );
};

export default Auth;
