import { useState, useEffect } from "react";
import { Redirect } from "react-router";
import axios from 'axios'

const DoctorRegister = () => {
    const [state, setState] = useState({
        registered: false,
        email:'', 
        password: '',
        firstname: '',
        lastname: '',
        birthdate: new Date(1999, 2, 4),
        phone: '',
        sex: 1
     });

    const handleSignup = async (e) => {
           e.preventDefault(); 
            const res = await axios.post('api/patients/register',{
                email: state.email,
                password: state.password, 
                firstname: state.firstname,
                lastname:  state.lastname,
                birthdate: state.birthdate,
                phone: state.phone,
                sex: state.sex
           })

        if(res.data.done ) {
            setState({...state, registered: true})
        }
        else setState({...state , msg:res.data.msg})
    };

    const handeChange = (e) => {
        setState({...state, [e.target.name]: e.target.value});
    }

    return (
        state.registered?
        <Redirect to="/login" />
        :
        <div className='login' style = {
            {
                background: 'url(../assets/doctor.svg) no-repeat center center fixed',
                backgroundSize: '100%',
                backgroundPosition: 'top',
                backgroundColor: '#fff'
            } }>
            {/* <div className='header'>
                <div>
                    <h2 className='title'>Inscription</h2>
                </div>
            </div> */}
            <div className='container' >
                <form onSubmit = {handleSignup} >
                    <input onChange = {handeChange} type="email" id="email" name="email" placeholder='E-mail' required />
                    <input onChange = {handeChange} type="password" id="password" name="password" placeholder='Mot de passe' required />
                    <input onChange = {handeChange} type="text" id="firstname" name="firstname" placeholder='Nom' required />
                    <input onChange = {handeChange} type="text" id="lastname" name="lastname" placeholder='Prenom' required />  
                    <input onChange = {handeChange} type="tel" id="phone" name="phone" placeholder='Numero Tel' required />
                    <input onChange = {handeChange} type="date" id="birthdate" name="birthdate" placeholder='birthdate' required />
                    <div className='radio' >
                        <label for='sex'>Homme: </label>
                        <input type='radio' name = 'sex' value='Homme' />
                        <label for='sex'>Femme: </label>
                        <input type='radio' name = 'sex' value='Femme' />
                    </div>
                    
                    <input type='submit' value='Inscription' id='submit' />
                </form>
                {state.msg? <div className='msg'> { state.msg } </div> : ''}
            </div>
        </div>
    )
}

export default DoctorRegister
