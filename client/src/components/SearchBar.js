import { AiOutlineSearch } from 'react-icons/ai'

const SearchBar = () => {
    return (
        <div className='search-bar'>
            <AiOutlineSearch color='#0096D6' />
            <input type='text' name='doctor' placeholder='Trouver un medecin' />
        </div>
    )
}

export default SearchBar
