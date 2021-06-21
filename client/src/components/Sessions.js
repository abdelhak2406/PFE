import {useState, useEffect} from 'react'

const Sessions = (props) => {
    const [sessions, setSessions] = useState();

    useEffect(() => {
        
        let list = [];
        const d = new Date(props.selectedDate.toISOString().substring(0, 10)+':'+props.day.start_time);
        d.setDate(d.getDate() + 1);
        list.push(new Date(d));
        for (let i = 1; i < props.day.nbr_sessions; i++) {
            d.setMinutes(d.getMinutes() + props.sessionDuration)
            list.push(new Date(d));
        } 
        setSessions(list);
    }, [props.day])

    
    return (
        <div className="block sessions">
            <h1>Pick a session :</h1>
            {
                sessions?
                sessions.map((s, index) => 
                    <div className="session" key={index} onClick = {() => props.handlePick(s)}>
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