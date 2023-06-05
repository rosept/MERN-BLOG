
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { authActions } from "../store";
import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';



const Auth = ({ isSignUp }) => {
  const navigate = useNavigate()
  const dispath = useDispatch();
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = (type = 'login') => new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(`/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });

      const data = await res.data;
      console.log(data);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (isSignUp) {
      sendRequest('signup').then((data) => {
        Swal.fire({
          icon: 'success',
          title: 'Signup Success',
          text: 'Registered Successfully',
          timeout: 2000
        })
        .then(() => {
          navigate('/auth/login')
        })
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response && error.response.data && error.response.data.message ? error.response.data.message : 'Something went wrong!',
          timeout: 3000
        })
      })
      // new Promise(res => {
      //   console.log("DATA RECEIVED:", data)
      //   // if (data) {
      //   //   localStorage.setItem("userId", data.user._id)
      //   // }
      //   res()
      // }))
        // .then(() => dispath(authActions.login())).then(()=>navigate("/blogs"))
        // .then((data) => console.log(data));
    } else {
      sendRequest()
        .then((data) =>localStorage.setItem("userId",data.user._id))
        .then(() => dispath(authActions.login()))
        .then(()=>navigate("/blogs"))
        .then((data) => console.log(data))
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response && error.response.data && error.response.data.message ? error.response.data.message : 'Something went wrong!',
            timeout: 3000
          })
        });
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
            {isSignUp ? 'Signup' : 'Login'}
          </Typography>
          {isSignUp && (
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
          <Button onClick={() => navigate(isSignUp ? '/auth/login' : '/auth/signup')} sx={{ marginTop: 1, color: 'black' }}>
            Change To {isSignUp ? 'Login' : 'Signup'}
          </Button>

          <br />
        </Box>
      </form>
    </div>
  );
};

export default Auth;
