import * as React from 'react'
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import User from './pages/User/User'
import Product from './pages/Product/Product'
import Service from './pages/Service/Service'
import Products from './pages/Products/Products'
import Services from './pages/Services/Services'
import Store from './pages/Store/Store'
import MyStore from './pages/MyStore/MyStore'
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
            <Route path='/user' element={ <User/> } />
            <Route path='/store' element={ <Store/> } />
            <Route path='/mystore' element={ <MyStore/> } />
            <Route path='/product/:id' element={ <Product/> } />
            <Route path='/service/:id' element={ <Service/> } />
            <Route path='/products' element={ <Products/> } />
            <Route path='/services' element={ <Services/> } />
          </Routes>
        </BrowserRouter>
    </AnimatePresence>
  );
}

export default App;
