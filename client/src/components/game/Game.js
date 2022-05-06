import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  TextField,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { CustomCard } from '../additional/CustomCard';
import { LeftPageTitle } from '../additional/PageTitle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QrCodeScannerRoundedIcon from '@mui/icons-material/QrCodeScannerRounded';

export default function Game() {
  return (
    <>
      <LeftPageTitle>Pavadinimas</LeftPageTitle>
      <Container maxWidth="md">
        <CustomCard>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                backgroundColor: '#55B0D5'
              }}>
              <Typography sx={{ color: 'white' }}>Klausimas 1</Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                backgroundColor: '#2997D6'
              }}>
              <Typography component={'div'} variant="p" sx={{ color: 'white' }}>
                Čia bus klausimas, kurį reiks ataskyt
              </Typography>
              <br />
              <TextField
                focused
                color="info"
                name="asnwer"
                label="Atsakymas"
                fullWidth
                InputLabelProps={{
                  style: { color: 'white' }
                }}
                InputProps={{
                  style: { color: 'white' }
                }}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                backgroundColor: '#55B0D5'
              }}>
              <Typography sx={{ color: 'white' }}>Klausimas 2</Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                backgroundColor: '#2997D6'
              }}>
              <Typography component={'div'} variant="p" sx={{ color: 'white' }}>
                Čia bus užuomina, kurią reikia įminti, kad klausymas atsirankintų
              </Typography>
              <br />
              <TextField
                focused
                color="info"
                name="hint"
                label="Klausimo raktas"
                fullWidth
                InputLabelProps={{
                  style: { color: 'white' }
                }}
                InputProps={{
                  style: { color: 'white' }
                }}
              />
              <br />
              <br />
              <Typography component={'div'} variant="p" sx={{ color: 'white' }} align="center">
                arba
              </Typography>
              <br />
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                endIcon={<QrCodeScannerRoundedIcon />}
                sx={{ color: 'white' }}>
                Skenuoti QR
              </Button>
            </AccordionDetails>
          </Accordion>
          <Box display="flex" justifyContent="flex-end">
            <Button variant="contained" color="secondary" sx={{ color: 'white' }}>
              Baigti
            </Button>
          </Box>
        </CustomCard>
      </Container>
    </>
  );
}
