import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar'
import User from './User';
import { Routes,Route,Link} from "react-router-dom";
import UserCreate from './UserCreate';
import UserEdit from './UserEdit';
function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
      <Route path="/" element={ <User/>}/>
      <Route path="create" element={<UserCreate/>} />
      <Route path="edit/:id" Component={UserEdit} />
      </Routes>
    </div>
  );
}

export default App;
