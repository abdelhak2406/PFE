import { useState, useEffect } from 'react'
import {useMapEvents, MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
L.Icon.Default.imagePath='leaflet_images/';


const Location = () => {
    const [state, setstate] = useState({position: [51.505, -0.09], map: null})

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };
    function success(pos) {
        var crd = pos.coords;
        
        console.log("Your current position is:");
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        setstate({...state, position:[crd.latitude, crd.longitude]});
        console.log(state);

        const {map} = state;
        if(map) map.flyTo(state.position)
    }
    
    function errors(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    const locate = () => {
        if (navigator.geolocation) {
            navigator.permissions
            .query({ name: "geolocation" })
            .then(function (result) {
            if (result.state === "granted") {
                console.log(result.state);
                //If granted then you can directly call your function here
                navigator.geolocation.getCurrentPosition(success);
            } else if (result.state === "prompt") {
                navigator.geolocation.getCurrentPosition(success, errors, options);
            } else if (result.state === "denied") {
                //If denied then you have to show instructions to enable location
            }
            result.onchange = function () {
                console.log(result.state);
            };
            });
        } else {
        alert("Sorry Not available!");
        }
    }

    return (
        // <div>
            <div id='location'>
                <MapContainer center={state.position} zoom={13} scrollWheelZoom={true} whenCreated = {map => setstate({...state, map})}>
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
            // <button onClick = {locate}> Locate </button>    
        // </div>
    )
}

export default Location;