import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "./App.css";
import {useState, useEffect} from "react";
import Profile from './pages/Profile';
import Navbar from './components/Navbar';

import Search from './pages/Search'
import Home from './pages/Home'
import Login from './pages/Login'
const App = () => {
  const [date, setDate] = useState(new Date());

  return (
    <Login />
    // <Home />
    // <Search />
    // <Navbar />
    // <Profile id={1} />
    // <Calendar />

    
  );
}

export default App;
