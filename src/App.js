import React from "react";
import {BrowserRouter} from 'react-router-dom';
import Navbar from "./Navbar"
import Routes from "./Routes"
import './styles/App.css';
import UserProvider from "./UserProvider"

function App() {
  return (<BrowserRouter>
    <div className="App">
      <UserProvider >
      <Navbar />
      <Routes />
      </UserProvider>
    </div>
  </BrowserRouter>
  )
}

export default App;
