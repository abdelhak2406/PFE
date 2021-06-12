import { useState, useEffect } from 'react'
import SearchBox from '../components/SearchBox'
import Card from '../components/Card'
const axios = require('axios')


const Search = () => {
    const [result, setResult] = useState([]);
    
    useEffect(()=>{
        axios.get('/doctors')
        .then(res => console.log(res))
    })
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