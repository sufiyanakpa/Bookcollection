import { useState } from 'react'
import { Route,Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Log from './pages/Log';
import Reg from './pages/Reg';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from './pages/Dashboard';
import Addbook from './pages/Addbook';
import Edit from './pages/Edit';

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    
  <>
    <Header/>
     <Routes>
       <Route path='/' element={<Log/>}/>
       <Route path='/reg' element={<Reg/>}/>
       <Route path='/dash' element={<Dashboard/>}/>
       <Route path='/book' element={<Addbook/>}/>
       <Route path='/edit/:id' element={<Edit/>}/>

       

     </Routes> 
    <Footer/> 
    <ToastContainer/>
  </>
  )
}

export default App
