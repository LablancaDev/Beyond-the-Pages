import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Cart from '../pages/Cart'
import Profile from '../pages/Profile'

const Myroutes = () => {
  return (
    
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='*' element={<Home />} /> 
    </Routes>
  );
}

export default Myroutes

