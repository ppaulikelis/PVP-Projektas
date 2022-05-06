import { Button, Container, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { CustomCard } from '../additional/CustomCard';
import { LeftPageTitle } from '../additional/PageTitle';

export default function Lobby() {
  return (
    <>
      <LeftPageTitle>Pavadinimas</LeftPageTitle>
      <Container maxWidth="md">
        <CustomCard>
          <Typography variant="p" component="div" color="white">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industrys standard dummy text ever since the 1500s, when an unknown printer
            took a galley of type and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting, remaining
            essentially unchanged. It was popularised in the 1960s with the release of Letraset
            sheets containing Lorem Ipsum passages, and more recently with desktop publishing
            software like Aldus PageMaker including versions of Lorem Ipsum.
          </Typography>
          <br />
          <Typography variant="p" component="div" color="white">
            Žaidimo laikas: 2022-05-06, 15:30 - 17:00
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
