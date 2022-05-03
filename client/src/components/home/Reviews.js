import { Container, Typography } from '@mui/material';
import React from 'react';
import { CustomCard } from '../additional/CustomCard';
import { LeftPageTitle } from '../additional/PageTitle';

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
  }
];

export default function Reviews() {
  return (
    <>
      <LeftPageTitle>Atsiliepimai</LeftPageTitle>
      <Container maxWidth="md" sx={{ pb: 5 }}>
        {reviews.map((review, index) => (
          <CustomCard
            key={review.school}
            background={
              index % 2 === 0
                ? 'linear-gradient(180deg, #55B0D5 0%, #1176AF 71.35%)'
                : 'linear-gradient(180deg, #FE5D97 33.85%, #FDAFC5 89.58%)'
            }>
            <Typography
              variant="h5"
              component="div"
              align="left"
              sx={{ color: 'white', fontStyle: 'italic' }}>
              “{review.text}”
            </Typography>
            <br />
            <Typography variant="p" component="div" align="right" sx={{ color: 'white' }}>
              {review.school}
            </Typography>
          </CustomCard>
        ))}
      </Container>
    </>
  );
}
