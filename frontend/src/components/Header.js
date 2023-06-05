import React, { useState } from 'react';
import { AppBar, Typography, Toolbar, Box, Button, Tabs, Tab } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from "../store";


const Header = () => {
  const dispath = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setvalue] = useState();

  return (
    <AppBar position="sticky"  sx={{ backgroundColor: 'pink'}}>
      <Toolbar>
        <Typography variant="h4" sx={{ color: "black" }}>
           Bitácora
        </Typography>

        {isLoggedIn && 
          <Box display="flex" marginLeft={'auto'} marginRight="auto" justifyContent="center" >
            <Tabs value={value} onChange={(e, value) => setvalue(value)}>
              <Tab LinkComponent={NavLink} to="/blogs" label="All Blogs" />
              <Tab LinkComponent={NavLink} to="/myBlogs" label="My Blogs" />
              <Tab LinkComponent={NavLink} to="/blogs/add" label="Add Blog" />
            </Tabs>
          </Box> }

        <Box display="flex" marginLeft="auto">
        
             { !isLoggedIn && <> 
             
             <Button
                LinkComponent={NavLink}
                to="/auth/login"
                variant='contained'
                sx={{ margin: 1, borderRadius: 10, color: 'pink', backgroundColor: 'black' }}
              >
                Login
              </Button>

              <Button
                LinkComponent={NavLink}
                to="/auth/signup"
                variant='contained'
                sx={{ margin: 1, borderRadius: 10, color: 'pink', backgroundColor: 'black' }}
              >
                Signup
              </Button></>}
           
          {isLoggedIn && (
            
            <Button 
              onClick={() =>dispath(authActions.logout())}
              LinkComponent={NavLink}
              to="/auth"
              variant='contained'
              sx={{ margin: 1, borderRadius: 10, color: 'pink', backgroundColor: 'black' }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
