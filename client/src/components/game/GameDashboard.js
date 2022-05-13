import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Background from '../additional/Background';
import MainHeader from '../headers/MainHeader';
import Game from './Game';
import Lobby from './Lobby';
import { db } from '../../firebase';
import { useParams } from 'react-router-dom';

export default function GameDashboard() {
  const { id } = useParams();
  const [startedGame, setStartedGame] = useState({});
  const [game, setGame] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const startedGameRef = doc(db, 'startedGames', id);
    getDoc(startedGameRef).then((res) => {
      const startedGame = res.data();
      setStartedGame(startedGame);
      const gameRef = doc(db, 'games', startedGame.game);
      getDoc(gameRef).then((res) => {
        const game = res.data();
        setGame(game);
        setLoading(false);
      });
    });
  }, []);

  return (
    <Background>
      <MainHeader />
      {!loading && (
        <>
          <Lobby startedGame={startedGame} game={game} />
          <Game startedGame={startedGame} game={game} />
        </>
      )}
    </Background>
  );
}
