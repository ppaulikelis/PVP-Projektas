import { Card, CardContent, Container, IconButton, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';

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
      <Container maxWidth="md">
        <Card sx={{ mt: 2, borderRadius: '48px' }}>
          <CardContent
            sx={{
              background: 'linear-gradient(180deg, #AFC139 0%, #5D7E17 100%);'
            }}>
            <Box px={2}>
              <Typography
                variant="h4"
                component="div"
                align="center"
                sx={{
                  color: 'white',
                  textShadowColor: 'rgba(0, 0, 0, 0.25)',
                  textShadowOffset: { width: 0, height: 4 },
                  textShadowRadius: 4
                }}>
                Orientacininių redagavimas
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
      <Card sx={{ mt: 5, borderRadius: '48px' }}>
        <CardContent
          sx={{
            background: 'linear-gradient(180deg, #55B0D5 0%, #1176AF 71.35%)'
          }}>
          <Box py={2} px={2}>
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
          </Box>
        </CardContent>
      </Card>
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
    <Card sx={{ mt: 2, borderRadius: '48px' }}>
      <CardContent
        sx={{
          background: '#55B0D5'
        }}>
        <Box px={2} pt={2} display="flex" flexDirection={'column'}>
          <Typography component={'div'} variant={'h6'} color="#ffffff">
            {id + 1}. Klausimas
          </Typography>
          <TextField
            onChange={(event) => handleQuestionNameChange(id, event.target.value)}
            value={initialQuestionName}
            focused
            color="info"
            name="question"
            label="Klausimas"
            fullWidth
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
            fullWidth
            sx={{ mb: 1 }}
            InputLabelProps={{
              style: { color: 'white' }
            }}
            InputProps={{
              style: { color: 'white' }
            }}
          />
          <Box display={'flex'} justifyContent={'right'}>
            <IconButton onClick={() => handleDelete(id)} sx={{ color: 'red' }}>
              <DeleteRoundedIcon sx={{ fontSize: 32 }} />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
