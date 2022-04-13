import { Container } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Background from '../additional/Background';
import MainHeader from '../headers/MainHeader';
import Home from './Home';
import AboutUs from './AboutUs';
import Reviews from './Reviews';
import GameCode from './GameCode';
import Contacts from './Contacts';
import Faq from './Faq';
import Subscription from './Subscription';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default function HomeDashboard() {
  return (
    <Background>
      <MainHeader />
      <Container maxWidth="md" sx={{ pb: 5 }}>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/gamecode" element={<GameCode />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Container>
    </Background>
  );
}
