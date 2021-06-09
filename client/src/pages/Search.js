import { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import FilterBar from '../components/FilterBar'
import Return from '../components/Return'
import Card from '../components/Card'


const Search = () => {
    const [result, setResult] = useState([]);
    const [filter, setFilter] = useState({
        speciality: '',
        wilaya: '',
        location: false
    })
    
    return (
        <div className='search'>
            <Return />
            <div className='header block'>
                <SearchBar />
                <FilterBar />
            </div>
            <div className='container'>
                <Card/>
            </div>
        </div>
    )
}

export default Search
