import React, { useEffect, useRef, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { CustomCard } from '../additional/CustomCard';
import { LeftPageTitle } from '../additional/PageTitle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QrCodeScannerRoundedIcon from '@mui/icons-material/QrCodeScannerRounded';
import { QrReader } from 'react-qr-reader';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuthContext } from '../../contexts/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';

export default function Game(props) {
  const { user } = useAuthContext();
  const { startedGame, game } = props;
  const [submission, setSubmission] = useState({});
  const [unlocks, setUnlocks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const emptyAnswersArray = new Array(game.questions.length).fill(0).map(() => ({
      questionID: -1,
      answer: '',
      points: 0
    }));
    const defaultSubmission = {
      user: user.uid,
      team: localStorage.getItem('teamName'),
      answers: emptyAnswersArray
    };
    setSubmission(defaultSubmission);
  }, []);

  const handleSubmit = async () => {
    console.log(submission);
    setLoading(true);
    try {
      const startedGameDoc = doc(db, 'startedGames', startedGame.id);
      await updateDoc(startedGameDoc, { submissions: arrayUnion(submission) });
      alert('Atsakymai priimti');
      location.reload();
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  const handleSubmissionChange = (id, value) => {
    let copy = [...submission.answers];
    let points = 0;
    if (game.questions[id].answer == value) {
      points = game.questions[id].worth;
    }
    const newAnswer = {
      questionID: id,
      answer: value,
      points: points
    };
    copy[id] = newAnswer;
    setSubmission({ ...submission, answers: copy });
  };

  const handleUnlocksChange = (id) => {
    setUnlocks([...unlocks, id]);
  };

  return (
    <>
      <LeftPageTitle>{game.name}</LeftPageTitle>
      <Container maxWidth="md">
        <CustomCard>
          <Timmer date={startedGame.endDateTime} />
          <br />
          {game.questions.map((question) => (
            <Accordion key={question.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                  backgroundColor: '#55B0D5'
                }}>
                <Typography sx={{ color: 'white' }}>Klausimas {question.id + 1}</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  backgroundColor: '#2997D6'
                }}>
                {question.showHint && !unlocks.includes(question.id) ? (
                  <LockedQuestion question={question} handleUnlocksChange={handleUnlocksChange} />
                ) : (
                  <>
                    <Typography component={'div'} variant="p" sx={{ color: 'white' }}>
                      {question.question}
                    </Typography>
                    <br />
                    <TextField
                      focused
                      color="info"
                      name="asnwer"
                      label="Atsakymas"
                      fullWidth
                      InputLabelProps={{
                        style: { color: 'white' }
                      }}
                      InputProps={{
                        style: { color: 'white' }
                      }}
                      onChange={(event) => handleSubmissionChange(question.id, event.target.value)}
                    />
                  </>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
          <br />
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="secondary"
              sx={{ color: 'white' }}
              onClick={handleSubmit}
              disabled={loading}>
              {loading ? <CircularProgress color="secondary" /> : 'Baigti'}
            </Button>
          </Box>
        </CustomCard>
      </Container>
    </>
  );
}

const LockedQuestion = (props) => {
  const { question, handleUnlocksChange } = props;
  const [key, setKey] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const checkKey = () => {
    if (key == question.key) {
      handleUnlocksChange(question.id);
    } else {
      alert('Neteisingas raktas');
    }
  };

  const ckeckQRKey = (result) => {
    if (result == question.key) {
      handleUnlocksChange(question.id);
    } else {
      alert('Neteisingas raktas');
    }
  };

  const handleQRScan = (result, error) => {
    if (result) {
      console.log(result.text);
      ckeckQRKey(result);
    }
    if (error) {
      console.log('Error while scanning');
    }
  };

  return (
    <>
      <Typography component={'div'} variant="p" sx={{ color: 'white' }}>
        {question.hint}
      </Typography>
      <br />
      <TextField
        focused
        color="info"
        name="hint"
        label="Klausimo raktas"
        fullWidth
        InputLabelProps={{
          style: { color: 'white' }
        }}
        InputProps={{
          style: { color: 'white' }
        }}
        inputProps={{ maxLength: 4 }}
        value={key}
        onChange={(event) => setKey(event.target.value)}
      />
      <br />
      <br />
      <Box display={'flex'} justifyContent={'flex-end'}>
        <Button variant="contained" color={'secondary'} sx={{ color: 'white' }} onClick={checkKey}>
          Tikrinti
        </Button>
      </Box>
      <Typography component={'div'} variant="p" sx={{ color: 'white' }} align="center">
        arba
      </Typography>
      <br />
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        endIcon={<QrCodeScannerRoundedIcon />}
        sx={{ color: 'white' }}
        onClick={() => setDialogOpen(true)}>
        Skenuoti QR
      </Button>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <Box p={1}>
          <DialogTitle>
            <Typography variant="h5" component="div" align="center">
              Nuskenuokite klausimo QR kodą
            </Typography>
          </DialogTitle>
          <DialogContent>
            <QrReader style={{ width: '100%' }} onResult={handleQRScan} />
          </DialogContent>
        </Box>
      </Dialog>
    </>
  );
};

const Timmer = (props) => {
  const { date } = props;
  let interval = useRef();
  const [timer, setTimer] = useState('00:00:00');

  const startTimer = () => {
    const countdownDate = new Date(date).getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = countdownDate - now;
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      if (difference < 0) {
        clearInterval(interval.current);
        location.reload();
      } else {
        setTimer(
          (hours < 10 ? '0' : '') +
            hours +
            ':' +
            (minutes < 10 ? '0' : '') +
            minutes +
            ':' +
            (seconds < 10 ? '0' : '') +
            seconds
        );
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  });

  return (
    <Typography component={'div'} variant="p" sx={{ color: 'white' }} align="right">
      Likęs laikas - {timer}
    </Typography>
  );
};
