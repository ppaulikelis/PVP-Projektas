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
                ? 'linear-gradient(180deg, #FFFFFF 80%, #BDBDBD 100%)'
                : 'linear-gradient(180deg, #FFFFFF 80%, #BDBDBD 100%)'
            }>
            <Typography
              variant="h5"
              component="div"
              align="left"
              sx={{ color: 'black', fontStyle: 'italic' }}>
              “{review.text}”
            </Typography>
            <br />
            <Typography
              variant="p"
              fontWeight="600"
              component="div"
              align="right"
              sx={{ color: '#1176AF' }}>
              {review.school}
            </Typography>
          </CustomCard>
        ))}
      </Container>
    </>
  );
}
