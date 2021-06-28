import { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import axios from 'axios'
import Appointment from '../components/Appointment'
import { Fragment } from 'react'
import Navbar from '../components/Navbar'
import 'moment/locale/fr'
import Return from '../components/Return'

const localizer = momentLocalizer(moment)
moment.locale('fr') 

const DoctorCalendar = (props) => {
    const [state, setstate] = useState({
        selected: false, 
        day: null, 
        monthList : [], 
        dayList: [],
        workDays: []
    });

    useEffect(() => {
        axios.get('/api/rdvs/2')
        .then(res => res.data)
        .then(data => {
            const list = [];
            data.rdvs.forEach(rdv => {
                const ds = moment(rdv.time_rdv);
                const de = moment(rdv.time_rdv).add(data.sessionDuration, 'm')
                let e = {
                    title: `${rdv.firstname} ${rdv.lastname}`,
                    start: ds,
                    end: de,
                    allDay: false,
                    resource: {},
                }
                list.push(e)
            });
            setstate({...state, monthList: list, sessionDuration: data.sessionDuration, workDays: data.workDays});
        })        
    },[])

    const select = (day) => {
        const list = state.monthList.filter(d => moment(d.start).isSame(day, 'day'));
        setstate({...state, day: day, dayList: list, selected: true});
    }

    return (
        <div className = 'doctor-calendar'>
            <Return url='/' name='Calendrier de rendez vous' />
            {
                state.selected === true?
                <div className='container'>
                    <h3 className='title'> Les rendez-vous de {moment(state.day).format("dddd,Do MMMM  YYYY")} </h3>
                    <div className='rdvs'>
                        {
                            state.dayList.map(r => 
                                <Appointment 
                                    start = {r.start} 
                                    title = {r.title}
                                />
                            )
                        }
                    </div>
                </div>
                :
                <div className='container'>
                    <Calendar
                    selectable
                    defaultDate = {new Date()}
                    localizer={localizer}
                    events={state.monthList}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    defaultView = 'month'
                    views = {{
                        month: true,
                    }}
                    onSelectEvent={event => {select(event.start) } }
                    />
                </div>
            }
           
        </div>
    )
}

export default DoctorCalendar
