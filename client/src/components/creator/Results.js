import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  Tab,
  Tabs,
  TextField,
  Typography,
  CircularProgress
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CustomCard } from '../additional/CustomCard';
import { LeftPageTitle } from '../additional/PageTitle';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuthContext } from '../../contexts/AuthContext';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Tooltip from '@mui/material/Tooltip';
import { useSnackbar } from 'notistack';

export default function Results() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [startedGames, setStartedGames] = useState([]);
  const [tab, setTab] = useState(0);
  const [selectedId, setSelectedId] = useState(-1);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const gamesCollectionRef = collection(db, 'games');
  const startedGamesCollectionRef = collection(db, 'startedGames');
  const q = query(gamesCollectionRef, where('user', '==', user.uid));
  const q1 = query(startedGamesCollectionRef, where('user', '==', user.uid));
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getDocs(q).then((res1) => {
      const gamesFromResponse = res1.docs.map((doc) => ({ name: doc.data().name, id: doc.id }));
      getDocs(q1).then((res2) => {
        const startedGamesFromResponse = res2.docs.map((doc) => ({
          startedGameName: doc.data().name,
          startDateTime: doc.data().startDateTime,
          endDateTime: doc.data().endDateTime,
          gameId: doc.data().game,
          id: doc.id
        }));
        const handleMergeNameFind = (game) => {
          if (game == null) {
            return 'NOT_FOUND';
          }
          return game.name;
        };
        const mergedStartedGames = startedGamesFromResponse.map((startedGame) => ({
          ...startedGame,
          gameName: handleMergeNameFind(
            gamesFromResponse.find((game) => game.id == startedGame.gameId)
          )
        }));
        setStartedGames(mergedStartedGames);
      });
    });
  }, [refresh]);

  const handleTabs = (e, value) => {
    setTab(value);
  };

  const handleDeleteOpen = (id) => {
    setSelectedId(id);
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const handleStartedGameDelete = async () => {
    setLoading(true);
    try {
      const gameDoc = doc(db, 'startedGames', selectedId);
      await deleteDoc(gameDoc);
      enqueueSnackbar('Orientacinių varžybų kambarys sėkmingai pašalintas', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar('Įvyko klaida!', { variant: 'error' });
    }
    handleDeleteClose();
    setRefresh(refresh + 1);
    setLoading(false);
  };

  return (
    <>
      <LeftPageTitle>Orientacinių varžybų rezultatai</LeftPageTitle>
      <Container maxWidth="lg" sx={{ pb: 5 }}>
        <CustomCard background="white">
          <TextField
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
            focused
            name="search"
            label="Paieška"
            fullWidth
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: <SearchRoundedIcon />
            }}
          />
          <Tabs
            onChange={handleTabs}
            variant="fullWidth"
            value={tab}
            TabIndicatorProps={{ style: { background: '#1176AF' } }}>
            <Tab label={<Typography sx={{ color: '#1176AF' }}>Visi</Typography>} />
            <Tab label={<Typography sx={{ color: '#1176AF' }}>Asmeniniai</Typography>} />
          </Tabs>
          <TabPanel value={tab} index={0}>
            <br />
            {startedGames
              .filter((game) => {
                if (searchTerm === '') {
                  return game;
                } else if (
                  game.startedGameName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  game.gameName.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return game;
                }
              })
              .map((startedGame) => (
                <CustomCard key={startedGame.id} background={'#D1D1D1'}>
                  <Box display="flex">
                    <Box
                      sx={{
                        display: 'flex',
                        flex: '1',
                        alignItems: 'left',
                        flexDirection: 'column'
                      }}>
                      <Typography
                        variant="h5"
                        component="div"
                        align="left"
                        color="#1176AF"
                        fontWeight={'bold'}>
                        {startedGame.startedGameName}
                      </Typography>
                      <Typography variant="p" component="div" align="left" color="#1176AF">
                        Orientacinių varžybų pavadinimas: {startedGame.gameName}
                      </Typography>
                      <Typography variant="p" component="div" align="left" color="#1176AF">
                        Žaidimo pradžia: {startedGame.startDateTime.replace('T', ' ')}
                      </Typography>
                      <Typography variant="p" component="div" align="left" color="#1176AF">
                        Žaidimo pabaiga: {startedGame.endDateTime.replace('T', ' ')}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flex: '1',
                        justifyContent: 'right',
                        alignItems: 'flex-end'
                      }}>
                      <Tooltip title="Peržiūrėti rezultatus" placement="top">
                        <Button
                          variant="contained"
                          sx={{ ml: '10px', borderRadius: '69px', backgroundColor: '#008724' }}
                          onClick={() => navigate('all/' + startedGame.id)}>
                          <VisibilityIcon />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Kopijuoti prisijungimo kodą" placement="top">
                        <Button
                          variant="contained"
                          sx={{ ml: '10px', borderRadius: '69px', backgroundColor: '#9540DF' }}
                          onClick={() => {
                            navigator.clipboard.writeText(startedGame.id);
                            enqueueSnackbar('Orientacinių varžybų kambario kodas nukopijuotas', {
                              variant: 'success'
                            });
                          }}>
                          <ContentCopyIcon />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Pašalinti kambarį" placement="top">
                        <Button
                          variant="contained"
                          color="error"
                          sx={{ ml: '10px', borderRadius: '69px', backgroundColor: '#e00000' }}
                          onClick={() => handleDeleteOpen(startedGame.id)}>
                          <DeleteRoundedIcon />
                        </Button>
                      </Tooltip>
                    </Box>
                  </Box>
                </CustomCard>
              ))}
            {startedGames.length === 0 && (
              <Box display="flex" flexDirection={'column'} alignItems="center">
                <img src="/logo_komposas2_square.png" width={'450px'} />
                <Typography component={'div'} variant="h5">
                  Orientacinių varžybų rezultatų nėra
                </Typography>
              </Box>
            )}
          </TabPanel>
          <TabPanel value={tab} index={1}>
            Kuriama...
          </TabPanel>
        </CustomCard>
      </Container>
      <Dialog open={openDelete} onClose={handleDeleteClose}>
        <Box p={1}>
          <DialogTitle>
            <Typography variant="h5" component="div" align="center">
              Ar tikrai norite pašalinti orientacinių varžybų kambarį?
            </Typography>
          </DialogTitle>
          <DialogActions>
            <Button color="primary" variant="contained" onClick={handleDeleteClose}>
              Atšaukti
            </Button>
            <Button
              color="error"
              variant="contained"
              autoFocus
              onClick={handleStartedGameDelete}
              disabled={loading}>
              {loading ? <CircularProgress color="secondary" /> : 'Pašalinti'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}

function TabPanel(props) {
  const { children, value, index } = props;
  return <div>{value === index && children}</div>;
}
