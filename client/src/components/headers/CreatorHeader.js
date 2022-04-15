import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

export default function CreatorHeader() {
  const navigate = useNavigate();
  return (
    <Box px={4} sx={{ backgroundColor: 'rgba(67, 127, 151, 0.8)' }}>
      <Box display="flex" alignItems="center" sx={{ minHeight: '64px' }}>
        <Button
          startIcon={<RemoveRedEyeRoundedIcon />}
          variant="text"
          sx={{ color: 'white', mx: 1 }}
          onClick={() => {
            navigate('/creator');
          }}>
          Orientacinės
        </Button>
        <Typography component="div" variant="h5" sx={{ color: 'white' }}>
          |
        </Typography>
        <Button
          startIcon={<AssignmentRoundedIcon />}
          variant="text"
          sx={{ color: 'white', mx: 1 }}
          onClick={() => {
            navigate('/creator/results');
          }}>
          Rezultatai
        </Button>
        <Typography component="div" variant="h5" sx={{ color: 'white' }}>
          |
        </Typography>
        <Button
          startIcon={<AccountCircleRoundedIcon />}
          variant="text"
          sx={{ color: 'white', mx: 1 }}
          onClick={() => {
            navigate('/creator/profile');
          }}>
          Profilis
        </Button>
      </Box>
    </Box>
  );
}
