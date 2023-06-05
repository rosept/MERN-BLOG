import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Auth from './components/Auth';
import Blogs from './components/Blogs';
import AddBlog from './components/AddBlog';
import UserBlogs from './components/UserBlogs';
import BlogDetail from './components/BlogDetail';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from "./store";

function App() {
  const dispath = useDispatch();

  const isLoggedIn = useSelector(state => state.isLoggedIn);
  console.log(isLoggedIn);
  useEffect(() => { 
    if(localStorage.getItem("userId")) {
       dispath(authActions.login());
    }

  }, [dispath, isLoggedIn]);

  const RedirectTo = ({ to='/auth/login' }) => {
    useEffect(() => {
      if (window.location.pathname !== to) {
        window.location.replace(to)
      }
    }, []);
    return <></>
  }

  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          {!isLoggedIn ? (<>
            <Route path="/auth" element={<RedirectTo to="/auth/login" />} />
            <Route path="/auth/login" element={<Auth isSignUp={false} />} />
            <Route path="/auth/signup" element={<Auth isSignUp={true} />} />
            <Route path="/" element={<RedirectTo to="/auth/login" />} />
          </>) : (
            <>
              <Route path="/auth" element={() => <Navigate to="/blogs" />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/add" element={<AddBlog />} />
              <Route path="/myBlogs" element={<UserBlogs />} />
              <Route path="/myBlogs/:id" element={<BlogDetail />} />
              <Route path="/" element={<RedirectTo to="/blogs" />} />
            </>
          )}
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;


