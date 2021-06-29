import 'react-calendar/dist/Calendar.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import "./App.css"
import {useState, useEffect} from "react"
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import Search from './pages/Search'
import Home from './pages/Home'
import Login from './pages/Login'
import DoctorCalendar from "./pages/DoctorCalendar"
import Chat from './pages/Chat'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"


const App = () => {
  const [date, setDate] = useState(new Date());

  return (
    <Router>
      <Switch >
        <Route exact path ='/chat'> 
           <Chat/>
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path = '/doctor-calendar'>
          <DoctorCalendar />
        </Route>
        <Route exact path = '/search'>
          <Search />
        </Route>
        <Route exact path ='/profile'>
          <Profile id={1} />
        </Route>
     </Switch>
    </Router>
  
  );
}

export default App;
