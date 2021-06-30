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
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Profile = (props) => {
    const [doctor, setDoctor] = useState();
    const [showCalendar, setShowCalendar] = useState(false);
    const [alert, setAlert] = useState(false);
    const {id} = useParams();
    useEffect(()=>{
        axios(`/api/doctors/${id}`)
        .then(res => {setDoctor(res.data.doctor)})
        .catch(err => console.log(err));
    }, [])

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
                <h5>{doctor.speciality_name}</h5>
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
                    <Calendar id_doctor={id} sessionDuration = {doctor.session_duration} workDays = {doctor.workDays} />   
                </div>
                :
                <div className="container">
                    <div className="block">
                        <h2 className='title'>Adresse</h2>
                        <p>Bab Ezzouar Alger.......</p>
                    </div>
                    <br/>
                    <h2 className='title'>Horaires d'ouverture</h2>
                    <Table sessionDuration = {doctor.session_duration} workDays = {doctor.workDays} />  
                    <br/>
                    <h2 className='title'>Photos</h2> 
                </div>
            }
            <br/>
            <Carousel />
            <br/>
            <div className="rdv-btn">
                <button onClick = {toggleCalendar} > {showCalendar? 'Profile': 'PRENEZ RENDEZ-VOUS' } </button>
            </div>
            
        </div>
        :
        'loading ...'
    )
}

export default Profile;