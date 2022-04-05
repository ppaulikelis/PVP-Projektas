import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom"
import AboutUs from './components/home/AboutUs'
import Contacts from './components/home/Contacts'
import Faq from './components/home/Faq'
import Home from './components/home/Home'
import Reviews from './components/home/Reviews'
import SignIn from './components/home/SignIn'
import SignUp from './components/home/SignUp'
import GameCode from './components/home/GameCode'
import Dashboard from './components/creator/Dashboard'
import { useAuthContext } from './contexts/AuthContext'


const AppRouter = () =>{
  const { user } = useAuthContext()

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/reviews" element={<Reviews/>} />
        <Route path="/gamecode" element={<GameCode/>} />
        <Route path="/faq" element={<Faq/>} />
        <Route path="/contacts" element={<Contacts/>} />
        {!user && (
          <>
            <Route path="/signin" element={<SignIn/>} />
            <Route path="/signup" element={<SignUp/>} />
          </>
        )}
        {user && (
          <>
            <Route path="/creator" element={<Dashboard/>} />
          </>
        )}
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </Router>
  )
}
export default AppRouter
