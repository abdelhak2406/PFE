import {FaMapMarkerAlt} from 'react-icons/fa';

const Card = (props) => {
    
    return (
        <div className="block card">
            <div className="image">
                <img src = {props.photo} alt="user" />
            </div>
            <div className="text">
                <h1 className="name">{props.firstname} {props.lastname} </h1>
                <h2>{props.speciality_name}</h2>
                <span> <FaMapMarkerAlt />{props.wilaya.toUpperCase()}</span>
            </div>

        </div>
    );
}

export default Card;