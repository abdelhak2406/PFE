import AiOutlineMenu from 'react-icons/ai'

const Navbar = ()=> {
    return (
        <div className='navbar'>
            <input id="check" type="checkbox" className="toggler" />
            
            <div className="hamburger"><div></div></div>
            <div className="menu">
                <ul>
                    <li><a href="#">Medecins</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;