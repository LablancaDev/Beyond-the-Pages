import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Cart from '../pages/Cart'
import Profile from '../pages/Profile'
import PurchaseComplete from '../pages/PurchaseComplete'
import BookDetail from '../pages/BookDetail'

const Myroutes = () => {
  return (

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/purchaseComplete' element={<PurchaseComplete />} />
      <Route path='/bookdetail' element={<BookDetail />} />
      <Route path='*' element={<Home />} />
    </Routes>
  );
}

export default Myroutes

