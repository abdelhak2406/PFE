import { useState, useEffect } from 'react'
import ReactCalendar from 'react-calendar'
import Sessions from './Sessions'

const Calendar = (props) => {
    const [weekDays, setWeekDays] = useState([]);
    const [selectedDay, setSelectedDay] = useState();
    const [rdv, setRdv] = useState();


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
        s.setHours(s.getHours() + 1)
        // console.log(new Date(s).toISOString());
        console.log(s.toISOString().slice(0, 19).replace('T', ' '));
        // let d = props.day.day;
        // d.setTime(d.getTime + s);
        // console.log(d.toISOString());
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
        </div>
    )
}

export default Calendar
