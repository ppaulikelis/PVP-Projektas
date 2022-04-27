import {
  Box,
  Button,
  Card,
  CardContent,
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
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { db } from '../../firebase';
import { collection, getDocs, addDoc, doc, deleteDoc, query, where } from 'firebase/firestore';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function GameList() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [tab, setTab] = useState(0);
  const [selectedId, setSelectedId] = useState(-1);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [games, setGames] = useState([{}]);
  const [gameName, setGameName] = useState('');
  const [gameDescription, setGameDescription] = useState('');
  const [refresh, setRefresh] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const gamesCollectionRef = collection(db, 'games');
  const q = query(gamesCollectionRef, where('user', '==', user.uid));

  const resetForm = () => {
    setGameName('');
    setGameDescription('');
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
    resetForm();
    setLoading(false);
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
    getGames();
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

  return (
    <>
      <Container maxWidth="md">
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
                Orientacinės
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
      <Card sx={{ mt: 5, borderRadius: '48px' }}>
        <CardContent
          sx={{
            background: 'linear-gradient(180deg, #55B0D5 0%, #1176AF 71.35%)'
          }}>
          <Box py={2} px={2}>
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
                          <IconButton sx={{ color: 'mediumSpringGreen' }}>
                            <PlayCircleFilledRoundedIcon sx={{ fontSize: 32 }} />
                          </IconButton>
                          <IconButton
                            onClick={() => navigate('game/' + game.id)}
                            sx={{ color: '#FFB30F' }}>
                            <EditIcon sx={{ fontSize: 32 }} />
                          </IconButton>
                          <IconButton
                            sx={{ color: 'red' }}
                            onClick={() => handleDeleteOpen(game.id)}>
                            <DeleteRoundedIcon sx={{ fontSize: 32 }} />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
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
              Tab2
            </TabPanel>
          </Box>
        </CardContent>
      </Card>
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
              Ar tikrai norite pašalinti orientacinių įrašą?
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
              Naujos orientacinės
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
    </>
  );
}

function TabPanel(props) {
  const { children, value, index } = props;
  return <div>{value === index && children}</div>;
}
