import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom"
import AboutUs from './components/AboutUs'
import Contacts from './components/Contacts'
import Faq from './components/Faq'
import Home from './components/Home'
import Reviews from './components/Reviews'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import GameCode from './components/GameCode'
import Dashboard from './components/Dashboard'


export default function router() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/reviews" element={<Reviews/>} />
        <Route path="/faq" element={<Faq/>} />
        <Route path="/contacts" element={<Contacts/>} />
        <Route path="/gamecode" element={<GameCode/>} />
        <Route path="/creator" element={<Dashboard/>} />
      </Routes>
    </Router>
  )
}
