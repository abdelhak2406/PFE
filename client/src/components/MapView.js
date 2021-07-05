import { useState } from 'react'
import {useMapEvents, MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
L.Icon.Default.imagePath='leaflet_images/';


const MapView = () => {
    const [state, setstate] = useState({position: [51.505, -0.09], map: null});
    const [toggle, setToggle] = useState(false);
    const getLocation = (e) => {
        console.log(e);
    } 
    return (
        toggle?
        <div id='location'>
                <MapContainer 
                    center={state.position} zoom={13} 
                    scrollWheelZoom={true} 
                    whenCreated = {map => setstate({...state, map})}
                    onClick = {()=>{console.log('hhh');}}
                    
                >
                    
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={state.position}>
                        <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        :
        <span onClick={()=>{setToggle(true)}}>Map</span>
    )
}

export default MapView