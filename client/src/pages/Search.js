import { useState, useEffect } from 'react'
import SearchBox from '../components/SearchBox'
import Card from '../components/Card'
const axios = require('axios')


const Search = (props) => {
    const [result, setResult] = useState([]);
    
    useEffect(()=>{
        fetch(`/api/doctors/`)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }, [props.id]);
    return (
        <div className='search'>    
            <SearchBox />
            <div className='container'>
                <Card/>
            </div>
        </div>
    )
}

export default Search