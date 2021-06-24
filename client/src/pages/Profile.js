import {useState, useEffect} from 'react'
import {FiPhone} from "react-icons/fi"
import { HiLocationMarker } from 'react-icons/hi'
import { FiMessageCircle } from 'react-icons/fi'
import Save from '../components/Save'
import Carousel from '../components/Carousel'
import Navbar from '../components/Navbar'
import Table from '../components/Table'
import Calendar from '../components/Calendar'
import Alert from '../components/Alert'

const Profile = (props) => {
    const [doctor, setDoctor] = useState();
    const [showCalendar, setShowCalendar] = useState(false);
    const [alert, setAlert] = useState(false);
    
    useEffect(()=>{
        fetch(`/api/doctors/${props.id}`)
        .then(res => res.json())
        .then(data => {setDoctor(data.doctor); console.log(data.doctor);})
        .catch(err => console.log(err));
    }, [props.id])

    const toggleCalendar = (e) => {
        e.preventDefault();
        setShowCalendar(!showCalendar)
    }

    const toggleAlert = () => {
        setAlert(!alert);
    }

    return (
        doctor?
        <div className="profile">
            <Navbar />  
            { alert? <Alert msg='Phone copied to the Clipboard.' toggle = {toggleAlert} /> : '' }
            <div className="header block"> 
                <Save saved = {false} />
                <div className="image"><img src={doctor.photo} alt=""/></div>
                <h1 className="name"> { `${doctor.firstname} ${doctor.lastname} ` } </h1>
                <h6>{doctor.speciality_name}</h6>
                <div className="icons">
                    <div onClick={() => {navigator.clipboard.writeText(doctor.work_phone); toggleAlert(); }}>
                        <FiPhone color="#fff" size="1.5em" />
                    </div>
                    <div><FiMessageCircle color="#fff" size="1.5em" /></div>
                    <div><HiLocationMarker color="#fff" size="1.5em" /></div>
                </div>
            </div>

            {
                showCalendar?
                <div className="container">
                    <Calendar sessionDuration = {doctor.session_duration} workDays = {doctor.workDays} />   
                </div>
                :
                <div className="container">
                    <div className="block">
                        <h2>Adresse</h2>
                        <p>Bab Ezzouar Alger.......</p>
                    </div>
                    <br/>
                    <h2>Horaires d'ouverture</h2>
                    <Table sessionDuration = {doctor.session_duration} workDays = {doctor.workDays} />  
                    <br/>
                    <h2>Photos</h2>
                    <Carousel titre="titre"/>
                </div>
            }
            
            <div className="rdv-btn">
                <button onClick = {toggleCalendar} > {showCalendar? 'RETURN TO PROFILE': 'PRENEZ RENDEZ-VOUS' } </button>
            </div>
            
        </div>
        :
        'loading ...'
    )
}

export default Profile;