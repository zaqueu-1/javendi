import * as React from 'react'
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import User from './pages/User/User'
import Product from './pages/Product/Product'
import Service from './pages/Service/Service'
import Store from './pages/Store/Store'
import NewSell from './pages/NewSell/NewSell'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

function App() {

  return (
    <AnimatePresence>
        <BrowserRouter>
          <Routes>
            <Route path='/home' element={ <Home/> } />
            <Route path='/login' element={ <Login /> } />
            <Route path='/' element={ <Login /> } />
            <Route path='/user/:id' element={ <User/> } />
            <Route path='/store/:id' element={ <Store/> } />
            <Route path='/product/:id' element={ <Product/> } />
            <Route path='/service/:id' element={ <Service/> } />
            <Route path='/newsell' element={ <NewSell/> } />
          </Routes>
        </BrowserRouter>
    </AnimatePresence>
  );
}

export default App;
