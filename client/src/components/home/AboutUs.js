import { Avatar, Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import { Box } from '@mui/system';

const employees = [
  {
    name: 'Liveta',
    img: '/logo192.png'
  },
  {
    name: 'Paulius',
    img: '/logo192.png'
  },
  {
    name: 'Dovilė',
    img: '/logo192.png'
  },
  {
    name: 'Erikas',
    img: '/logo192.png'
  },
  {
    name: 'Goda',
    img: '/logo192.png'
  }
];

export default function AboutUs() {
  return (
    <>
      <Card sx={{ mt: 2, borderRadius: '48px' }}>
        <CardContent
          sx={{
            background: 'linear-gradient(180deg, #AFC139 0%, #5D7E17 100%);'
          }}>
          <Box px={2}>
            <Typography
              variant="h4"
              component="div"
              align="center"
              sx={{
                color: 'white',
                textShadowColor: 'rgba(0, 0, 0, 0.25)',
                textShadowOffset: { width: 0, height: 4 },
                textShadowRadius: 4
              }}>
              Apie mus
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ my: 5, borderRadius: '69px' }}>
        <CardContent
          sx={{
            background: 'linear-gradient(180deg, #55B0D5 0%, #1176AF 71.35%);'
          }}>
          <Box py={5} px={2} display="flex">
            <Box
              sx={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <img alt={'logo'} src={'/logo_white.png'} width={'400px'} />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
              }}>
              <Typography variant="p" component="div" color="white">
                ORIS - orientacinių varžybų ruošimo ir organizavimo informacinė sistema. Ši sistema
                sujungia švietimą ir aktyvų laisvalaikį. ORIS buvo sukurta mokykloms, siekiant
                skatinti mokinių žinių pritaikomumą, smalsumą bei fizinį aktyvumą. Tai platforma,
                kurioje galima kurti bei žaisti varžybas individualiai bei komandose. ORIS tikslas -
                vaikų edukacija fizinės veiklos metu.
              </Typography>
              <br />
              <Typography variant="p" component="div" color="white">
                ORIS pagalba mokytojai turi galimybę paprasčiau kurti interaktyvias varžybas,
                struktūrizuoti ir įvertinti užduotis. Tuo tarpu mokiniai - dalyvauti, spręsti bei
                įvykdyti užduotis.
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ my: 5, borderRadius: '69px' }}>
        <CardContent
          sx={{
            background: 'linear-gradient(180deg, #FE5D97 33.85%, #FDAFC5 89.58%);'
          }}>
          <Box py={5} px={2} display="flex" flexDirection="column">
            <Typography variant="h4" component="div" align="center" sx={{ color: 'white' }}>
              ORIS komanda
            </Typography>
            <br />
            <Box display="flex">
              {employees.map((employee) => (
                <Box
                  sx={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                  }}
                  key={employee.name}>
                  <Avatar alt="Remy Sharp" src={employee.img} sx={{ width: 100, height: 100 }} />
                  <Typography
                    variant="h5"
                    component="div"
                    align="center"
                    sx={{ color: 'white', mt: 2 }}>
                    {employee.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
