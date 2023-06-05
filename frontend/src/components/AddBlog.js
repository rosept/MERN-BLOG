import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button, InputLabel } from '@mui/material';
import { useNavigate } from "react-router-dom";

const labelStyles = { mb: 1, mt: 2, fontSize: '20px', fontWeight: 'bold' };

const AddBlog = () => {
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    imageURL: '',
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    try {
      const res = await axios.post(process.env.NODE_ENV === 'development' ? `http://${window.location.hostname}:5000/api/blog/add/` : '/api/blog/add/', {
        title: inputs.title,
        description: inputs.description,
        image: inputs.imageURL,
        user: localStorage.getItem('userId'),
      });
      const data = res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then((data) => console.log(data))
    .then(()=>navigate("/blogs"))
    ;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          border={3}
          borderColor="black"
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          display="flex"
          flexDirection="column"
          width="50%"
          sx={{ backgroundColor: 'pink' }}
        >
          <Typography
            fontWeight="bold"
            padding={3}
            color="black"
            variant="h4"
            textAlign="center"
          >
            Post Your Blog
          </Typography>
          <InputLabel sx={labelStyles}>Title</InputLabel>
          <TextField
            name="title"
            onChange={handleChange}
            value={inputs.title}
            margin="auto"
            variant="outlined"
          />

          <InputLabel sx={labelStyles}>Description</InputLabel>
          <TextField
            name="description"
            onChange={handleChange}
            value={inputs.description}
            margin="auto"
            variant="outlined"
          />

          <InputLabel sx={labelStyles}>ImageURL</InputLabel>
          <TextField
            name="imageURL"
            onChange={handleChange}
            value={inputs.imageURL}
            margin="auto"
            variant="outlined"
          />
          <Button
            sx={{
              mt: 2,
              borderRadius: 4,
              backgroundColor: 'black',
              color: 'pink',
            }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;
