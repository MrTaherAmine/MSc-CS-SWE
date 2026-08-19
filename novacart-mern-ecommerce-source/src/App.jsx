import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import Header from './components/Header';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import About from './pages/About';

export default function App(){
  return (
    <StoreProvider>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/product/:id" element={<Product/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/success" element={<Success/>}/>
          <Route path="/about" element={<About/>}/>
        </Routes>
        <footer><div className="shell"><b>NovaCart</b><span>Full E-Commerce Website Project · Taher Amine ELHOUARI · 2026</span></div></footer>
      </BrowserRouter>
    </StoreProvider>
  );
}
