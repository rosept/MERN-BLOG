import axios from 'axios';
import React from 'react'
import { useCallback } from 'react';
import { Avatar, Card, CardContent, CardMedia, CardHeader, Typography, IconButton , Box} from '@mui/material'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'


const Blog = ({title,description,imageURL,userName, isUser,id, time}) => {
   const navigate = useNavigate();
   const handleEdit = (e) => {
   navigate(`/myBlogs/${id}`);
   };
  const deleteRequest = () => new Promise(async(resolve, reject) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/blog/${id}`)
      const data = res.data;
      if (data) {
        await Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Successfully Delete Blog',
          timeout: 2000,
        })
      } else {
        throw new Error("Couldn't delete blog");
      }
      console.log("Successfully delete");
    } catch (err) {
      console.log(err)
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to Delete Blog',
        timeout: 2000,
      })
      reject(err)
    }
    resolve(window.location.href)
  })
  const handleDelete = () => {
    deleteRequest()
    .then((path)=> window.location.href = path)
    // .then(()=>navigate("/blogs"));
  };

  const convertTimestampToDate = useCallback((value) => {
    const datevalue = new Date(value);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];  
    return months[datevalue.getMonth()] + ' ' + datevalue.getDate() + ', ' + datevalue.getFullYear();
  }, []);

  return (
    <div>
        <Card sx={{ width: "30%", 
        margin:'auto',mt:2, 
        padding: 2, 
        backgroundColor: 'black',
        boxShadow: "5px 5px 10px #ccc",  
        ":hover": {
        boxShadow: "10px 10px 20px #ccc"
            
        }}}>
      {isUser && (
       <Box display="flex">
       <IconButton onClick={handleEdit} sx={{ marginLeft: 'auto' }}>
         <ModeEditOutlineIcon sx={{ color: 'pink' }} />
       </IconButton>
       <IconButton>
         <DeleteForeverIcon onClick={handleDelete} sx={{ color: 'pink' }} />
       </IconButton>
     </Box>

      )}


      <CardHeader
         avatar={
    <Avatar sx={{ backgroundColor: 'pink' }} aria-label="recipe">
      {userName.charAt(0)}
    </Avatar>
  }
        title={
    <Typography sx={{ color: 'pink' }} variant="h6" component="div">
      {title}
    </Typography>
  }
  subheader={
    <Typography sx={{ color: 'pink' }} variant="subtitle2" component="div">
      {convertTimestampToDate(time)}
    </Typography>
  }
/>
      <CardMedia
        component="img"
        height="194"
        image={imageURL}
        alt="Blackpink"
      />
     
      <CardContent>
      <hr />
      <br/>
        <Typography variant="body2" color="pink">
       <b>{ userName } </b> {":"} {description}
        </Typography>
      </CardContent>

    </Card>
      
    </div>
  )
}

export default Blog
