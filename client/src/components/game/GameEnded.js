import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { CustomCard } from '../additional/CustomCard';
import { LeftPageTitle } from '../additional/PageTitle';

export default function GameEnded(props) {
  const { startedGame, game, gameFinished } = props;

  const generateParticipantsList = () => {
    let participants = startedGame.submissions.map((submission) => {
      const totalPoints = submission.answers.reduce((sum, { points }) => sum + points, 0);
      const teamName = submission.team;
      return { totalPoints, teamName };
    });
    participants.sort((a, b) => {
      return b.totalPoints - a.totalPoints;
    });
    return participants;
  };

  return (
    <>
      <LeftPageTitle>{game.name}</LeftPageTitle>
      <Container maxWidth="md">
        <CustomCard>
          {!gameFinished ? (
            <Typography variant="p" component="div">
              Orientacinės varžybos dar nesibaigė, laukite rezultatų!
            </Typography>
          ) : (
            <>
              <Typography variant="h4" component="div" align="center">
                Rezultatai
              </Typography>
              {startedGame.submissions.length > 0 && <br />}
              {generateParticipantsList().map((participant) => (
                <CustomCard key={participant.teamName}>
                  <Box display="flex">
                    <Box display="flex" flexGrow={2}>
                      <Typography variant="h5" component="div" color="white">
                        {participant.teamName}
                      </Typography>
                    </Box>
                    <Box display="flex" flexGrow={2} justifyContent="right">
                      <Typography variant="h5" component="div" color="white" align="right">
                        {participant.totalPoints}
                      </Typography>
                    </Box>
                  </Box>
                </CustomCard>
              ))}
            </>
          )}
        </CustomCard>
      </Container>
    </>
  );
}
