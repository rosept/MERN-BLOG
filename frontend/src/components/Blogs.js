import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Blog from './Blog';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const res = await axios.get(process.env.NODE_ENV === 'development' ? `http://${window.location.hostname}:5000/api/blog` : '/api/blog');
        const data = res.data;
        setBlogs(data.blogs);
      } catch (error) {
        console.error(error);
        setBlogs([]);
      }
    };

    sendRequest();
  }, []);

  useEffect(() => {
    console.log(blogs); // Log the updated blogs state
  }, [blogs]); // Trigger the effect whenever blogs state changes

  return (
    <div>
      {blogs.length > 0 ? (
        blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            isUser={localStorage.getItem('userId') === blog.user._id}
            key={index}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={blog.user ? blog.user.name : ''}
            time={blog.timeposted}
          />
        ))
      ) : (
        <p>
          No Blogs yet. <Link to="/blogs/add">Add a blog now!</Link>
        </p>
      )}
    </div>
  );
};

export default Blogs;
