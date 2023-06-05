import axios from 'axios';
import React from 'react'
import { Avatar, Card, CardContent, CardMedia, CardHeader, Typography, IconButton , Box} from '@mui/material'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useNavigate} from 'react-router-dom'


const Blog = ({title,description,imageURL,userName, isUser,id}) => {
   const navigate = useNavigate();
   const handleEdit = (e) => {
   navigate(`/myBlogs/${id}`);
   };
  const deleteRequest = async() => {
    const res = await axios.delete(`http://localhost:5000/api/blog/${id}`)
    .catch(err=>console.log(err))
    const data = await res.data;
    return data
  }
  const handleDelete = () => {
  deleteRequest()
  .then(()=>navigate("/"))
  .then(()=>navigate("/blogs"));
  };

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
      June 03, 2023
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
