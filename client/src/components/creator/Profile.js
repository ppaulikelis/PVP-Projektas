import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { CustomCard } from '../additional/CustomCard';
import { ProfileField } from './ProfileField';
import { Typography } from '@mui/material';
import { LeftPageTitle } from '../additional/PageTitle';

export default function Profile() {
  return (
    <>
      <LeftPageTitle>Profilis</LeftPageTitle>
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          flexDirection: { md: 'row', sm: 'column' },
          justifyContent: 'center',
          gap: 5
        }}>
        <CustomCard background="white" width={'600px'}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: 400
            }}>
            <img alt={'logo'} src={'/logo512.png'} width={'200px'} />
            <Typography variant="h5" component="div" color="black" sx={{ mb: 2 }}>
              User
            </Typography>
            <Typography variant="h6" component="div" color="gray">
              Kaunas
            </Typography>
          </Box>
        </CustomCard>
        <CustomCard background="white">
          <ProfileField fieldName="Vardas" fieldValue="User" />
          <hr />
          <ProfileField fieldName="Pavardė" fieldValue="User" />
          <hr />
          <ProfileField fieldName="El. paštas" fieldValue="user@gmail.com" />
          <hr />
          <ProfileField fieldName="Mokykla" fieldValue="Kauno KTU gimnazija" />
          <hr />
          <ProfileField fieldName="Miestas" fieldValue="Kaunas" />
        </CustomCard>
      </Container>
    </>
  );
}
