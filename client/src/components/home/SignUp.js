import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { CustomCard } from '../additional/CustomCard';
import { useSnackbar } from 'notistack';

export default function SignUp() {
  const { signUp } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    const confirmPassword = data.get('confirmPassword');
    if (email == '' || password == '' || confirmPassword == '') {
      enqueueSnackbar('Užpildykite registracijos laukelius', { variant: 'error' });
      return;
    }
    if (password !== confirmPassword) {
      enqueueSnackbar('Slaptažodžiai nesutampa', { variant: 'error' });
      return;
    }
    setLoading(true);
    try {
      await signUp(email, password);
      enqueueSnackbar('Sėkmingai prisiregistravote', { variant: 'success' });
      navigate('/creator');
    } catch (err) {
      enqueueSnackbar('Įvyko klaida!', { variant: 'error' });
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <CustomCard background="white">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registracija
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Elektroninis paštas"
              name="email"
              autoComplete="email"
              focused
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Slaptažodis"
              type="password"
              id="password"
              focused
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Pakartoti slaptažodį"
              type="password"
              id="confirmPassword"
              focused
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2, color: 'white' }}
              disabled={loading}>
              {loading ? <CircularProgress color="secondary" /> : 'Registruotis'}
            </Button>
          </Box>
          <Link href="/home/signin" variant="body2">
            {'Jau turite paskyrą? Prisijunkite'}
          </Link>
        </Box>
      </CustomCard>
    </Container>
  );
}
