import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import About from './pages/About';
import SellerDashboard from './pages/SellerDashboard';
import Product from './pages/Product';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';
import Search from './pages/Search';
import { useEffect } from 'react';
import Thankyou from './pages/Thankyou';

export default function App() {
  useEffect(() => {
    // Load Botpress Web Chat Scripts
    const loadBotpressScripts = () => {
      const script1 = document.createElement('script');
      script1.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js';
      document.body.appendChild(script1);

      const script2 = document.createElement('script');
      script2.src = 'https://mediafiles.botpress.cloud/7fd9885a-7ebe-4895-966d-04b29094fd67/webchat/config.js';
      script2.defer = true;
      document.body.appendChild(script2);

      return () => {
        document.body.removeChild(script1);
        document.body.removeChild(script2);
      };
    };

    const cleanup = loadBotpressScripts();

    return () => {
      cleanup();
    };
  }, []);
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/sign-in' element={<SignIn/>} />
      <Route path='/sign-up' element ={<SignUp/> }/>
      <Route path='/about' element={<About/>} />
      <Route path='/search' element={<Search />} />
      <Route path='/listing/:listingId' element={<Listing/>} />
      <Route path='/thankyou' element={<Thankyou/>} />

      <Route element={<PrivateRoute/>}>
      <Route path='/sellerdashboard' element={<SellerDashboard/> }/>
      <Route path='/product' element={<Product/> }/>
        <Route path='/profile' element={<Profile/> }/>
        <Route path='/create-listing' element={<CreateListing />} />
        <Route path='/update-listing/:listingId' element={<UpdateListing />} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}
