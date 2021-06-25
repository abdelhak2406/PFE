import { useState, useEffect } from "react";
import axios from 'axios'

const Login = () => {
    const [page, setPage] = useState(0);
    const [state, setState] = useState({
        email:'', 
        password: '',
        firstname: '',
        lastname: '',
        birthdate: new Date(1999, 2, 4),
        phone: ''
     });

     useEffect(() => {
         setState({
            email:'', 
            password: '',
            firstname: '',
            lastname: '',
            birthdate: new Date(1999, 2, 4),
            phone: ''
         });
     }, [page]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/login', {
            email: state.email,
            password: state.password
        })
        .then(res => {
            console.log(res.data);
            if (res.status === 200 && res.data.token) {
                localStorage.setItem('PFE_ACCESS_TOKEN',res.data.token);
                console.log(localStorage.getItem('PFE_ACCESS_TOKEN'));
                setState({...state, msg: res.data.token})
            }
            else setState({...state, msg: res.data.msg})
        });
    }
    const handleSignup = async (e) => {
           e.preventDefault(); 
           
            const res = await axios.post('api/patients/register',{
                email: state.email,
                password: state.password, 
                firstname: state.firstname,
                lastname:  state.lastname,
                birthdate: state.birthdate,
                phone: state.phone 
           })

        if(res.data.done ) {
            setPage(1);
        }
        else setState({...state , msg:res.data.msg})
    };

    const handeChange = (e) => {
        setState({...state, [e.target.name]: e.target.value});
    }
    const togglePage = (i) => {
        setPage(i);
    }

    return (
        <div className='login container'>
            <div className='block header'>
                <div onClick={() => {togglePage(1)} } className = {page===1? 'active': ''} >Connexion</div>
                <div  onClick={() => {togglePage(2)} } className = {page===2? 'active': ''} >Inscription</div>
            </div>
            {
                page === 1
                ?
                <form onSubmit = {handleSubmit} className='block'>
                    <input onChange = {handeChange} type="text" id="email" name="email" placeholder='E-mail' required />
                    <input onChange = {handeChange} type="password" id="password" name="password" placeholder='Mot de passe' required />
                    <input type='submit' value='SE CONNECTER' id='submit' />
                </form>
                :
                <form onSubmit = {handleSignup} className='block'>
                    <input onChange = {handeChange} type="email" id="email" name="email" placeholder='E-mail' required />
                    <input onChange = {handeChange} type="password" id="password" name="password" placeholder='Mot de passe' required />
                    <input onChange = {handeChange} type="text" id="firstname" name="firstname" placeholder='Nom' required />
                    <input onChange = {handeChange} type="text" id="lastname" name="lastname" placeholder='Prenom' required />  
                    <input onChange = {handeChange} type="tel" id="phone" name="phone" placeholder='Numero Tel' required />
                    <input onChange = {handeChange} type="date" id="birthdate" name="birthdate" placeholder='birthdate' required />
                    <input type='radio' name = 'sex' />
                    <input type='radio' name = 'sex' />
                    <input type='submit' value='SE CONNECTER' id='submit' />
                </form>
            }
            {state.msg? <div className='msg'> { state.msg } </div> : ''}
        </div>
    )
}

export default Login
