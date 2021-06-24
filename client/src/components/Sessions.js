import {useState, useEffect} from 'react'
import axios from 'axios'

const Sessions = (props) => {
    const [sessions, setSessions] = useState();

    useEffect(() => {
        props.selectedDate.setDate(props.selectedDate.getDate() + 1);

        axios.get(`/api/rdvs/${2}/${props.selectedDate.toISOString().substring(0, 10)}`)
        .then(res => {
            let list = [];
                
            for (let i = 0; i < props.day.nbr_sessions; i++) {
                const d = new Date(props.selectedDate.toISOString().substring(0, 10)+':'+props.day.start_time);
                d.setMinutes(d.getMinutes() + i * props.sessionDuration);
                // console.log(isTaken(res.data.rdvs, d));
                if(isTaken(res.data.rdvs, d) === false) list.push(d);
            } 
            setSessions(list);
        });
    }, [props.selectedDate])


    const isTaken = (list, d) => {
        const c = new Date(d);
        c.setMinutes(c.getMinutes() - 60);
        let exist = false;
        list.forEach(element => {
            if(element.time_rdv === d.toISOString()) exist = true;
        });
        return exist;
    }    

    return (
        <div className="block sessions">
            <h1>Pick a session :</h1>
            {
                sessions?
                sessions.map((s, index) => 
                    <div className="session" key={index} onClick = {() => {props.handlePick(s);}}>
                        {s.toTimeString().substring(0, 5)}  
                    </div>
                )
                :
                'loading...'
            }
        </div>
    )
}

export default Sessions