import React, { useState, useEffect } from "react";
import axios from 'axios';
import Blog from "./Blog";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const sendRequest = async () => {
    try {
      const res = await axios.get(process.env.NODE_ENV === 'development' ? `http://${window.location.hostname}:5000/api/blog` :`/api/blog`);
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    sendRequest().then((data) => {
      setBlogs(data.blogs);
    });
  }, []);

  useEffect(() => {
    console.log(blogs); // Log the updated blogs state
  }, [blogs]); // Trigger the effect whenever blogs state changes

  return (
    <div>
      {blogs && blogs.map((blog, index) => (
        <Blog
          id={blog._id}
          isUser={localStorage.getItem("userId")===blog.user._id}
          key={index}
          title={blog.title}
          description={blog.description}
          imageURL={blog.image}
          userName={blog.user ? blog.user.name : ''}
          time={blog.timeposted} 
        />
      ))}
    </div>
  );
};

export default Blogs;