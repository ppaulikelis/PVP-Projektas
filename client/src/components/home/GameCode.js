import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { CustomCard } from '../additional/CustomCard';
import { useNavigate } from 'react-router-dom';

export default function GameCode() {
  const navigate = useNavigate();
  const [gameCode, setGameCode] = useState('');

  const handleSubmit = () => {
    if (gameCode != '') {
      navigate('/game/' + gameCode);
    }
  };

  return (
    <Container maxWidth="sm">
      <CustomCard>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <img alt={'logo'} src={'/logo_be_fono.png'} width={'300px'} />
          <TextField
            onChange={(event) => {
              setGameCode(event.target.value);
            }}
            margin="normal"
            fullWidth
            id="gameCode"
            label="Žaidimo kodas"
            name="gameCode"
            autoFocus
          />
          <Button
            onClick={handleSubmit}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, p: 2, color: 'white' }}
            color="secondary">
            Dalyvauti
          </Button>
        </Box>
      </CustomCard>
    </Container>
  );
}
