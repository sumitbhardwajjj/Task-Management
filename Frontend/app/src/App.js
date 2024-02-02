import React from 'react'
import './App.css'
import Home from './component/homePage/Home'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from "./component/login/Login"
import Signup from './component/login/Signup'
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <div className='App'>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/home' element={<Home/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
