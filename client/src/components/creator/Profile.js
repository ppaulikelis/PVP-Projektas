import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { CustomCard } from '../additional/CustomCard';
import { ProfileField } from './ProfileField';
import { Typography } from '@mui/material';
import { LeftPageTitle2 } from '../additional/PageTitle';

export default function Profile() {
  return (
    <>
      {/* Page Header, copy as example */}
      <LeftPageTitle2>Profilis</LeftPageTitle2>
      {/* Page Header, copy as example */}
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
              Erikas Goriačevskis
            </Typography>
            <Typography variant="h6" component="div" color="gray">
              Kaunas
            </Typography>
          </Box>
        </CustomCard>
        <CustomCard background="white">
          <ProfileField fieldName="Vardas" fieldValue="Erikas" />
          <hr />
          <ProfileField fieldName="Pavardė" fieldValue="Goriačevskis" />
          <hr />
          <ProfileField fieldName="El. paštas" fieldValue="erikas.goriacevskis@gmail.com" />
          <hr />
          <ProfileField fieldName="Mokykla" fieldValue="Kauno KTU gimnazija" />
          <hr />
          <ProfileField fieldName="Miestas" fieldValue="Kaunas" />
        </CustomCard>
      </Container>
    </>
  );
}
