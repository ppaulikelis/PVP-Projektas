import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { CustomCard } from '../additional/CustomCard';

export default function GameCode() {
  return (
    <Container maxWidth="sm">
      <CustomCard background="white">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <img alt={'logo'} src={'/logo_be_fono.png'} width={'400px'} />
          <Typography textAlign="center" variant="h4" component="div" sx={{ mb: 2 }}>
            ORIS
          </Typography>
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
            color="secondary">
            Dalyvauti
          </Button>
        </Box>
      </CustomCard>
    </Container>
  );
}
