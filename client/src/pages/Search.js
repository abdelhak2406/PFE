import { useState, useEffect } from 'react'
import SearchBox from '../components/SearchBox'
import Card from '../components/Card'


const Search = () => {
    const [result, setResult] = useState([]);
    

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