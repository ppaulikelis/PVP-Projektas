import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import { Box } from '@mui/system';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import LoyaltyIcon from '@mui/icons-material/Loyalty';

export default function Subscription() {
  return (
  <>
  <Card sx={{mt: 2,  borderBottomRightRadius: '48px', borderTopRightRadius: '48px', position: "absolute", 
                 width: 1380, height: 80, left: -100, top: 110}}>
    <CardContent
      sx={{
        background: 'linear-gradient(180deg, #AFC139 0%, #5D7E17 100%);'
      }}>
      <Box px={2}>
        <Typography 
        variant="h4" 
        component="div" 
        align="right"
        paddingRight={46} 
        sx={{ color: 'white' }}>
          Prenumerata
        </Typography>
      </Box>
    </CardContent>
  </Card>
  <Card sx={{ my: 20, borderRadius: '69px' }}>
    <CardContent
      sx={{
        background: 'linear-gradient(180deg, #55B0D5 0%, #1176AF 71.35%);'
      }}>
      <Box py={2} px={2} display="flex">
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <LoyaltyIcon sx={{ color: 'white', fontSize: 175 }} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flex: 2,
            justifyContent: 'center',
            alignItems: 'left',
            flexDirection: 'column'
          }}>
            <Typography
              variant="h3"
              component="div"
              align="center"
              sx={{ color: 'white', fontWeight: 400, fontSize: 80 }}>
              75€/mėn
            </Typography>
            <Typography variant="p" component="div" color="white" align="center">
              *Prenumeraciją bet kuriuo laikotarpiu galima nutraukti
            </Typography>
            <br />
            <Typography variant="p" component="div" color="white" align="center">
              Prenumeratą įsigyti galite susisiekę su mumis el. paštu: pvp.projektas@pvp.pvp arba
              telefonu: +37061111111
            </Typography>
            <br/>
            <Typography variant="p" component="div" color="white" align="center">
              Daugiau informacijos "D.U.K" ir "Kontaktai" skiltyje
            </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
</>
);
}
