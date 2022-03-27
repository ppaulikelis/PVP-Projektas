import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
import AboutUs from './components/AboutUs';
import Contacts from './components/Contacts';
import Faq from './components/Faq';
import Home from './components/Home';
import Reviews from './components/Reviews';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';


export default function router() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/signin" element={<SignIn/>} />
          <Route exact path="/signup" element={<SignUp/>} />
          <Route exact path="/about" element={<AboutUs/>} />
          <Route exact path="/reviews" element={<Reviews/>} />
          <Route exact path="/faq" element={<Faq/>} />
          <Route exact path="/contacts" element={<Contacts/>} />
        </Routes>
      </Router>
  )
}
