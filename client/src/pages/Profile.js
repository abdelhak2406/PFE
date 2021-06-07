import {FiPhone} from "react-icons/fi";
import { HiLocationMarker } from 'react-icons/hi';
import { FiMessageCircle } from 'react-icons/fi';
import Save from '../components/Save'
import Carousel from '../components/Carousel'
import Calendar from 'react-calendar'
import Navbar from '../components/Navbar'

function Profile() {
    return (
        <div className="profile">
            <Navbar />
            <div className="header block"> 
                <Save saved = {false} />
                <div className="image"><img src="../assets/avatar.jpg" alt=""/></div>
                <h1 className="name">Nom Prenom</h1>
                <h6>Dentiste</h6>
                <div className="icons">
                    <div><FiPhone color="#fff" size="1.5em" /></div>
                    <div><FiMessageCircle color="#fff" size="1.5em" /></div>
                    <div><HiLocationMarker color="#fff" size="1.5em" /></div>
                </div>
            </div>

            <div className="container">
                <div className="block">
                    <h2>Adresse</h2>
                    <p>Bab Ezzouar Alger.......</p>
                </div>
                <h2>Horaires d'ouverture</h2>

                <div className="table">
                    <div className="row t-head">
                        <div className="left-edge"></div>
                        <div className="title">Morning</div>
                        <div className="title right-edge">Evening</div>
                    </div>
                    <div className="row">
                        <div className="title">Sat</div>
                        <div>8:00-12:00</div>
                        <div></div>
                    </div>
                    <div className="row">
                        <div className="title">Sat</div>
                        <div>8:00-12:00</div>
                        <div></div>
                    </div>
                    <div className="row">
                        <div className="title">Sat</div>
                        <div>8:00-12:00</div>
                        <div></div>
                    </div>
                    <div className="row">
                        <div className="title">Sat</div>
                        <div>8:00-12:00</div>
                        <div></div>
                    </div>
                    <div className="row">
                        <div className="title">Sat</div>
                        <div>8:00-12:00</div>
                        <div></div>
                    </div>
                    <div className="row">
                        <div className="title">Sat</div>
                        <div>8:00-12:00</div>
                        <div></div>
                    </div>
                    
                </div>
                    
            
                <h2>Photos</h2>
                <Carousel />
                
                {/* <Calendar /> */}
            </div>
            <div className="rdv-btn"><button>PRENEZ RENDEZ-VOUS</button></div>
            
        </div>
    )
}

export default Profile;