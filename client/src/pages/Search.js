import SearchBar from '../components/SearchBar'
import Return from '../components/Return'
import Card from '../components/Card'

const Search = () => {
    return (
        <div className='search'>
            <Return />
            <div className='header block'>
                <SearchBar />
            </div>
            <div className='container'>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    )
}

export default Search
