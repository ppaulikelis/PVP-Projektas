import { Box, Card, CardContent, Typography } from '@mui/material';
import React from 'react';

export const MainLeftPageTitle = (props) => {
  return (
    <Card
      sx={{
        mt: 2,
        borderBottomRightRadius: '48px',
        borderTopRightRadius: '48px',
        mr: { md: 'calc(calc(calc(100% - 900px) / 2) + 20px)', xs: '20px' }
      }}>
      <CardContent
        sx={{
          background: props.background
        }}>
        <Box py={1} px={2}>
          <Typography
            variant="h4"
            component="div"
            fontWeight="600"
            align="left"
            sx={{ color: 'white' }}>
            {props.children}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export const MainRightPageTitle = (props) => {
  return (
    <Card
      sx={{
        mt: 2,
        mb: 13,
        borderBottomLeftRadius: '48px',
        borderTopLeftRadius: '48px',
        ml: { md: 'calc(calc(calc(100% - 900px) / 2) + 20px)', xs: '20px' }
      }}>
      <CardContent
        sx={{
          background: props.background
        }}>
        <Box py={1} px={2}>
          <Typography variant="h5" component="div" align="right" sx={{ color: 'white' }}>
            {props.children}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export const LeftPageTitle = (props) => {
  return (
    <Card
      sx={{
        mt: 2,
        borderBottomRightRadius: '48px',
        borderTopRightRadius: '48px',
        mr: { md: 'calc(calc(calc(100% - 900px) / 2) + 20px)', xs: '20px' }
      }}>
      <CardContent
        sx={{
          background: props.background
        }}>
        <Box px={2} display="flex" justifyContent="flex-end">
          <Box sx={{ width: { md: '800px', xs: '100%' } }}>
            <Typography
              variant="h4"
              component="div"
              align="center"
              sx={{
                color: 'white'
              }}>
              {props.children}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export const LeftPageTitle2 = (props) => {
  return (
    <Card
      sx={{
        mt: 2,
        borderBottomRightRadius: '48px',
        borderTopRightRadius: '48px',
        mr: { md: 'calc(calc(calc(100% - 900px) / 2) + 20px)', xs: '20px' }
      }}>
      <CardContent
        sx={{
          background: props.background
        }}>
        <Box px={2} display="flex" justifyContent="flex-end">
          <Box sx={{ width: { md: '800px', xs: '100%' } }}>
            <Typography
              variant="h4"
              component="div"
              align="center"
              sx={{
                color: 'white'
              }}>
              {props.children}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export const RightPageTitle = (props) => {
  return (
    <Card
      sx={{
        mt: 2,
        borderBottomLeftRadius: '48px',
        borderTopLeftRadius: '48px',
        ml: { md: 'calc(calc(calc(100% - 900px) / 2) + 20px)', xs: '20px' }
      }}>
      <CardContent
        sx={{
          background: props.background
        }}>
        <Box px={2} display="flex" justifyContent="flex-start">
          <Box sx={{ width: { md: '800px', xs: '100%' } }}>
            <Typography
              variant="h4"
              component="div"
              align="center"
              sx={{
                color: 'white'
              }}>
              {props.children}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

MainLeftPageTitle.defaultProps = {
  background: 'linear-gradient(180deg, #FCBD36 40%, #FF852D 100%);'
};

MainRightPageTitle.defaultProps = {
  background: 'linear-gradient(180deg, #FCBD36 40%, #FF852D 100%);'
};

LeftPageTitle.defaultProps = {
  background: 'linear-gradient(180deg, #FCBD36 40%, #FF852D 100%);'
};

LeftPageTitle2.defaultProps = {
  background: 'linear-gradient(180deg, #FE5D97 33.85%, #FDAFC5 89.58%);'
};

RightPageTitle.defaultProps = {
  background: 'linear-gradient(180deg, #FE5D97 33.85%, #FDAFC5 89.58%);'
};
