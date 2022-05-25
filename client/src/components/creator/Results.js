import { Container } from '@mui/material';
import React from 'react';
import { CustomCard } from '../additional/CustomCard';
import { LeftPageTitle } from '../additional/PageTitle';

export default function Results() {
  return (
    <>
      <LeftPageTitle>Orientacinės varžybų rezultatai</LeftPageTitle>
      <Container maxWidth="lg" sx={{ pb: 5 }}>
        <CustomCard background="white"></CustomCard>
      </Container>
    </>
  );
}
