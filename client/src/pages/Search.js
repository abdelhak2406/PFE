import { useState, useEffect } from 'react'
import SearchBox from '../components/SearchBox'
import Card from '../components/Card'
import Navbar from '../components/Navbar'
const axios = require('axios')


const Search = (props) => {
    const [result, setResult] = useState([]);
    
    return (
        <div className='search'>    
            <Navbar />
            <SearchBox setResult = {setResult} />
            <div className='container'>
                {
                    result.map((d, index) => 
                        <Card 
                            firstname={d.firstname} 
                            lastname={d.lastname} 
                            photo = {d.photo}
                            speciality_name = {d.speciality_name} 
                            wilaya = {d.wilaya}
                            key = {index} 
                        />
                    )
                }
            </div>
        </div>
    )
}

export default Search