import React from 'react';
import Background from '../additional/Background';
import MainHeader from '../headers/MainHeader';
import Game from './Game';
import Lobby from './Lobby';

export default function GameDashboard() {
  return (
    <Background>
      <MainHeader />
      <Lobby />
      <Game />
    </Background>
  );
}
