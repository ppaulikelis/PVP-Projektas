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
import { useAuthContext } from '../../contexts/AuthContext';
import Background2 from '../additional/Background2';

export default function HomeDashboard() {
  const { user } = useAuthContext();

  return (
    <Background>
      <MainHeader />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/gamecode" element={<GameCode />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/subscription" element={<Subscription />} />
        {!user && (
          <>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        )}
      </Routes>
    </Background>
  );
}
