import { Box, Card, CardContent } from '@mui/material';
import React from 'react';

export const CustomCard = (props) => {
  return (
    <Card sx={{ mt: 2, borderRadius: '69px' }}>
      <CardContent
        sx={{
          background: props.background
        }}>
        <Box py={2} px={2}>
          {props.children}
        </Box>
      </CardContent>
    </Card>
  );
};

CustomCard.defaultProps = {
  background: 'linear-gradient(180deg, #55B0D5 0%, #1176AF 71.35%);'
};
