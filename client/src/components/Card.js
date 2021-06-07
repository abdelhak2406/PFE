import {FaMapMarkerAlt} from 'react-icons/fa';

const Card = () => {
    return (
        <div className="block card">
            <div className="image">
                <img src="../assets/avatar.jpg" alt="user" />
            </div>
            <div className="text">
                <h1 className="name">Aymen GHEMAM HAMED</h1>
                <h2>Generaliste</h2>
                <span> <FaMapMarkerAlt />Alger</span>
            </div>

        </div>
    );
}

export default Card;