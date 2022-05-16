import {
  Container,
  FormControlLabel,
  IconButton,
  Switch,
  TextField,
  Typography
} from '@mui/material';
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
import LocalPrintshopRoundedIcon from '@mui/icons-material/LocalPrintshopRounded';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import CircularProgress from '@mui/material/CircularProgress';

export default function EditGame() {
  const { id } = useParams();
  const [gameName, setGameName] = useState('');
  const [gameDescription, setGameDescription] = useState('');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleSumbit = async () => {
    setLoading(true);
    try {
      const gameDoc = doc(db, 'games', id);
      const newFields = {
        name: gameName,
        description: gameDescription,
        questions: questions
      };
      await updateDoc(gameDoc, newFields);
      alert('Orientacinės varžybos sėkmingai atnaujintos');
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      id: questions.length,
      question: '',
      answer: '',
      worth: 0,
      showHint: false,
      hint: '',
      key: ''
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

  const handleQuestionWorthChange = (id, value) => {
    let copy = [...questions];
    let question = {
      ...copy[id],
      worth: parseInt(value)
    };
    copy[id] = question;
    setQuestions(copy);
  };

  const handleQuestionShowHintChange = (id, value) => {
    let copy = [...questions];
    let question = {
      ...copy[id],
      showHint: value
    };
    if (value) {
      const key = generateKey();
      question = {
        ...question,
        key: key
      };
    }
    copy[id] = question;
    setQuestions(copy);
  };

  const generateKey = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const handleQuestionHintChange = (id, value) => {
    let copy = [...questions];
    let question = {
      ...copy[id],
      hint: value
    };
    copy[id] = question;
    setQuestions(copy);
  };

  async function createPDF() {
    try {
      var doc = new jsPDF();
      var width = doc.internal.pageSize.getWidth();
      let count = 0;
      for (const question of questions) {
        if (question.showHint) {
          if (count != 0) {
            doc.addPage();
          }
          const result = await QRCode.toDataURL(question.key);
          doc.addImage(result, 'png', 20, 100, 175, 175);
          doc.addImage('/logo_be_fono.png', 5, 5, 50, 50);
          doc.setFontSize(25);
          if (question.hint.length > 0) {
            question.hint.match(/.{1,40}/g).forEach((row, index) => {
              if (row[0] == ' ') {
                let str = row;
                str = str.substring(1);
                doc.text(20, 65 + index * 10, str);
              } else {
                doc.text(20, 65 + index * 10, row);
              }
            });
          }
          doc.setFontSize(75);
          doc.text(width / 2, 280, question.key, { align: 'center' });
          count++;
        }
      }
      if (count > 0) {
        doc.save(gameName + '.pdf');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <LeftPageTitle>Orientacinių varžybų redagavimas</LeftPageTitle>
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

          <Box display="flex" flexDirection={'column'} alignItems="center">
            <Typography component={'div'} variant="h7" color="#ffffff">
              Sukurkite klausimus orientacinėms varžyboms spausdami + mygtuką ekrano dešinėje
            </Typography>
          </Box>

          {questions.map((question) => (
            <QuestionForm
              key={question.id}
              id={question.id}
              handleDelete={handleDeleteQuestion}
              handleQuestionNameChange={handleQuestionNameChange}
              handleQuestionAnswerChange={handleQuestionAnswerChange}
              handleQuestionWorthChange={handleQuestionWorthChange}
              handleQuestionShowHintChange={handleQuestionShowHintChange}
              handleQuestionHintChange={handleQuestionHintChange}
              initialQuestionName={question.question}
              initialQuestionAnswer={question.answer}
              initialQuestionWorth={question.worth}
              initialQuestionShowHint={question.showHint}
              initialQuestionHint={question.hint}
            />
          ))}

          <Box display="flex" flexDirection={'column'} alignItems="center">
            <br />
            <Typography component={'div'} variant="h7" color="#ffffff">
              Norėdami išsaugoti pakeitimus nepamirškite paspausti žalio mygtuko ekrano dešinėje
            </Typography>
          </Box>
        </CustomCard>
        <IconButton
          onClick={handleSumbit}
          disabled={loading}
          sx={{
            position: 'fixed',
            right: 40,
            bottom: 230,
            backgroundColor: '#517300',
            '&:hover': {
              filter: 'brightness(85%)',
              backgroundColor: '#517300'
            },
            height: '75px',
            width: '75px'
          }}>
          {loading ? (
            <CircularProgress color="secondary" />
          ) : (
            <SaveRoundedIcon sx={{ color: '#ffffff', height: '50px', width: '50px' }} />
          )}
        </IconButton>
        <IconButton
          onClick={createPDF}
          sx={{
            position: 'fixed',
            right: 40,
            bottom: 135,
            backgroundColor: '#55B0D5',
            '&:hover': {
              filter: 'brightness(85%)',
              backgroundColor: '#55B0D5'
            },
            height: '75px',
            width: '75px'
          }}>
          <LocalPrintshopRoundedIcon sx={{ color: '#ffffff', height: '50px', width: '50px' }} />
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
    handleQuestionWorthChange,
    handleQuestionShowHintChange,
    handleQuestionHintChange,
    initialQuestionName,
    initialQuestionAnswer,
    initialQuestionWorth,
    initialQuestionShowHint,
    initialQuestionHint
  } = props;
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(initialQuestionShowHint);
  }, []);

  const handleChange = () => {
    setChecked(event.target.checked);
    handleQuestionShowHintChange(id, event.target.checked);
  };

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
            <IconButton onClick={() => handleDelete(id)} sx={{ color: '#e00000' }}>
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
        <Box display="flex">
          <Box display="flex" flexGrow={10} mr={2}>
            <TextField
              fullWidth
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
          </Box>
          <Box display="flex" flexGrow={1}>
            <TextField
              fullWidth
              onChange={(event) => handleQuestionWorthChange(id, event.target.value)}
              value={initialQuestionWorth}
              focused
              color="info"
              name="worth"
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
        </Box>
        <FormControlLabel
          sx={{ color: 'white' }}
          control={<Switch color="secondary" checked={checked} onChange={handleChange} />}
          label="Užuomina, kur rasti klausimą"
        />
        {checked && (
          <>
            <TextField
              onChange={(event) => handleQuestionHintChange(id, event.target.value)}
              value={initialQuestionHint}
              multiline
              rows={2}
              focused
              color="info"
              name="hint"
              label="Užuomina, kur rasti klausimą"
              sx={{ mb: 2, mt: 2 }}
              InputLabelProps={{
                style: { color: 'white' }
              }}
              InputProps={{
                style: { color: 'white' }
              }}
            />
          </>
        )}
      </Box>
    </CustomCard>
  );
};
