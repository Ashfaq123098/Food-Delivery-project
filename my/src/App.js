import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter ,Routes, Route} from 'react-router-dom';
import Header from './components/Header/Header'; 
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
const App = ()  =>{
  return (
    <BrowserRouter>
    <div className='app'>
      <Navbar/>
       <Header />
      <Routes>
        <Route path='/' element={<Home/>} />
      </Routes>
      <Footer/>
    </div>
    
    </BrowserRouter>
  )
}
export default App
