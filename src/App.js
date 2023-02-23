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

  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      setUser({ token, userId });
    }
  }, []);

   const handleLogin = (token, userId) => {
      setUser({ token: token, userId: userId })
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
   }

  return (
    <AnimatePresence>
        <BrowserRouter>
          <Routes>
          <Route path='/login' element={ <Login handleLogin={handleLogin} /> } />
            <Route path='/' element={ <Login handleLogin={handleLogin} /> } />
            <Route path='/home' element={ <Home user={user} /> }/>
            <Route path='/user' element={ <User user={user} /> } />
            <Route path='/store' element={ <Store user={user} /> } />
            <Route path='/mystore' element={ <MyStore auth={user} /> } />
            <Route path='/product/:id' element={ <Product user={user} /> } />
            <Route path='/service/:id' element={ <Service user={user} /> } />
            <Route path='/products' element={ <Products user={user}/> } />
            <Route path='/services' element={ <Services user={user} /> } />
          </Routes>
        </BrowserRouter>
    </AnimatePresence>
  );
}

export default App;
