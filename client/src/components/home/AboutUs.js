import { Avatar, Container, Typography } from '@mui/material';
import React from 'react';
import { Box } from '@mui/system';
import { LeftPageTitle } from '../additional/PageTitle';
import { CustomCard } from '../additional/CustomCard';

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
      {/* Page Header, copy as example */}
      <LeftPageTitle>Apie mus</LeftPageTitle>
      {/* Page Header, copy as example */}
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
              <img alt={'logo'} src={'/logo_blue.png'} width={'400px'} />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
              }}>
              <Typography variant="p" component="div" color="black">
                <Box fontWeight="600" display="inline" sx={{ color: '#1176AF' }}>
                  ORIS&nbsp;
                </Box>
                - orientacinių varžybų ruošimo ir organizavimo informacinė sistema. Ši sistema
                sujungia švietimą ir aktyvų laisvalaikį. ORIS buvo sukurta mokykloms, siekiant
                skatinti mokinių žinių pritaikomumą, smalsumą bei fizinį aktyvumą. Tai platforma,
                kurioje galima kurti bei žaisti varžybas individualiai bei komandose.
              </Typography>
              <br />
              <Typography
                fontWeight="600"
                sx={{ color: '#1176AF' }}
                fontStyle="italic"
                align="center">
                ORIS tikslas - vaikų edukacija fizinės veiklos metu.
              </Typography>
              <br />
              <Typography variant="p" component="div" color="black">
                ORIS pagalba mokytojai turi galimybę paprasčiau kurti interaktyvias varžybas,
                struktūrizuoti ir įvertinti užduotis. Tuo tarpu mokiniai - dalyvauti, spręsti bei
                įvykdyti užduotis.
              </Typography>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography variant="h4" component="div" align="center" sx={{ color: 'black' }}>
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
                    sx={{ color: 'black', mt: 2 }}>
                    {employee.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </CustomCard>
      </Container>
    </>
  );
}
