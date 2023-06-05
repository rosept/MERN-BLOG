import axios from 'axios';
import React, { useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, InputLabel } from '@mui/material';
import { Box } from '@mui/system';


const labelStyles = { mb: 1, mt: 2, fontSize: '20px', fontWeight: 'bold' };

const BlogDetail = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const  id  = useParams().id;
  const [inputs, setInputs] = useState({
    // title: '',
    // description: '',
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchDetails = async () => {
      const res = await axios.get(`/api/blog/${id}`)
       .catch((err) => console.log(err));
      const data = await res.data;
      return data;
    } ;
  
  useEffect(() => {
    fetchDetails().then((data) => {
    setBlog(data.blog);
    setInputs({
        title: data.blog.title,
        description: data.blog.description,
      });
    });
  }, [id]);


  const sendRequest = async () => {
      const res = await axios.put(`/api/blog/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
      })
      
      .catch((err) => console.log(err));

      const data = await res.data;
      return data;
    } 
    
    console.log(blog);
    const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(data=>console.log(data))
    .then(()=>navigate("/myBlogs/"));

    };

  return (
    <div>
      {blog && (
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
      )}
    </div>
  );
};

export default BlogDetail;
