import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditIcon from '@mui/icons-material/Edit';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { db } from '../../firebase';
import { collection, getDocs, addDoc, doc, deleteDoc, query, where } from 'firebase/firestore';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CustomCard } from '../additional/CustomCard';
import { LeftPageTitle } from '../additional/PageTitle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
export default function GameList() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [tab, setTab] = useState(0);
  const [selectedId, setSelectedId] = useState(-1);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openStart, setOpenStart] = useState(false);
  const [games, setGames] = useState([{}]);
  const [startedGames, setStartedGames] = useState([{}]);
  const [gameName, setGameName] = useState('');
  const [gameDateStart, setGameDateStart] = useState('');
  const [gameDateEnd, setGameDateEnd] = useState('');
  const [gameDescription, setGameDescription] = useState('');
  const [refresh, setRefresh] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const gamesCollectionRef = collection(db, 'games');
  const startedGamesCollectionRef = collection(db, 'startedGames');
  const q = query(gamesCollectionRef, where('user', '==', user.uid));
  const q1 = query(startedGamesCollectionRef, where('user', '==', user.uid));

  const resetForms = () => {
    setGameName('');
    setGameDescription('');
    setGameDateStart('');
    setGameDateEnd('');
  };

  const handleGameSubmit = async () => {
    setLoading(true);
    await addDoc(gamesCollectionRef, {
      user: user.uid,
      name: gameName,
      description: gameDescription
    });
    handleAddClose();
    setRefresh(refresh + 1);
    resetForms();
    setLoading(false);
  };

  const handleGameStartSubmit = async () => {
    await addDoc(startedGamesCollectionRef, {
      user: user.uid,
      game: selectedId,
      startDateTime: gameDateStart,
      endDateTime: gameDateEnd,
      submissions: []
    });
    handleStartClose();
    resetForms();
  };

  const handleGameDelete = async () => {
    const gameDoc = doc(db, 'games', selectedId);
    await deleteDoc(gameDoc);
    handleDeleteClose();
    setRefresh(refresh + 1);
  };

  useEffect(() => {
    const getGames = async () => {
      const data = await getDocs(q);
      setGames(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const getStartedGames = async () => {
      const data = await getDocs(q1);
      setStartedGames(data.docs.map((doc) => ({ id: doc.id })));
    };
    getGames();
    getStartedGames();
  }, [refresh]);

  const handleDeleteOpen = (id) => {
    setSelectedId(id);
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const handleAddOpen = () => {
    setOpenAdd(true);
  };

  const handleAddClose = () => {
    setOpenAdd(false);
  };

  const handleTabs = (e, value) => {
    setTab(value);
  };

  const handleStartOpen = (id) => {
    setSelectedId(id);
    setOpenStart(true);
  };

  const handleStartClose = () => {
    setOpenStart(false);
  };

  return (
    <>
      <LeftPageTitle>Orientacinės varžybos</LeftPageTitle>
      <Container maxWidth="lg" sx={{ pb: 5 }}>
        <CustomCard>
          <TextField
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
            focused
            color="info"
            name="search"
            label="Paieška"
            fullWidth
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: <SearchRoundedIcon />,
              style: { color: 'white' }
            }}
            InputLabelProps={{
              style: { color: 'white' }
            }}
          />
          <Tabs
            onChange={handleTabs}
            variant="fullWidth"
            value={tab}
            TabIndicatorProps={{ style: { background: '#FFFFFF' } }}>
            <Tab label={<Typography sx={{ color: '#ffffff' }}>Visos</Typography>} />
            <Tab label={<Typography sx={{ color: '#ffffff' }}>Vykstančios</Typography>} />
          </Tabs>
          <TabPanel value={tab} index={0}>
            <br />
            {games
              .filter((game) => {
                if (searchTerm === '') {
                  return game;
                } else if (game.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                  return game;
                }
              })
              .map((game) => (
                <CustomCard key={game.id} background={'#55B0D5'}>
                  <Box display="flex">
                    <Box
                      sx={{
                        display: 'flex',
                        flex: '1',
                        justifyContent: 'left',
                        alignItems: 'center'
                      }}>
                      <Typography
                        variant="h5"
                        component="div"
                        align="left"
                        sx={{
                          color: 'white',
                          fontStyle: game.name ? 'normal' : 'italic'
                        }}>
                        {game.name ? game.name : 'be pavadinimo'}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flex: '1',
                        justifyContent: 'right',
                        alignItems: 'center'
                      }}>
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ ml: '10px', borderRadius: '69px' }}
                        onClick={() => handleStartOpen(game.id)}>
                        <PlayArrowIcon />
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        sx={{ ml: '10px', borderRadius: '69px' }}
                        onClick={() => navigate('game/' + game.id)}>
                        <EditIcon sx={{ color: 'white' }} />
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        sx={{ ml: '10px', borderRadius: '69px' }}
                        onClick={() => handleDeleteOpen(game.id)}>
                        <DeleteRoundedIcon />
                      </Button>
                    </Box>
                  </Box>
                </CustomCard>
              ))}
            {games.length === 0 && (
              <Box display="flex" flexDirection={'column'} alignItems="center">
                <img src="/logo_white.png" width={'450px'} />
                <Typography component={'div'} variant="h5" color="#ffffff">
                  Orientacinių nėra
                </Typography>
                <Typography component={'div'} variant="h6" color="#ffffff">
                  Sukurkite pirmas savo orientacines varžybas spausdami + mygtuką ekrano dešinėje
                </Typography>
              </Box>
            )}
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <br />
            {startedGames.map((startedGame) => (
              <CustomCard key={startedGame.id} background={'#55B0D5'}>
                <Box display="flex">
                  <Box
                    sx={{
                      display: 'flex',
                      flex: '1',
                      justifyContent: 'left',
                      alignItems: 'center'
                    }}>
                    <Typography variant="h5" component="div" align="left" color="#ffffff">
                      {startedGame.id}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flex: '1',
                      justifyContent: 'right',
                      alignItems: 'center'
                    }}>
                    <Button
                      variant="contained"
                      color="success"
                      sx={{ ml: '10px', borderRadius: '69px' }}
                      onClick={() => navigator.clipboard.writeText(startedGame.id)}>
                      <ContentCopyIcon />
                    </Button>
                  </Box>
                </Box>
              </CustomCard>
            ))}
          </TabPanel>
        </CustomCard>
      </Container>
      <IconButton
        onClick={handleAddOpen}
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
      <Dialog open={openDelete} onClose={handleDeleteClose}>
        <Box p={1}>
          <DialogTitle>
            <Typography variant="h5" component="div" align="center">
              Ar tikrai norite pašalinti orientacinių varžybų įrašą?
            </Typography>
          </DialogTitle>
          <DialogActions>
            <Button color="primary" variant="contained" onClick={handleDeleteClose}>
              Atšaukti
            </Button>
            <Button color="error" variant="contained" autoFocus onClick={handleGameDelete}>
              Pašalinti
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      <Dialog open={openAdd} onClose={handleAddClose}>
        <Box p={1}>
          <DialogTitle>
            <Typography variant="h5" component="div" align="center">
              Naujos orientacinės varžybos
            </Typography>
          </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Pavadinimas"
              required
              autoFocus
              margin="dense"
              onChange={(event) => {
                setGameName(event.target.value);
              }}
            />
            <TextField
              fullWidth
              multiline
              rows={5}
              maxRows={5}
              label="Aprašymas"
              margin="dense"
              onChange={(event) => {
                setGameDescription(event.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" variant="contained" onClick={handleAddClose}>
              Atšaukti
            </Button>
            <Button
              color="secondary"
              variant="contained"
              autoFocus
              sx={{ color: 'white' }}
              onClick={handleGameSubmit}
              disabled={loading}>
              {loading ? <CircularProgress color="secondary" /> : 'Pridėti'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      <Dialog open={openStart} onClose={handleStartClose}>
        <Box p={1}>
          <DialogTitle>
            <Typography variant="h5" component="div" align="center">
              Pradėti naujas orientacines varžybas
            </Typography>
          </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Orientacinių varžybų pradžia"
              focused
              margin="dense"
              type="datetime-local"
              onChange={(event) => {
                setGameDateStart(event.target.value);
              }}
            />
            <TextField
              fullWidth
              label="Orientacinių varžybų pabaiga"
              autoFocus
              margin="dense"
              type="datetime-local"
              focused
              onChange={(event) => {
                setGameDateEnd(event.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" variant="contained" onClick={handleStartClose}>
              Atšaukti
            </Button>
            <Button
              color="secondary"
              variant="contained"
              sx={{ color: 'white' }}
              onClick={handleGameStartSubmit}>
              Pradėti
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
