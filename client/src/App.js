import 'react-calendar/dist/Calendar.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import "./App.css"
import 'leaflet/dist/leaflet.css';
import {useState, useEffect} from "react"
import Profile from './pages/Profile'
import Search from './pages/Search'
import Home from './pages/Home'
import Login from './pages/Login'
import DoctorCalendar from "./pages/DoctorCalendar"
import Chat from './pages/Chat'
import axios from 'axios'
import Location from './components/Location'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom"
import Register from './pages/Register'
import DoctorRegister from './pages/DoctorRegister';


const App = () => {
  const [state, setstate] = useState({
    isLoggedin: false, 
    loading: true,
    token: localStorage.getItem('PFE_ACCESS_TOKEN')
  });
  useEffect(() => {
    if(state.token){
      axios.get('/api/user', {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('PFE_ACCESS_TOKEN')}`
        }
      })
      .then(res => {
        if(res.data.user) {
          localStorage.setItem('id_user', res.data.user.id_user);
          setstate({loading: false, isLoggedin: true})
        }
        else setstate({...state, loading: false}) 
      })
    }
    else setstate({isLoggedin: false, loading: false})
  }, [])


  const login = (token) => {
    localStorage.setItem('PFE_ACCESS_TOKEN',token);
    // setstate({...state, token})
    window.location.reload()
  }

  return (
    state.loading?
    <h1>Loading...</h1>
    :  
    <Router>
      {
        state.isLoggedin?
        <Switch >
          <Route exact path='/map'>
            <Location />
          </Route>
          <Route exact path = '/doctor-calendar'>
            <DoctorCalendar />
          </Route>
          <Route exact path = '/search'>
            <Search />
          </Route>
          <Route exact path ='/profile/:id'>
            <Profile />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
        :
        <Switch>
          <Route exact path='/home'>
            <Home />
          </Route>
          <Route exact path='/map'>
            <Location />
          </Route>
          <Route exact path ='/register'>
            <Register />
          </Route>
          <Route exact path ='/doctor-register'>
            <DoctorRegister />
          </Route>
          <Route exact path = '/login'>
            <Login login={login} />
          </Route>
          <Route path='/' >
            <Redirect to = '/login' />
          </Route>
        </Switch>
      }
      
  </Router>
  
  );
}

export default App;
