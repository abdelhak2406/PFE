import {useState, useEffect} from 'react'

const Table = (props) => {
    const dayNames = ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'];
    const [state , setState ] = useState()

    useEffect(() => {
        var list = props.workDays;
        list.map(day => {
            let d = new Date('2021-06-14 '+day.start_time);
            d.setTime(d.getTime() +day.nbr_sessions * props.sessionDuration*60*1000)
            day.end_time = d.toTimeString().substring(0, 5);
        })
        setState(list);
    }, [props.workDays])
    return (
        <div className="table">
            <div className="row t-head">
                <div className="left-edge"></div>
                <div className="title">Morning</div>
                <div className="title right-edge">Evening</div>
            </div>
            {
                props.workDays.map(day => 
                    <div className="row">
                        <div className="title">{dayNames[day.day_number]}</div>
                        <div> { `${day.start_time.substring(0, day.start_time.length-3)} - ${ day.end_time }` } </div>
                        <div></div>
                    </div>
                )
            }
            
        </div>
    )
}

export default Table
