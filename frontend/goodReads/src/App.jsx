import { useState } from 'react'
import Header from './components/Header/header'
import Footer from './components/Footer/Footer'
import './App.css'
import Home from './pages/Home'
import {BrowserRouter  ,Routes,Route } from "react-router-dom"
import AllBooks from './pages/AllBooks'
import Login from './pages/Login'
import Signup from './pages/SignUp/Signup'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import BookDetails from './pages/BookDetails'
import SearchResult from './pages/SearchResult'
import NotFound from './pages/NotFound'
function App() {


  return (
    <>

    <BrowserRouter>

    <Header/>
    
    <Routes>
     <Route exact path='/' element={<Home/>}></Route>
     <Route  path='/allbooks' element={<AllBooks/>}></Route>
     <Route  path='/BookDetails/:id' element={<BookDetails/>}></Route>
     {/* <Route  path='/login' element={<Login/>}></Route> */}
     <Route  path='/signup' element={<Signup/>}></Route>
     <Route  path='/cart' element={<Cart/>}></Route>
     <Route  path='/profile' element={<Profile/>}></Route>
     <Route path="/search/:query" element={<SearchResult />} />


     <Route path="*" element={<NotFound />} />
    </Routes>

    <Footer/>
    </BrowserRouter>

      
    </>
  )
}

export default App
