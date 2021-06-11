import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "./App.css";
import {useState, useEffect} from "react";
import Profile from './pages/Profile';
import Navbar from './components/Navbar';

import Search from './pages/Search'
import Home from './pages/Home'

const App = () => {
  const [date, setDate] = useState(new Date());

  return (
    // <Specialities />
    // <Home />
    // <Search />
    // <Navbar />
    <Profile />
    // <Calendar />
    
  );
}

export default App;
