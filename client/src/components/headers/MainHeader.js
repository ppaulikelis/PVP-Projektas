import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { Link, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { useAuthContext } from '../../contexts/AuthContext';
import { Avatar } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const pages = [
  {
    name: 'Apie mus',
    url: '/about',
    important: false,
  },
  {
    name: 'Atsiliepimai',
    url: '/reviews',
    important: false,
  },
  {
    name: 'Žaisti',
    url: '/gamecode',
    important: true,
  },
  {
    name: 'D.U.K',
    url: '/faq',
    important: false,
  },
  {
    name: 'Kontaktai',
    url: '/contacts',
    important: false,
  },
];

const MainHeader = () => {
  const { user, logout } = useAuthContext()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position='static'>
        <Toolbar>
          <Box sx={{display: 'flex', flex: 1, justifyContent: 'left', alignItems: 'center'}}>
            <Box
              component="img"
              sx={{
                height: 42,
                width: 59,
              }}
              src="/logo_white.png"
            />
            <Typography
              variant="h5"
              noWrap
              component="div"
            >
              <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/">ORIS</Link>
            </Typography>
          </Box>
          <Box sx={{display: 'flex', flex: 2, justifyContent: 'center', alignItems: 'center'}}>
              {pages.map((page) => (
                <Button
                variant={page.important ? 'contained': 'text'}
                {...page.important ? {color: 'secondary'} : {}}
                key={page.name}
                sx={{ color: 'white', mx: 1}}
                onClick={() => {navigate(page.url)}}
                >
                  {page.name}
                </Button>
              ))}
          </Box>
          <Box sx={{display: 'flex', flex: 1, justifyContent: 'right', alignItems: 'center'}}>
            {user ?
            <React.Fragment>
            <Typography>
              {user.email}
            </Typography>
            <IconButton 
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit">
              <Avatar sx={{ bgcolor: '#FFB30F'}}>
                {user.email[0].toUpperCase()}
              </Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem sx={{justifyContent: 'center'}} onClick={() => navigate("/creator")}>Skydelis</MenuItem>
              <MenuItem onClick={() => logout()}>Atsijungti</MenuItem>
            </Menu>
            </React.Fragment>
            :
            <Button variant="contained" color="secondary" sx={{ color: 'white'}} onClick={() => navigate("/signin")} endIcon={<LoginOutlinedIcon/>}>
              Prisijungti
            </Button>
            }
          </Box>
        </Toolbar>
    </AppBar>
  );
};
export default MainHeader;