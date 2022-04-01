import { Card, CardContent, Container, Typography } from '@mui/material';
import React from 'react'
import Background from './additional/Background';
import MainHeader from './headers/MainHeader';
import { Box } from '@mui/system'

const reviews = [
  {
    text: 'Labai šauni programa, rekomenduojam mokyklom pabandyt!',
    school: 'KTU gimnazija'
  },
  {
    text: 'Eina sau kaip smagu naudotis. Ir PIGU. Labai rekomenduojam visiem!!!',
    school: 'Varpo gimnazija'
  },
  {
    text: 'Labai šauni programa, rekomenduojam mokyklom pabandyt!',
    school: 'Varpelio pradinė mokykla'
  },
  {
    text: 'Eina sau kaip smagu naudotis. Ir PIGU. Labai rekomenduojam visiem!!!',
    school: 'Saulės gimnazija'
  },
];

export default function Reviews() {
  return (
    <Background>
      <MainHeader/>
      <Container maxWidth="md" sx={{pb: 5}}>
        <Card sx={{mt: 5, borderRadius: '20px'}}>
          <CardContent sx={{backgroundColor: '#AFC139'}}>
            <Box py={1} px={2}>
              <Typography variant="h4" component="div" align='center' sx={{ color: 'white'}}>
                Atsiliepimai
              </Typography>
            </Box>
          </CardContent>
        </Card>
        {reviews.map((review, index) => (
          <Card sx={{mt: 5, borderRadius: '20px'}}>
          <CardContent sx={{backgroundColor: index % 2 === 0 ? '#437F97' : '#FDB5C9'}}>
            <Box py={1} px={2}>
              <Typography variant="h5" component="div" align='left' sx={{ color: 'white', fontStyle: 'italic'}}>
                “{review.text}”
              </Typography>
              <br/>
              <Typography variant="p" component="div" align='right' sx={{ color: 'white'}}>
                {review.school}
              </Typography>
            </Box>
          </CardContent>
        </Card>
        ))}  
      </Container>
    </Background>
  )
}
