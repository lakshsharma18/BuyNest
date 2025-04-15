import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import Vintage from './Components/Vintage';
import Marble from './Components/Marble';
import Maximalist from './Components/Maximalist';
import Jumpers from './Components/Jumpers';
import Arts from './Components/Arts';
import Gifts from './Components/Gifts';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { Toaster } from "react-hot-toast";
import SearchRes from './Components/SearchRes';
import NotFound from './Components/NotFound';
import Cart from './Components/Cart';
import CheckoutSuccess from './Components/CheckoutSuccess';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navbar />}></Route>
        <Route path='/vintage' element={<Vintage />}></Route>
        <Route path='/marble' element={<Marble />}></Route>
        <Route path='/maximalist' element={<Maximalist />}></Route>
        <Route path='/jumpers' element={<Jumpers />}></Route>
        <Route path='/arts' element={<Arts />}></Route>
        <Route path='/gifts' element={<Gifts />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/search' element={<SearchRes />}></Route>
        <Route path='*' element={<NotFound />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/checkout-success' element={<CheckoutSuccess />}></Route>
      </Routes>
      <Toaster />

    </>
  )
}

export default App;
