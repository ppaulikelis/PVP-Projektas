import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, Container, Typography } from '@mui/material';
import React from 'react'
import Background from '../additional/Background'
import MainHeader from '../headers/MainHeader';
import { Box } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faq = [
  {
    topic: 'Prenumerata',
    questions: [
      {
        question: 'Question 1',
        answer: 'Answer 1',
      },
      {
        question: 'Question 2',
        answer: 'Answer 2',
      },
    ]
  },
  {
    topic: 'Varžybų kūrimas',
    questions: [
      {
        question: 'Question 1',
        answer: 'Answer 1',
      },
      {
        question: 'Question 2',
        answer: 'Answer 2',
      },
    ]
  },
  {
    topic: 'Varžybų žaidimas',
    questions: [
      {
        question: 'Question 1',
        answer: 'Answer 1',
      },
      {
        question: 'Question 2',
        answer: 'Answer 2',
      },
    ]
  },
  {
    topic: 'Patarimai',
    questions: [
      {
        question: 'Question 1',
        answer: 'Answer 1',
      },
      {
        question: 'Question 2',
        answer: 'Answer 2',
      },
    ]
  },
]

export default function Faq() {
  return (
    <Background>
      <MainHeader/>
      <Container maxWidth="md" sx={{pb: 5}}>
        <Card sx={{mt: 5, borderRadius: '20px'}}>
          <CardContent sx={{backgroundColor: '#AFC139'}}>
            <Box py={1} px={2}>
              <Typography variant="h4" component="div" align='center' sx={{ color: 'white'}}>
                Dažnai užduodami klausimai
              </Typography>
            </Box>
          </CardContent>
        </Card>
        {faq.map((topic, index) => (
          <Card sx={{my: 5, borderRadius: '20px'}}>
          <CardContent sx={{backgroundColor: index % 2 === 0 ? '#437F97' : '#FDB5C9'}}>
            <Box py={5} px={2} display="flex" flexDirection='column'>
              <Typography variant="h4" component="div" align='center' sx={{ color: 'white'}}>
                {topic.topic}
              </Typography>
              <br/>
              {topic.questions.map((question) => (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: 'white'}}/>}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{backgroundColor: index % 2 === 0 ? '#437F97' : '#FDB5C9'}}
                >
                  <Typography sx={{ color: 'white'}}>{question.question}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{backgroundColor: index % 2 === 0 ? '#437F97' : '#FDB5C9'}}>
                  <Typography sx={{ color: 'white'}}>
                    {question.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
              ))}
            </Box>
          </CardContent>
        </Card>
        ))}
      </Container>
    </Background>
  )
}
