import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Card, CardContent } from '@mui/material';
import Background from '../additional/Background'
import MainHeader from '../headers/MainHeader';

export default function GameCode() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      gameCode: data.get('gameCode'),
    });
  };

  return (
      <Background>
      <MainHeader/>
      <Container component="main" maxWidth="sm">
        <Card sx={{mt: 5, borderRadius: '20px'}}>
          <CardContent sx={{my: 5, mx: 5}}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography textAlign='center' variant="h4" component="div" sx={{mb: 2}}>
            ORIS
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="gameCode"
              label="Žaidimo kodas"
              name="gameCode"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, color: 'white' }}
              color='secondary'
            >
              Dalyvauti
            </Button>
          </Box>
        </Box>
        </CardContent>
        </Card>
      </Container>
    </Background>
  )
}