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
  const [games, setGames] = useState([]);
  const [startedGames, setStartedGames] = useState([]);
  const [gameName, setGameName] = useState('');
  const [gameDescription, setGameDescription] = useState('');
  const [startedGameName, setStartedGameName] = useState('');
  const [gameDateStart, setGameDateStart] = useState('');
  const [gameDateEnd, setGameDateEnd] = useState('');
  const [refresh, setRefresh] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const gamesCollectionRef = collection(db, 'games');
  const startedGamesCollectionRef = collection(db, 'startedGames');
  const q = query(gamesCollectionRef, where('user', '==', user.uid));
  const q1 = query(startedGamesCollectionRef, where('user', '==', user.uid));

  useEffect(() => {
    getDocs(q).then((res1) => {
      const gamesFromResponse = res1.docs.map((doc) => ({ name: doc.data().name, id: doc.id }));
      setGames(gamesFromResponse);
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
        const filteredStartedGames = mergedStartedGames.filter((game) => {
          const now = new Date().getTime();
          const end = new Date(game.endDateTime).getTime();
          return now < end && game.gameName != 'NOT_FOUND';
        });
        setStartedGames(filteredStartedGames);
      });
    });
  }, [refresh]);

  const resetForms = () => {
    setGameName('');
    setGameDescription('');
    setStartedGameName('');
    setGameDateStart('');
    setGameDateEnd('');
  };

  const handleGameSubmit = async () => {
    if (gameName == '') {
      alert('Įveskite orientacinių varžybų pavadinimą');
      return;
    }
    if (games.find((game) => game.name == gameName) != null) {
      alert('Orientacinės varžybos su tokiu pavadinimu jau egzistuoja');
      return;
    }
    setLoading(true);
    try {
      await addDoc(gamesCollectionRef, {
        user: user.uid,
        name: gameName,
        description: gameDescription
      });
      alert('Orientacinės varžybos sėkmingai pridėtos');
    } catch (err) {
      alert(err.message);
    }
    handleAddClose();
    setRefresh(refresh + 1);
    setTab(0);
    resetForms();
    setLoading(false);
  };

  const handleGameStartSubmit = async () => {
    if (gameDateStart == '' || gameDateEnd == '' || startedGameName == '') {
      alert('Užpildykite orientacinių varžybų kambario duomenis');
      return;
    }
    const now = new Date().getTime();
    const startDate = new Date(gameDateStart).getTime();
    const endDate = new Date(gameDateEnd).getTime();
    if (startDate >= endDate || now >= endDate) {
      alert('Užpildykite orientacinių varžybų kambario duomenis teisingai');
      return;
    }
    setLoading(true);
    try {
      await addDoc(startedGamesCollectionRef, {
        user: user.uid,
        game: selectedId,
        name: startedGameName,
        startDateTime: gameDateStart,
        endDateTime: gameDateEnd,
        submissions: []
      });
      alert('Orientacinių varžybų kambarys sėkmingai sukurtas');
    } catch (err) {
      alert(err.message);
    }
    handleStartClose();
    setRefresh(refresh + 1);
    setTab(1);
    resetForms();
    setLoading(false);
  };

  const handleGameDelete = async () => {
    setLoading(true);
    try {
      const gameDoc = doc(db, 'games', selectedId);
      await deleteDoc(gameDoc);
      alert('Orientacinės varžybos sėkmingai pašalintos');
    } catch (err) {
      alert(err.message);
    }
    handleDeleteClose();
    setRefresh(refresh + 1);
    setLoading(false);
  };

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
            <Tab label={<Typography sx={{ color: '#1176AF' }}>Visos</Typography>} />
            <Tab label={<Typography sx={{ color: '#1176AF' }}>Vykstančios</Typography>} />
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
                <CustomCard key={game.id} background={'#D1D1D1'}>
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
                          color: '#1176AF',
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
                        sx={{ ml: '10px', borderRadius: '69px', backgroundColor: '#008724' }}
                        onClick={() => handleStartOpen(game.id)}>
                        <PlayArrowIcon />
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        sx={{ ml: '10px', borderRadius: '69px', backgroundColor: '#9540DF' }}
                        onClick={() => navigate('game/' + game.id)}>
                        <EditIcon sx={{ color: 'white' }} />
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        sx={{ ml: '10px', borderRadius: '69px', backgroundColor: '#e00000' }}
                        onClick={() => handleDeleteOpen(game.id)}>
                        <DeleteRoundedIcon />
                      </Button>
                    </Box>
                  </Box>
                </CustomCard>
              ))}
            {games.length === 0 && (
              <Box display="flex" flexDirection={'column'} alignItems="center">
                <img src="/logo_komposas2_square.png" width={'450px'} />
                <Typography component={'div'} variant="h5">
                  Orientacinių varžybų nėra
                </Typography>
                <Typography component={'div'} variant="h6">
                  Sukurkite pirmas savo orientacines varžybas spausdami + mygtuką ekrano dešinėje
                </Typography>
              </Box>
            )}
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <br />
            {startedGames.map((startedGame) => (
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
                    <Button
                      variant="contained"
                      sx={{ ml: '10px', borderRadius: '69px', backgroundColor: '#008724' }}
                      onClick={() => navigator.clipboard.writeText(startedGame.id)}>
                      <ContentCopyIcon />
                    </Button>
                  </Box>
                </Box>
              </CustomCard>
            ))}
            {startedGames.length === 0 && (
              <Box display="flex" flexDirection={'column'} alignItems="center">
                <img src="/logo_komposas2_square.png" width={'450px'} />
                <Typography component={'div'} variant="h5">
                  Orientacinių varžybų aktyvių kambarių nėra
                </Typography>
                <Typography component={'div'} variant="h6">
                  Sukurkite pirmą savo orientacinių varžybų kambarį spausdami žalią mygtuką
                  orientacinių sąraše
                </Typography>
              </Box>
            )}
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
            <Button
              color="error"
              variant="contained"
              autoFocus
              onClick={handleGameDelete}
              disabled={loading}>
              {loading ? <CircularProgress color="secondary" /> : 'Pašalinti'}
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
              focused
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
              focused
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
              Pridėti orientacinių varžybų kambarį
            </Typography>
          </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Orientacinių varžybų kambario pavadinimas"
              focused
              margin="dense"
              type="text"
              onChange={(event) => {
                setStartedGameName(event.target.value);
              }}
            />
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
              onClick={handleGameStartSubmit}
              disabled={loading}>
              {loading ? <CircularProgress color="secondary" /> : 'Pridėti'}
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
