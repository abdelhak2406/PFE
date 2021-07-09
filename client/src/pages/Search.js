import { useState } from 'react'
import SearchBox from '../components/SearchBox'
import Card from '../components/Card'
import Navbar from '../components/Navbar'
const axios = require('axios')


const Search = () => {
    const [result, setResult] = useState([]);
    
    return (
        <div className='search' style = {
            {
                background: 'url(../assets/search.svg) no-repeat center center fixed',
                backgroundSize: 'contain',
                backgroundPosition: 'center'
            } }>     

            <Navbar />
            <SearchBox setResult = {setResult} />
            <div className='container'>
                {
                    result.map((d, index) => 
                        <Card 
                            id_user= {d.id_user}
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