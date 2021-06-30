import { useState, useEffect } from 'react'
import ReactCalendar from 'react-calendar'
import Sessions from './Sessions'
import axios from 'axios'
import Alert from './Alert'

const Calendar = (props) => {
    const [weekDays, setWeekDays] = useState([]);
    const [selectedDay, setSelectedDay] = useState();
    const [rdv, setRdv] = useState();
    const [alert, setAlert] = useState({show: false, msg: ''});


    useEffect(()=>{
        let list = [];
        props.workDays.map(day => list.push(day.day_number));
        setWeekDays(list)
    }, [props.workDays]);

    const selectDay = (selectedDate) => {
        const day = props.workDays.filter(d => d.day_number === selectedDate.getDay() )[0];
        setSelectedDay({selectedDate, day});
    }


    const handlePick = (s) =>{
        s.setHours(s.getHours() + 1);
        let id_patient = localStorage.getItem('id_user');
        axios.post('/api/rdvs', {
            id_doctor: props.id_doctor,
            id_patient,
            time_rdv: s.toISOString().slice(0, 19).replace('T', ' ')
        })
        .then(res => {
            if(res.data.done) {
                setAlert({msg: 'Waiting for the doctor confirmation..', show: true})
                setSelectedDay();
            }
            else setAlert({msg: res.data.msg, show: true})
        }
        );
    }

    const toggleAlert = () => {
        setAlert({...alert, show: !alert.show});
    }
    return (
        <div>
            <ReactCalendar 
                calendarType='Arabic' 
                minDate = {new Date()}
                maxDate = { new Date(new Date().getFullYear(), new Date().getMonth() +1, new Date().getDate())}
                tileDisabled = {({date}) => !weekDays.includes(date.getDay())}
                onClickDay = {(value, event) => {selectDay(value)}}
            />
            {
                 selectedDay?
                 <Sessions 
                    id_doctor = {props.id_doctor}
                    handlePick = {handlePick} 
                    selectedDate = {selectedDay.selectedDate}
                    day = { selectedDay.day } 
                    sessionDuration = {props.sessionDuration} 
                    setRdv = {setRdv} />   
                :''      
            }   
            {
                alert.show? <Alert msg = {alert.msg} toggle = {toggleAlert} /> : ''
            }
        </div>
    )
}

export default Calendar
