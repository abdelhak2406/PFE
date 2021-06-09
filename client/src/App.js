import Card from "./components/Card";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "./App.css";
import {useState, useEffect} from "react";
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel'
import Search from './pages/Search'
import Home from './pages/Home'
import Specialities from './components/Specialities'

const App = () => {
  const [date, setDate] = useState(new Date());
  var [nom, setNom] = useState();


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
