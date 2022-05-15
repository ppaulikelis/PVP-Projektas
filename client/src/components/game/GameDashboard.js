import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Background from '../additional/Background';
import MainHeader from '../headers/MainHeader';
import Game from './Game';
import Lobby from './Lobby';
import GameNotFound from './GameNotFound';
import GameEnded from './GameEnded';
import { db } from '../../firebase';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

const gameStates = [
  'GAME_NOT_FOUND',
  'GAME_LOBBY',
  'GAME_LOBBY_CAN_START',
  'GAME',
  'GAME_ENDED',
  'GAME_SUBMITTED'
];

export default function GameDashboard() {
  const { id } = useParams();
  const [startedGame, setStartedGame] = useState({});
  const [game, setGame] = useState({});
  const [loading, setLoading] = useState(true);
  const [gameState, setGameState] = useState('DEFAULT');
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) {
      return;
    }
    const startedGameRef = doc(db, 'startedGames', id);
    getDoc(startedGameRef).then((res) => {
      const startedGame = { ...res.data(), id: res.id };
      stateDecider(startedGame);
      if (res.data() == null) {
        return;
      }
      setStartedGame(startedGame);
      const gameRef = doc(db, 'games', startedGame.game);
      getDoc(gameRef).then((res) => {
        const game = res.data();
        setGame(game);
        setLoading(false);
      });
    });
  }, []);

  const stateDecider = (startedGame) => {
    if (startedGame == null) {
      setGameState(gameStates[0]);
      console.log('Game not found');
      console.log(gameStates[0]);
      return;
    }
    const startDateTime = new Date(startedGame.startDateTime);
    const endDateTime = new Date(startedGame.endDateTime);
    const currentDateTime = new Date();
    if (startedGame.submissions.some((submission) => submission.user === user.uid)) {
      if (
        currentDateTime.getTime() > startDateTime.getTime() &&
        currentDateTime.getTime() < endDateTime.getTime()
      ) {
        setGameState(gameStates[5]);
        console.log('Game submitted but game is not finished');
        console.log(gameStates[5]);
        return;
      } else {
        setGameState(gameStates[4]);
        console.log('Game submitted and the game is finished');
        console.log(gameStates[4]);
        return;
      }
    }
    if (currentDateTime.getTime() < startDateTime.getTime()) {
      setGameState(gameStates[1]);
      console.log('Game can not be started yet');
      console.log(gameStates[1]);
      return;
    }
    if (
      currentDateTime.getTime() > startDateTime.getTime() &&
      currentDateTime.getTime() < endDateTime.getTime() &&
      localStorage.getItem('startedGameID') == startedGame.id
    ) {
      setGameState(gameStates[3]);
      console.log('Game is currently running');
      console.log(gameStates[3]);
      return;
    }
    if (
      currentDateTime.getTime() > startDateTime.getTime() &&
      currentDateTime.getTime() < endDateTime.getTime()
    ) {
      setGameState(gameStates[2]);
      console.log('Game is currently running but not entered');
      console.log(gameStates[2]);
      return;
    }
    if (currentDateTime.getTime() > endDateTime.getTime()) {
      setGameState(gameStates[4]);
      console.log('Game is finished');
      console.log(gameStates[4]);
      return;
    }
  };

  const gameStateRenderSwitch = (state) => {
    switch (state) {
      case gameStates[0]:
        return <GameNotFound />;
      case gameStates[1]:
        return (
          <Lobby
            startedGame={startedGame}
            game={game}
            canStart={false}
            stateDecider={stateDecider}
          />
        );
      case gameStates[2]:
        return (
          <Lobby
            startedGame={startedGame}
            game={game}
            canStart={true}
            stateDecider={stateDecider}
          />
        );
      case gameStates[3]:
        return <Game startedGame={startedGame} game={game} />;
      case gameStates[4]:
        return <GameEnded startedGame={startedGame} game={game} gameFinished={true} />;
      case gameStates[5]:
        return <GameEnded startedGame={startedGame} game={game} gameFinished={false} />;
      default:
        return 'DEFAULT';
    }
  };

  return (
    <Background>
      <MainHeader />
      {!loading && user && gameStateRenderSwitch(gameState)}
    </Background>
  );
}
