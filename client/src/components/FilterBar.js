import { useState } from 'react'
import { HiLocationMarker } from 'react-icons/hi'
import {AiOutlineFilter} from 'react-icons/ai'
import {AiFillFilter} from 'react-icons/ai'
import Specialities  from './Specialities'

const FilterBar = (props) => {
    var [active, setActive] = useState({
        speciality: false,
        wilaya: false,
        location: false
    });

    const toggleSpecialities = () =>{
        setActive({...active, speciality: !active.speciality});
    }

    return (
        <div className='filter-bar'>
            <div onClick={toggleSpecialities} > {active? <AiFillFilter/>: <AiOutlineFilter size="1.5em" />} Specialites</div>
            <div>Wilaya</div>
            <div className="location"> <HiLocationMarker color={active.location? 'blue': ''} size="1.5em" /> My location</div>
            
            {
                active.speciality? <Specialities /> : ''
            }
        </div>
    )
}

export default FilterBar;