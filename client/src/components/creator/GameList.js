import { Box, Card, CardContent, IconButton, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

export default function GameList() {
  return (
    <>
      <Card sx={{ mt: 2, borderRadius: '48px' }}>
        <CardContent
          sx={{
            background: 'linear-gradient(180deg, #AFC139 0%, #5D7E17 100%);'
          }}>
          <Box px={2}>
            <Typography
              variant="h4"
              component="div"
              align="center"
              sx={{
                color: 'white',
                textShadowColor: 'rgba(0, 0, 0, 0.25)',
                textShadowOffset: { width: 0, height: 4 },
                textShadowRadius: 4
              }}>
              Varžybos
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ mt: 5, borderRadius: '48px' }}>
        <CardContent
          sx={{
            background: 'linear-gradient(180deg, #AFC139 0%, #5D7E17 100%);'
          }}>
          <Box px={2}>
            <Tabs variant="fullWidth" value={0}>
              <Tab label="Visos" />
              <Tab label="Šiuo metu vykstančios" />
            </Tabs>
          </Box>
        </CardContent>
      </Card>
      <IconButton
        sx={{
          position: 'fixed',
          right: 40,
          bottom: 40,
          backgroundColor: '#FFB30F',
          '&:hover': {
            filter: 'brightness(85%)',
            backgroundColor: '#FFB30F'
          },
          height: '75px',
          width: '75px'
        }}>
        <AddRoundedIcon sx={{ color: '#ffffff', height: '50px', width: '50px' }} />
      </IconButton>
    </>
  );
}
