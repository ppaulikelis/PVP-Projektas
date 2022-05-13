import { Button, Container, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { CustomCard } from '../additional/CustomCard';
import { LeftPageTitle } from '../additional/PageTitle';

export default function Lobby(props) {
  const { startedGame, game } = props;

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
            Žaidimo laikas: {startedGame.startDateTime} / {startedGame.endDateTime}
          </Typography>
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
          />
          <Box display="flex" justifyContent="flex-end">
            <Button variant="contained" color="secondary" sx={{ color: 'white' }}>
              Dalyvauti
            </Button>
          </Box>
        </CustomCard>
      </Container>
    </>
  );
}
