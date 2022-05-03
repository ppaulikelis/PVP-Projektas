import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import { Box } from '@mui/system';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

export default function Contacts() {
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
            paddingRight={40} 
            sx={{ color: 'white' }}>
              Susisiekite su mumis
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ mt: 20, borderRadius: '69px' }}>
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
              <ConnectWithoutContactIcon sx={{ color: 'white', fontSize: 175 }} />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flex: 2,
                justifyContent: 'center',
                alignItems: 'left',
                flexDirection: 'column'
              }}>
              <Typography variant="p" component="div" color="white">
                Norėdami įsigyti sistemos prenumeratą ar užduoti Jums aktualių klausimų drąsiai
                kreipkitės nurodytais kontaktais. Mielai laukiame Jūsų klausimų!
              </Typography>
              <br />
              <Typography variant="p" component="div" color="white" align="left">
                Adresas: Studentų g. 50, Kaunas LT-51368
              </Typography>
              <Typography variant="p" component="div" color="white">
                Elektroninis paštas: pvp.projektas@pvp.pvp
              </Typography>
              <Typography variant="p" component="div" color="white">
                Telefonas: +37061111111
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
