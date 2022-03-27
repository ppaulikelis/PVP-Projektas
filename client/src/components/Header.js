import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const pages = [
  {
    name: 'Apie mus',
    url: '/about'
  },
  {
    name: 'Atsiliepimai',
    url: '/reviews'
  },
  {
    name: 'D.U.K',
    url: '/faq'
  },
  {
    name: 'Kontaktai',
    url: '/contacts'
  },
];

const Header = () => {
  return (
    <AppBar position='static'>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Box sx={{display: 'flex', justifyContent: 'left', alignItems: 'center'}}>
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                  >
                    <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/">Projekto pavadinimas</Link>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  {pages.map((page) => (
                    <Button key={page.name} variant="text" sx={{ color: 'white'}}>
                      <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={page.url}>{page.name}</Link>
                    </Button>
                  ))}
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box sx={{display: 'flex', justifyContent: 'right', alignItems: 'center'}}>
                  <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to='/signin'>
                  <Button variant="contained" color="secondary" sx={{ color: 'white'}}>
                    Prisijungti
                    <LoginOutlinedIcon sx={{ml: 1}}/>
                  </Button>
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Toolbar>
    </AppBar>
  );
};
export default Header;