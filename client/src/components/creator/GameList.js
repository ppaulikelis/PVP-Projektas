import { Box, Card, CardContent, IconButton, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditIcon from '@mui/icons-material/Edit';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';

const games = [
  {
    id: 0,
    name: 'Varžybos 0'
  },
  {
    id: 1,
    name: 'Varžybos 1'
  },
  {
    id: 2,
    name: 'Varžybos 2'
  }
];

export default function GameList() {
  const [tab, setTab] = useState(0);
  const handleTabs = (e, value) => {
    setTab(value);
  };

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
              Varžybos
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ mt: 5, borderRadius: '48px' }}>
        <CardContent
          sx={{
            background: 'linear-gradient(180deg, #55B0D5 0%, #1176AF 71.35%)'
          }}>
          <Box py={2} px={2}>
            <Tabs
              onChange={handleTabs}
              variant="fullWidth"
              value={tab}
              TabIndicatorProps={{ style: { background: '#FFFFFF' } }}>
              <Tab label={<Typography sx={{ color: '#ffffff' }}>Visos</Typography>} />
              <Tab
                label={<Typography sx={{ color: '#ffffff' }}>Šiuo metu vykstančios</Typography>}
              />
            </Tabs>
            <TabPanel value={tab} index={0}>
              <br />
              {games.map((game) => (
                <Card key={game.id} sx={{ mt: 2, borderRadius: '48px' }}>
                  <CardContent
                    sx={{
                      background: '#55B0D5'
                    }}>
                    <Box px={2} display="flex">
                      <Box
                        sx={{
                          display: 'flex',
                          flex: '1',
                          justifyContent: 'left',
                          alignItems: 'center'
                        }}>
                        <Typography
                          variant="h6"
                          component="div"
                          align="left"
                          sx={{
                            color: 'white'
                          }}>
                          {game.name}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flex: '1',
                          justifyContent: 'right',
                          alignItems: 'center'
                        }}>
                        <IconButton sx={{ color: 'lightgreen' }}>
                          <PlayCircleFilledRoundedIcon />
                        </IconButton>
                        <IconButton sx={{ color: 'orange' }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton sx={{ color: 'red' }}>
                          <DeleteRoundedIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </TabPanel>
            <TabPanel value={tab} index={1}>
              Tab2
            </TabPanel>
          </Box>
        </CardContent>
      </Card>
      <IconButton
        sx={{
          position: 'fixed',
          right: 40,
          bottom: 40,
          backgroundColor: '#FFB30F',
          '&:hover': {
            filter: 'brightness(85%)',
            backgroundColor: '#FFB30F'
          },
          height: '75px',
          width: '75px'
        }}>
        <AddRoundedIcon sx={{ color: '#ffffff', height: '50px', width: '50px' }} />
      </IconButton>
    </>
  );
}

function TabPanel(props) {
  const { children, value, index } = props;
  return <div>{value === index && children}</div>;
}
