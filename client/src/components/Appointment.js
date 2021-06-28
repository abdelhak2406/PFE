const Appointment = (props) => {
    return (
        <div className= 'rdv'>
            <div className='top'>
                <h3> { props.title.toUpperCase() } </h3>
            </div>
            <div className = 'bottom'>
                <div>
                    <p>Date rendez-vous</p>
                    <h4> {props.start.format("ddd Do MMMM")} </h4>
                </div>
                <div>
                    <h2> {props.start.format("hh:mm")} </h2>
                </div>
            </div>
        </div>
    )
}

export default Appointment