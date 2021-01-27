import React from "react";
import {BrowserRouter} from 'react-router-dom';
import Navbar from "./Navbar"
import Routes from "./Routes"
import './styles/App.css';
import UserProvider from "./UserProvider"
import 'bootstrap/dist/css/bootstrap.min.css';

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
