import { Card, CardContent, Container, Typography } from '@mui/material';
import React from 'react'
import Background from '../additional/Background'
import MainHeader from '../headers/MainHeader';
import { Box } from '@mui/system';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

export default function Contacts() {
  return (
    <Background>
      <MainHeader/>
      <Container maxWidth="md" sx={{pb: 5}}>
        <Card sx={{mt: 5, borderRadius: '48px'}}>
          <CardContent sx={{background: 'linear-gradient(180deg, #AFC139 0%, #5D7E17 100%);'}}>
            <Box py={1} px={2}>
              <Typography variant="h4" component="div" align='center' sx={{ color: 'white'}}>
                Susisiekite su mumis
              </Typography>
            </Box>
          </CardContent>
        </Card>
        <Card sx={{my: 5, borderRadius: '20px'}}>
          <CardContent sx={{background: 'linear-gradient(180deg, #55B0D5 0%, #1176AF 71.35%);'}}>
            <Box py={5} px={2} display="flex">
              <Box sx={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ConnectWithoutContactIcon sx={{color: 'white', fontSize: 175}}/>
              </Box>
              <Box sx={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'left', flexDirection: 'column'}}>
                <Typography variant="p" component="div" color="white">
                  Norėdami įsigyti sistemos prenumeratą ar užduoti Jums aktualių klausimų drąsiai kreipkitės nurodytais kontaktais. Mielai laukiame Jūsų klausimų!
                </Typography>
                <br/>
                <Typography variant="p" component="div" color="white" align='left'>
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
      </Container>
    </Background>
  )
}
