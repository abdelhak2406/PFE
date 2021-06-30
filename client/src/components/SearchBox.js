import { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { HiLocationMarker } from 'react-icons/hi'
import {AiOutlineFilter} from 'react-icons/ai'
import {AiFillFilter} from 'react-icons/ai'
import DataList  from './DataList'
import Return from '../components/Return'
import axios from 'axios'

const SearchBox = (props) => {
    const [filter, setFilter] = useState({text: ''});
    const [showList, setShowList] = useState({
        specialities: false,
        wilayas: false
    });

    useEffect(() => {
        if(filter.text)
            axios.get('/api/doctors/search', {
                params: {
                    text: filter.text
                }
            })
            .then(res => {
                if(res.data.doctors) props.setResult(res.data.doctors);
            })
            .catch(err => console.log(err));
    }, [filter.text])

    var [list, setList] = useState([
        {
            id: 1,
            name: 'generaliste'
        },
        {
            id: 2,
            name: 'generaliste'
        },
        {
            id: 3,
            name: 'generaliste'
        },
        {
            id: 4,
            name: 'generaliste'
        },
        {
            id: 13,
            name: 'generaliste'
        },
        {
            id: 44,
            name: 'generaliste'
        },
        {
            id: 43,
            name: 'generaliste'
        },
        {
            id: 46,
            name: 'generaliste'
        },
        {
            id: 19,
            name: 'generaliste'
        },
        {
            id: 26,
            name: 'generaliste'
        },
        {
            id: 30,
            name: 'generaliste'
        },
        {
            id: 41,
            name: 'generaliste'
        }
    ]);

    var [wilayas, setWilayas] = useState([
        {
            id: 1,
            name: 'Alger'
        },
        {
            id: 2,
            name: 'El Oued'
        }
    ]);

    const handleInput = (e) => {
        setFilter({...filter, text: e.target.value});
    }

    const chooseSpeciality = (id) => {
        setFilter({...filter, speciality: id});
        setShowList({...showList, specialities: false});
        
    }

    const chooseWilaya = (id) => {
        setFilter({...filter, wilaya: id});
        setShowList({...showList, wilayas: false});
    }
    const handleLocation = () => {
        console.log('location');
        setFilter({...filter, location: true})
    }

    return (
        <div className="block header">
            {/* <Return /> */}
            <div className='search-bar'>
                <AiOutlineSearch color='#0096D6' />
                <input onChange={ handleInput } type='text' name='doctor' placeholder='Trouver un medecin' />
            </div>
            <div className='filter-bar'>
                <div onClick={() => {setShowList({...showList, specialities: true}) } } > {filter.speciality? <AiFillFilter size="1.5em" color='#0096d6' />: <AiOutlineFilter size="1.5em" />} Specialites</div>
                <div onClick={() => {setShowList({...showList, wilayas: true})} } >Wilaya</div>
                <div className="location" onClick= { handleLocation } > <HiLocationMarker color={filter.location? '#0096d6': ''} size="1.5em" /> My location</div>
                
                {
                   showList.specialities ? <DataList data = {list} choose = {chooseSpeciality} /> : ''
                }
                {
                    showList.wilayas ? <DataList data = {wilayas} choose = {chooseWilaya} /> : ''
                }
            </div>
        </div>
    )
}

export default SearchBox
