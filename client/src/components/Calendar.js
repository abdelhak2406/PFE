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
        // setSelectedDay({...props.workDays.filter(elm => {return elm.day_number === day.getDay()})[0], day: day});
    }


    const handlePick = (s) =>{
        // new Date().setHours()
        s.setHours(s.getHours() + 1);
        // console.log(new Date(s).toISOString());
        // console.log(new Date(s.toISOString().slice(0, 19).replace('T', ' ')));

        axios.post('/api/rdvs', {
            id_doctor: 2,
            id_patient: 4,
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
