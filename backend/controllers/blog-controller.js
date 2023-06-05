import Blog from "../model/Blog.js";
import User from "../model/User.js";
import mongoose from "mongoose";

export const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().populate("user");
    if (!blogs.length) {
      return res.status(404).json({ message: "No blogs found" });
    }
    return res.status(200).json({ blogs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;

  try {
    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(400).json({ message: "Unable to find user by this ID" });
    }

    const blog = new Blog({
      title,
      description,
      image,
      user,
    });

    const savedBlog = await blog.save();

    existingUser.blogs.push(savedBlog._id);
    await existingUser.save();

    return res.status(200).json({ blog: savedBlog });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;

  try {
    const blog = await Blog.findByIdAndUpdate(blogId, { 
      title,
       description 
      
      });
    if (!blog) {
      return res.status(404).json({ message: "Unable to update the blog" });
    }
    return res.status(200).json({ blog });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "No blog found" });
    }
    return res.status(200).json({ blog });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteBlog = async (req, res, next) => {
  const id = req.params.id;

  try {
    const blog = await Blog.findByIdAndRemove(id).populate("user");
    if (!blog) {
      return res.status(404).json({ message: "Unable to delete blog" });
    }
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    return res.status(200).json({ message: "Successfully deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getByUserId = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const userBlogs = await User.findById(userId).populate("blogs");
    if (!userBlogs) {
      return res.status(404).json({ message: "No blog found" });
    }
    return res.status(200).json({ user: userBlogs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
