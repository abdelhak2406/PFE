import {useState, useEffect} from 'react'
import {FiPhone} from "react-icons/fi";
import { HiLocationMarker } from 'react-icons/hi';
import { FiMessageCircle } from 'react-icons/fi';
import Save from '../components/Save'
import Carousel from '../components/Carousel'
import Navbar from '../components/Navbar'
import Table from '../components/Table'
import Calendar from '../components/Calendar'

function Profile() {
    var [showCalendar, setShowCalendar] = useState(false);

    const toggleCalendar = (e) => {
        e.preventDefault();
        setShowCalendar(!showCalendar)
    }
    return (
        <div className="profile">
            <Navbar />
            <div className="header block"> 
                <Save saved = {false} />
                <div className="image"><img src="../assets/avatar.jpg" alt=""/></div>
                <h1 className="name">Nom Prenom</h1>
                <h6>Dentiste</h6>
                <div className="icons">
                    <div><FiPhone color="#fff" size="1.5em" /></div>
                    <div><FiMessageCircle color="#fff" size="1.5em" /></div>
                    <div><HiLocationMarker color="#fff" size="1.5em" /></div>
                </div>
            </div>
            {
                showCalendar? 
                <div className="container">
                    <Calendar />
                </div>
                :
                <div className="container">
                    <div className="block">
                        <h2>Adresse</h2>
                        <p>Bab Ezzouar Alger.......</p>
                    </div>
                    <h2>Horaires d'ouverture</h2>
                    <Table />  
                
                    <h2>Photos</h2>
                    <Carousel titre="titre"/>
                </div>
            }
            

            
            <div className="rdv-btn">
                <button onClick = {toggleCalendar} > {showCalendar? 'RETURN TO PROFILE': 'PRENEZ RENDEZ-VOUS' } </button>
            </div>
            
            
        </div>
    )
}

export default Profile;