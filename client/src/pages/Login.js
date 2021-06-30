import { useState, useEffect } from "react";
import {Redirect} from 'react-router-dom'
import axios from 'axios'

const Login = (props) => {
    const [state, setState] = useState({
        email:'', 
        password: '',
     });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/login', {
            email: state.email,
            password: state.password
        })
        .then(res => {
            if (res.status === 200 && res.data.token) {
                props.login(res.data.token)
            }
            else setState({...state, msg: res.data.msg})
        });
    }

    const handeChange = (e) => {
        setState({...state, [e.target.name]: e.target.value});
    }


    return (
        <div className='login'>
            <div className='header'>
                <h2 className='title'> Connexion </h2>
            </div>
            <div className='container'>
                <form onSubmit = {handleSubmit} className='block'>
                    <input onChange = {handeChange} type="text" id="email" name="email" placeholder='E-mail' required />
                    <input onChange = {handeChange} type="password" id="password" name="password" placeholder='Mot de passe' required />
                    <input type='submit' value='SE CONNECTER' id='submit' />
                </form>
                {state.msg? <div className='msg'> { state.msg } </div> : ''}
            </div>
        </div>
    )
}

export default Login
