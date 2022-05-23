import { Container, Typography } from '@mui/material';
import React from 'react';
import { Box } from '@mui/system';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import { CustomCard } from '../additional/CustomCard';
import { LeftPageTitle } from '../additional/PageTitle';

export default function Subscription() {
  return (
    <>
      <LeftPageTitle>Prenumerata</LeftPageTitle>
      <Container maxWidth="md" sx={{ pb: 5 }}>
        <CustomCard>
          <Box display="flex">
            <Box
              sx={{
                pr: 5,
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <LoyaltyIcon sx={{ color: '#1176AF', fontSize: 175 }} />
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
                align="left"
                sx={{ color: 'black', fontWeight: 400, fontSize: 80 }}>
                75€/mėn
              </Typography>
              <Typography
                variant="p"
                component="div"
                color="black"
                align="left"
                sx={{ fontStyle: 'italic' }}>
                *Prenumeraciją bet kuriuo laikotarpiu galima nutraukti
              </Typography>
              <br />
              <Typography variant="p" component="div" color="black" align="left">
                Prenumeratą įsigyti galite susisiekę su mumis el. paštu: pvp.projektas@pvp.pvp arba
                telefonu: +37061111111
              </Typography>
              <br />
              <Typography variant="p" component="div" color="black" align="left">
                Daugiau informacijos &quot;D.U.K&quot; ir &quot;Kontaktai&quot; skiltyje
              </Typography>
            </Box>
          </Box>
        </CustomCard>
      </Container>
    </>
  );
}
