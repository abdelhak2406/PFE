import {useState, useEffect} from 'react'
import Speciality from './Speciality'

const Specialities = (props) => {
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


    return (
        <div id='specialities'>
            {
                list.map(i => 
                    <Speciality name={i.name} id = {i.id} key = {i.id} />
                )
            }
        </div>
    )
}

export default Specialities;