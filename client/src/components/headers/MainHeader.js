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
import CircularProgress from '@mui/material/CircularProgress';
import CreatorHeader from './CreatorHeader';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';

const pages = [
  {
    name: 'Pagrindinis',
    url: '/home',
    important: false
  },
  {
    name: 'Apie mus',
    url: '/home/about',
    important: false
  },
  {
    name: 'Atsiliepimai',
    url: '/home/reviews',
    important: false
  },
  {
    name: 'Žaisti',
    url: '/home/gamecode',
    important: true
  },
  {
    name: 'Kontaktai',
    url: '/home/contacts',
    important: false
  },
  {
    name: 'D.U.K',
    url: '/home/faq',
    important: false
  },
  {
    name: 'PRENUMERATA',
    url: '/home/subscription',
    important: false
  }
];

function HideOnScroll(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    target: window ? window() : undefined
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function MainHeader(props) {
  //const MainHeader = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      navigate('/home');
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar sx={{ backgroundColor: 'rgba(0,0,0,0)' }}>
          <Box sx={{ backgroundColor: 'white' }}>
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <Box // logo ir pav - big
                  sx={{
                    display: { xs: 'none', lg: 'flex' },
                    flex: 0,
                    justifyContent: 'left',
                    alignItems: 'center'
                  }}>
                  <Box
                    component="img"
                    sx={{
                      height: 42,
                      width: 59
                    }}
                    src="/logo_komposas2.png"
                  />
                  <Typography variant="h5" noWrap component="div">
                    <Link
                      style={{
                        color: '#1176AF',
                        fontWeight: 600,
                        textDecoration: 'inherit'
                      }}
                      to="/home">
                      ORIS
                    </Link>
                  </Typography>
                </Box>
                <Box // menu items - big
                  sx={{
                    flexGrow: 1,
                    display: { xs: 'none', lg: 'flex' },
                    flex: 3,
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                  {pages.map((page) => (
                    <Button
                      variant={page.important ? 'contained' : 'text'}
                      {...(page.important ? { color: 'secondary' } : {})}
                      key={page.name}
                      sx={{
                        color: page.important ? 'white' : '#1176AF',
                        mx: 1,
                        fontWeight: 600
                      }}
                      onClick={() => {
                        navigate(page.url);
                      }}>
                      {page.name}
                    </Button>
                  ))}
                </Box>
                <Box // menu items - small
                  sx={{
                    flexGrow: 1,
                    display: { xs: 'flex', lg: 'none' }
                  }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="primary">
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left'
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left'
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: 'block', lg: 'none' }
                    }}>
                    {pages.map((page) => (
                      <MenuItem
                        key={page.name}
                        onClick={() => {
                          navigate(page.url);
                        }}>
                        <Typography textAlign="center">{page.name}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
                <Box // logo ir pav - small
                  sx={{
                    display: { xs: 'flex', lg: 'none' },
                    flex: 40,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                  <Box
                    component="img"
                    sx={{
                      height: 42,
                      width: 59
                    }}
                    src="/logo_komposas2.png"
                  />
                  <Typography variant="h5" noWrap component="div">
                    <Link
                      style={{
                        color: 'rgba(67, 127, 151, 1)',
                        fontWeight: 600,
                        textDecoration: 'inherit'
                      }}
                      to="/home">
                      ORIS
                    </Link>
                  </Typography>
                </Box>
                <Box // user account item - small
                  sx={{
                    display: { xs: 'flex', lg: 'none' },
                    flex: 1,
                    justifyContent: 'right',
                    alignItems: 'center',
                    flexGrow: 0
                  }}>
                  {user ? (
                    <React.Fragment>
                      <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit">
                        <Avatar sx={{ bgcolor: '#FFB30F' }}>{user.email[0].toUpperCase()}</Avatar>
                      </IconButton>
                      <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right'
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right'
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        sx={{
                          display: { xs: 'block', lg: 'none' }
                        }}>
                        <Typography sx={{ pr: 2, pl: 2 }} color="black" fontWeight={600}>
                          {user.email}
                        </Typography>
                        <MenuItem
                          sx={{ justifyContent: 'center' }}
                          onClick={() => navigate('/creator')}>
                          Skydelis
                        </MenuItem>
                        <MenuItem
                          disabled={loading}
                          sx={{ justifyContent: 'center' }}
                          onClick={() => handleLogout()}>
                          {loading ? <CircularProgress color="secondary" /> : 'Atsijungti'}
                        </MenuItem>
                      </Menu>
                    </React.Fragment>
                  ) : (
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ color: 'white', fontWeight: 600 }}
                      onClick={() => navigate('signin')}
                      endIcon={<LoginOutlinedIcon />}>
                      Prisijungti
                    </Button>
                  )}
                </Box>
                <Box // user account item - big
                  sx={{
                    display: { xs: 'none', lg: 'flex' },
                    flex: 1,
                    justifyContent: 'right',
                    alignItems: 'center',
                    flexGrow: 0
                  }}>
                  {user ? (
                    <React.Fragment>
                      <Typography color="black" fontWeight={600}>
                        {user.email}
                      </Typography>
                      <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit">
                        <Avatar sx={{ bgcolor: '#FFB30F' }}>{user.email[0].toUpperCase()}</Avatar>
                      </IconButton>
                      <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right'
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right'
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        sx={{
                          display: { xs: 'none', lg: 'block' }
                        }}>
                        <MenuItem
                          sx={{ justifyContent: 'center' }}
                          onClick={() => navigate('/creator')}>
                          Skydelis
                        </MenuItem>
                        <MenuItem
                          disabled={loading}
                          sx={{ justifyContent: 'center' }}
                          onClick={() => handleLogout()}>
                          {loading ? <CircularProgress color="secondary" /> : 'Atsijungti'}
                        </MenuItem>
                      </Menu>
                    </React.Fragment>
                  ) : (
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ color: 'white', fontWeight: 600 }}
                      onClick={() => navigate('signin')}
                      endIcon={<LoginOutlinedIcon />}>
                      Prisijungti
                    </Button>
                  )}
                </Box>
              </Toolbar>
            </Container>
          </Box>
          {user ? <CreatorHeader /> : <></>}
        </AppBar>
      </HideOnScroll>
    </>
  );
} //;
//export default MainHeader();
