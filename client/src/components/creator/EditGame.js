import { Container, IconButton, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import { LeftPageTitle } from '../additional/PageTitle';
import { CustomCard } from '../additional/CustomCard';

export default function EditGame() {
  const { id } = useParams();
  const [gameName, setGameName] = useState('');
  const [gameDescription, setGameDescription] = useState('');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const getGame = async () => {
      const gameRef = doc(db, 'games', id);
      const gameDoc = await getDoc(gameRef);
      const game = gameDoc.data();
      setGameName(game.name);
      setGameDescription(game.description);
      if (game.questions) {
        setQuestions(game.questions);
      }
    };
    getGame();
  }, []);

  const handleAddQuestion = () => {
    const newQuestion = {
      id: questions.length,
      question: '',
      answer: ''
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleDeleteQuestion = (id) => {
    let filteredQuestions = questions.filter((question) => question.id !== id);
    let editedQuestions = filteredQuestions.map((question, index) => {
      return { ...question, id: index };
    });
    setQuestions([...editedQuestions]);
  };

  const handleQuestionNameChange = (id, value) => {
    let copy = [...questions];
    let question = {
      ...copy[id],
      question: value
    };
    copy[id] = question;
    setQuestions(copy);
  };

  const handleQuestionAnswerChange = (id, value) => {
    let copy = [...questions];
    let question = {
      ...copy[id],
      answer: value
    };
    copy[id] = question;
    setQuestions(copy);
  };

  const handleSumbit = async () => {
    const gameDoc = doc(db, 'games', id);
    const newFields = {
      name: gameName,
      description: gameDescription,
      questions: questions
    };
    await updateDoc(gameDoc, newFields);
  };

  return (
    <>
      <LeftPageTitle>Orientacinių redagavimas</LeftPageTitle>
      <Container maxWidth="lg" sx={{ pb: 5 }}>
        <CustomCard>
          <TextField
            onChange={(event) => {
              setGameName(event.target.value);
            }}
            value={gameName}
            focused
            color="info"
            name="name"
            label="Pavadinimas"
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{
              style: { color: 'white' }
            }}
            InputProps={{
              style: { color: 'white' }
            }}
          />
          <TextField
            onChange={(event) => {
              setGameDescription(event.target.value);
            }}
            value={gameDescription}
            focused
            color="info"
            name="description"
            label="Aprašymas"
            fullWidth
            multiline
            rows={4}
            sx={{ mb: 1 }}
            InputLabelProps={{
              style: { color: 'white' }
            }}
            InputProps={{
              style: { color: 'white' }
            }}
          />
          {questions.map((question) => (
            <QuestionForm
              key={question.id}
              id={question.id}
              handleDelete={handleDeleteQuestion}
              handleQuestionNameChange={handleQuestionNameChange}
              handleQuestionAnswerChange={handleQuestionAnswerChange}
              initialQuestionName={question.question}
              initialQuestionAnswer={question.answer}
            />
          ))}
        </CustomCard>
        <IconButton
          onClick={handleSumbit}
          sx={{
            position: 'fixed',
            right: 40,
            bottom: 135,
            backgroundColor: 'mediumSpringGreen',
            '&:hover': {
              filter: 'brightness(85%)',
              backgroundColor: 'mediumSpringGreen'
            },
            height: '75px',
            width: '75px'
          }}>
          <SaveRoundedIcon sx={{ color: '#ffffff', height: '50px', width: '50px' }} />
        </IconButton>
        <IconButton
          onClick={handleAddQuestion}
          sx={{
            position: 'fixed',
            right: 40,
            bottom: 40,
            backgroundColor: '#FFB30F',
            '&:hover': {
              filter: 'brightness(85%)',
              backgroundColor: '#FFB30F'
            },
            height: '75px',
            width: '75px'
          }}>
          <AddRoundedIcon sx={{ color: '#ffffff', height: '50px', width: '50px' }} />
        </IconButton>
      </Container>
    </>
  );
}

const QuestionForm = (props) => {
  const {
    id,
    handleDelete,
    handleQuestionNameChange,
    handleQuestionAnswerChange,
    initialQuestionName,
    initialQuestionAnswer
  } = props;

  return (
    <CustomCard background={'#55B0D5'}>
      <Box display="flex" flexDirection={'column'}>
        <Box display={'flex'} flexDirection={'row'}>
          <Box display={'flex'} flexGrow={1} alignItems={'center'} justifyContent={'left'}>
            <Typography component={'div'} variant={'h6'} color="#ffffff">
              {id + 1}. Klausimas
            </Typography>
          </Box>
          <Box display={'flex'} flexGrow={1} alignItems={'center'} justifyContent={'right'}>
            <IconButton onClick={() => handleDelete(id)} sx={{ color: 'red' }}>
              <DeleteRoundedIcon sx={{ fontSize: 30 }} />
            </IconButton>
          </Box>
        </Box>
        <TextField
          onChange={(event) => handleQuestionNameChange(id, event.target.value)}
          value={initialQuestionName}
          focused
          color="info"
          name="question"
          label="Klausimas"
          multiline
          rows={2}
          sx={{ mb: 2, mt: 2 }}
          InputLabelProps={{
            style: { color: 'white' }
          }}
          InputProps={{
            style: { color: 'white' }
          }}
        />
        <TextField
          onChange={(event) => handleQuestionAnswerChange(id, event.target.value)}
          value={initialQuestionAnswer}
          focused
          color="info"
          name="answer"
          label="Atsakymas"
          sx={{ mb: 2 }}
          InputLabelProps={{
            style: { color: 'white' }
          }}
          InputProps={{
            style: { color: 'white' }
          }}
        />
        <TextField
          focused
          color="info"
          name="value"
          label="Klausimo vertė"
          type="number"
          sx={{ mb: 2 }}
          InputLabelProps={{
            style: { color: 'white' }
          }}
          InputProps={{
            style: { color: 'white' }
          }}
        />
      </Box>
    </CustomCard>
  );
};
