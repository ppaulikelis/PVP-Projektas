import { Container, Typography } from '@mui/material';
import React from 'react';
import { Box } from '@mui/system';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import { CustomCard } from '../additional/CustomCard';
import { LeftPageTitle } from '../additional/PageTitle';

export default function Contacts() {
  return (
    <>
      <LeftPageTitle>Susisiekite su mumis</LeftPageTitle>
      <Container maxWidth="md" sx={{ pb: 5 }}>
        <CustomCard>
          <Box display="flex">
            <Box
              sx={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <ConnectWithoutContactIcon sx={{ color: '#1176AF', fontSize: 175 }} />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flex: 2,
                justifyContent: 'center',
                alignItems: 'left',
                flexDirection: 'column'
              }}>
              <Typography variant="p" component="div" color="black">
                Norėdami įsigyti sistemos prenumeratą ar užduoti Jums aktualių klausimų drąsiai
                kreipkitės nurodytais kontaktais. Mielai laukiame Jūsų klausimų!
              </Typography>
              <br />
              <Typography variant="p" component="div" color="black" align="left">
                <Box fontWeight="600" display="inline">
                  Adresas:&nbsp;
                </Box>
                Studentų g. 50, Kaunas LT-51368
              </Typography>
              <Typography variant="p" component="div" color="black">
                <Box fontWeight="600" display="inline">
                  Elektroninis paštas:&nbsp;
                </Box>
                pvp.projektas@pvp.pvp
              </Typography>
              <Typography variant="p" component="div" color="black">
                <Box fontWeight="600" display="inline">
                  Telefonas:&nbsp;
                </Box>
                +37061111111
              </Typography>
            </Box>
          </Box>
        </CustomCard>
      </Container>
    </>
  );
}
