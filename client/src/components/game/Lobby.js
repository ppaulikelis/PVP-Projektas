import { Button, Container, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { CustomCard } from '../additional/CustomCard';
import { LeftPageTitle } from '../additional/PageTitle';

export default function Lobby(props) {
  const { startedGame, game, canStart, stateDecider } = props;
  const [teamName, setTeamName] = useState('');

  const handleSumbit = () => {
    if (teamName != '') {
      localStorage.setItem('startedGameID', startedGame.id);
      localStorage.setItem('teamName', teamName);
      stateDecider(startedGame);
    } else {
      alert('Įveskite komandos pavadinimą');
    }
  };

  return (
    <>
      <LeftPageTitle>{game.name}</LeftPageTitle>
      <Container maxWidth="md">
        <CustomCard>
          <Typography variant="p" component="div" color="white">
            {game.description}
          </Typography>
          <br />
          <Typography variant="p" component="div" color="white">
            Žaidimo pradžia: {startedGame.startDateTime.replace('T', ' ')}
          </Typography>
          <Typography variant="p" component="div" color="white">
            Žaidimo pabaiga: {startedGame.endDateTime.replace('T', ' ')}
          </Typography>
          {canStart && (
            <>
              <br />
              <TextField
                focused
                color="info"
                name="teamName"
                label="Komandos pavadinimas"
                fullWidth
                sx={{ mb: 2 }}
                InputLabelProps={{
                  style: { color: 'white' }
                }}
                InputProps={{
                  style: { color: 'white' }
                }}
                onChange={(event) => setTeamName(event.target.value)}
              />
              <Box display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ color: 'white' }}
                  onClick={handleSumbit}>
                  Dalyvauti
                </Button>
              </Box>
            </>
          )}
        </CustomCard>
      </Container>
    </>
  );
}
