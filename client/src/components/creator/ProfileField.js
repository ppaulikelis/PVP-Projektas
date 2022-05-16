import { Box, Typography } from '@mui/material';
import React from 'react';

export const ProfileField = (props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: 800
      }}>
      <Typography
        variant="h6"
        component="div"
        color="black"
        flexGrow={1}
        sx={{
          mb: 2,
          fontWeight: 'bold'
        }}>
        {props.fieldName}
      </Typography>
      <Typography variant="h6" component="div" color="gray" flexGrow={2} sx={{ mb: 2 }}>
        {props.fieldValue}
      </Typography>
    </Box>
  );
};
