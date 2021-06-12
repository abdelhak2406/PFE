import { useState, useEffect } from "react";

const Login = () => {
    const [page, setPage] = useState(1);

    const handleSubmit = () => {

    }
    const handeChange = () => {

    }
    const togglePage = (i) => {
        setPage(i);
    }

    return (
        <div className='login'>
            <div className='block header'>
                <div onClick={() => {togglePage(1)} } className = {page===1? 'active': ''} >Connexion</div>
                <div  onClick={() => {togglePage(2)} } className = {page===2? 'active': ''} >Inscription</div>
            </div>
            {
                page === 1
                ?
                <form onSubmit = {handleSubmit} className='block'>
                    <input onChange = {handeChange} type="email" id="email" name="email" placeholder='E-mail' required />
                    <input onChange = {handeChange} type="password" id="password" name="password" placeholder='Mot de passe' required />
                    <input type='submit' value='SE CONNECTER' id='submit' />
                </form>
                :
                <form onSubmit = {handleSubmit} className='block'>
                    <input onChange = {handeChange} type="email" id="email" name="email" placeholder='E-mail' required />
                    <input onChange = {handeChange} type="email" id="email" name="email" placeholder='E-mail' required />
                    <input onChange = {handeChange} type="email" id="email" name="email" placeholder='E-mail' required />
                    <input onChange = {handeChange} type="email" id="email" name="email" placeholder='E-mail' required />
                    <input onChange = {handeChange} type="email" id="email" name="email" placeholder='E-mail' required />
                    <input onChange = {handeChange} type="password" id="password" name="password" placeholder='Mot de passe' required />
                    <input type='submit' value='SE CONNECTER' id='submit' />
                </form>
            }
        </div>
    )
}

export default Login
