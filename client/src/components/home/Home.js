import { Button, Container, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box } from '@mui/system';
import { MainLeftPageTitle, MainRightPageTitle } from '../additional/PageTitle';
import { CustomCard } from '../additional/CustomCard';

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* Page MAIN Header, DON'T COPY as example */}
      <MainLeftPageTitle>
        Edukacinių orientacinių varžybų ruošimas TAU ir TAVO MOKYKLAI
      </MainLeftPageTitle>
      <MainRightPageTitle>
        Jau pats laikas TAVO mokyklai išbandyti edukacinių - orientacinių varžybų kūrimo ir žaidimo
        platformą. Nesnausk, užsisakyk jau šiandien!
      </MainRightPageTitle>
      {/* Page MAIN Header, DON'T COPY as example */}
      <Container maxWidth="md" sx={{ pb: 5 }}>
        <CustomCard>
          <Typography
            variant="h3"
            component="div"
            align="center"
            sx={{ color: 'white', fontWeight: 600, fontSize: 70 }}>
            Turi žaidimo koduką?
          </Typography>
          <Typography variant="h4" component="div" align="center" sx={{ color: 'white' }}>
            Nedelsk ir prisijunk prie varžybų!
          </Typography>
          <Box textAlign="center">
            <Button
              fullWidth
              variant="contained"
              size="large"
              color="secondary"
              sx={{ color: 'black', mt: 5, p: 1 }}
              endIcon={<PlayArrowIcon />}
              onClick={() => navigate('gamecode')}>
              <Typography
                variant="h4"
                component="div"
                align="center"
                fontWeight="bold"
                sx={{ color: 'black' }}>
                Žaisti
              </Typography>
            </Button>
          </Box>
          <br />
          <Typography
            variant="h3"
            component="div"
            align="center"
            sx={{ color: 'white', fontSize: 20 }}>
            Nori licencijos? Prenumeruok jau dabar!
            <br />
            <KeyboardArrowDownIcon
              sx={{ color: 'white', fontSize: 40 }}
              onClick={() => window.scrollTo(999, 999)}
            />
          </Typography>
          <br />
          <Typography
            variant="h3"
            component="div"
            align="center"
            sx={{ color: 'white', fontWeight: 600, fontSize: 100 }}>
            75€/mėn
          </Typography>
          <Typography
            variant="h3"
            component="div"
            align="center"
            sx={{ color: 'white', fontSize: 20 }}>
            *Prenumeraciją bet kuriuo laikotarpiu galima nutraukti
          </Typography>
          <br />
          <Typography variant="h4" component="div" align="center" sx={{ color: 'white' }}>
            Prenumeratą įsigyti galite susisiekę su mumis el. paštu: pvp.projektas@pvp.pvp arba
            telefonu: +37061111111
          </Typography>
          <Typography
            variant="h3"
            component="div"
            align="center"
            sx={{ color: 'white', fontSize: 20 }}>
            <br />
            <KeyboardArrowUpIcon
              sx={{ color: 'white', fontSize: 40 }}
              onClick={() => window.scrollTo(0, 0)}
            />
          </Typography>
        </CustomCard>
      </Container>
    </>
  );
}
