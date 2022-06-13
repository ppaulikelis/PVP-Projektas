import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LeftPageTitle } from '../additional/PageTitle';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { CustomCard } from '../additional/CustomCard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ResultsAll() {
  const { id } = useParams();
  const [startedGame, setStartedGame] = useState();

  useEffect(() => {
    const startedGameRef = doc(db, 'startedGames', id);
    getDoc(startedGameRef).then((res1) => {
      const startedGameFromResponse = res1.data();
      const gameRef = doc(db, 'games', startedGameFromResponse.game);
      getDoc(gameRef).then((res2) => {
        const gameFromResponse = res2.data();
        if (gameFromResponse == null) {
          const final = { ...startedGameFromResponse, gameName: 'Orientacinės varžybos nerastos' };
          setStartedGame(final);
        } else {
          const final = { ...startedGameFromResponse, gameName: gameFromResponse.name };
          setStartedGame(final);
        }
      });
    });
  }, []);

  const generateParticipantsList = () => {
    let participants = startedGame.submissions.map((submission) => {
      const totalPoints = submission.answers.reduce((sum, { points }) => sum + points, 0);
      return { totalPoints, submission };
    });
    participants.sort((a, b) => {
      return b.totalPoints - a.totalPoints;
    });
    return participants;
  };

  return (
    <>
      <LeftPageTitle>Orientacinių varžybų rezultatai</LeftPageTitle>
      <Container maxWidth="lg" sx={{ pb: 5 }}>
        <CustomCard background="white">
          <Typography variant="h5" component="div" align="left" color="#1176AF" fontWeight={'bold'}>
            {startedGame && startedGame.name}
          </Typography>
          <Typography variant="p" component="div" align="left" color="#1176AF">
            Orientacinių varžybų pavadinimas: {startedGame && startedGame.gameName}
          </Typography>
          <Typography variant="p" component="div" align="left" color="#1176AF">
            Žaidimo pradžia: {startedGame && startedGame.startDateTime.replace('T', ' ')}
          </Typography>
          <Typography variant="p" component="div" align="left" color="#1176AF">
            Žaidimo pabaiga: {startedGame && startedGame.endDateTime.replace('T', ' ')}
          </Typography>
          <Typography variant="p" component="div" align="left" color="#1176AF">
            Dalyvių skaičius: {startedGame && startedGame.submissions.length}
          </Typography>
          {startedGame && startedGame.submissions.length > 0 && (
            <>
              <br />
              <Typography variant="p" component="div" align="left" color="#1176AF">
                Dalyvių pateiktys:
              </Typography>
            </>
          )}
          {startedGame &&
            generateParticipantsList().map((participant, index) => (
              <Accordion key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: '353535' }} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{
                    backgroundColor: '#F3F3F3'
                  }}>
                  <Typography sx={{ color: '#1176AF' }}>{participant.submission.team}</Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#55B0D5' : '#F4B52C'
                  }}>
                  <Typography sx={{ color: 'white' }} align={'right'}>
                    Viso surinkta taškų: {participant.totalPoints}
                  </Typography>
                  {participant.submission.answers.map((answer, index) => (
                    <CustomCard key={index} background={'#D1D1D1'}>
                      <Typography sx={{ color: '#1176AF' }}>
                        Klausimas: {answer.question}
                      </Typography>
                      <Typography sx={{ color: '#1176AF' }}>Atsakymas: {answer.answer}</Typography>
                      <Typography sx={{ color: '#1176AF' }} align={'right'}>
                        Gauti taškai: {answer.points}
                      </Typography>
                    </CustomCard>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
        </CustomCard>
      </Container>
    </>
  );
}
