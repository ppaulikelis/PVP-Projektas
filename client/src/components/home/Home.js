import { Button, Card, CardContent, Container, Typography } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Background from '../additional/Background'
import MainHeader from '../headers/MainHeader';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Box } from '@mui/system';

export default function Home() {
  const navigate = useNavigate()

  return (
    <Background>
      <MainHeader/>
      {/* <Card sx={{mt: 5, borderTopRightRadius: '50px', borderBottomRightRadius: '50px', width: {lg: '50%', md: '90%', sm: '90%', xs: '95%'}}}>
        <CardContent sx={{backgroundColor: '#AFC139'}}>
          <Box py={1} px={2}>
            <Typography variant="h3" component="div" align='right' sx={{ color: 'white'}}>
              Edukacinių orientacinių varžybų ruošimas tau ir tavo mokyklai
            </Typography>
          </Box>
        </CardContent>
      </Card> */}
      <Container maxWidth="md" sx={{pb: 5}}>
        <Card sx={{mt: 5, borderRadius: '48px'}}>
          <CardContent sx={{background: 'linear-gradient(180deg, #FE5D97 33.85%, #FDAFC5 89.58%);'}}>
            <Box py={1} px={2}>
              <Typography variant="h3" component="div" align='center' sx={{ color: 'white'}}>
                Edukacinių orientacinių varžybų ruošimas tau ir tavo mokyklai
              </Typography>
            </Box>
          </CardContent>
        </Card>
        <Card sx={{mt: 5, borderRadius: '48px'}}>
          <CardContent sx={{background: 'linear-gradient(180deg, #AFC139 0%, #5D7E17 100%);'}}>
            <Box py={1} px={2}>
              <Typography variant="h5" component="div" align='center' sx={{ color: 'white'}}>
              Jau pats laikas TAVO mokyklai išbandyti edukacinių - orientacinių varžybų kūrimo ir žaidimo platformą. Nesnausk, užsisakyk jau šiandien!
              </Typography>
            </Box>
          </CardContent>
        </Card>
        <Card sx={{mt: 5, borderRadius: '20px'}}>
          <CardContent sx={{background: 'linear-gradient(180deg, #55B0D5 0%, #1176AF 71.35%);'}}>
            <Box py={5} px={2}>
              <Typography variant="h3" component="div" align='center' sx={{ color: 'white', fontWeight: 600, fontSize: 70}}>
                Turi žaidimo koduką?
              </Typography>
              <Typography variant="h4" component="div" align='center' sx={{ color: 'white'}}>
                Nedelsk ir prisijunk prie varžybų!
              </Typography>
              <Box textAlign='center'>
                <Button
                  fullWidth
                  variant='contained'
                  size='large'
                  color="secondary"
                  sx={{ color: 'white', mt: 5, p: 1}}
                  endIcon={<PlayArrowIcon/>}
                  onClick={() => navigate('/gamecode')}
                >
                <Typography variant="h5" component="div" align='center' sx={{ color: 'white'}}>
                  Žaisti
                </Typography>
                </Button>
              </Box>
              <br/>
              <Typography variant="h3" component="div" align='center' sx={{ color: 'white', fontSize: 20}}>
              Nori licencijos? Prenumeruok jau dabar!
              </Typography>
              <br/>
              <br/>
              <Typography variant="h3" component="div" align='center' sx={{ color: 'white', fontWeight: 600, fontSize: 100}}>
              75€/mėn
              </Typography>
              <Typography variant="h3" component="div" align='center' sx={{ color: 'white', fontSize: 20}}>
              *Prenumeraciją bet kuriuo laikotarpiu galima nutraukti
              </Typography>
              <br/>
              <Typography variant="h4" component="div" align='center' sx={{ color: 'white'}}>
              Prenumeratą įsigyti galite susisiekę su mumis el. paštu: pvp.projektas@pvp.pvp arba telefonu: +37061111111
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Background>
  )
}
