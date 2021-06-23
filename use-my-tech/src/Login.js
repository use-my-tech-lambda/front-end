import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components'

const initialValues = {
    username: "",
    password: "",
    email: ""
}



const LoginPage = styled.div`
    border:1px solid red;

`

export default function Login (props) {
    const [values, setValues] = useState(initialValues)
    const {isRegistered, setIsRegistered, setLoggedIn } = props;
    const history = useHistory();

    

    const onChange = evt => {
        setValues({...values, [evt.target.name]: evt.target.value})
    }

    const onSubmit = evt => {
        evt.preventDefault()
        if(isRegistered === true){
            axios.post('https://ft-backend-use-my-tech.herokuapp.com/api/users/login', {username: values.username, password: values.password})
                .then(res => {
                    console.log(res)
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('user_id', res.data.user_id)
                    setLoggedIn(true)
                    history.push('/rent')
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else{
            axios.post('https://ft-backend-use-my-tech.herokuapp.com/api/users/register', {username: values.username, password: values.password, email: values.email})
                .then(res => {
                    console.log(res)
                    // localStorage.setItem('token', res.data.token)
                    // localStorage.setItem('user_id', res.data.user_id)
                    // history.push('/rent')
                    setValues(initialValues)
                    setIsRegistered(!isRegistered);
                })
                .catch(err => {
                    console.log(err)
                })
        }
        //submit username and pwd to database and if authenticated, store token in localstorage and push to either /home or /cards.
        
    }

    const handleRegChange = () => {
        setIsRegistered(!isRegistered);
    }

    return(
        <div> 
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <label>Username
                    <input
                        value={values.username}
                        onChange={onChange}
                        name='username'
                        type='text'
                    />
                </label>
                <label>Password
                    <input 
                        value={values.password}
                        onChange={onChange}
                        name='password'
                        type='text'
                    />
                </label>

                {isRegistered === false ?           
                <div>
                <label>Email
                    <input 
                        value={values.email}
                        onChange={onChange}
                        name='email'
                        type='email'
                    />
                </label>
                <h3 onClick={handleRegChange}>Already have an account? Login</h3> 
                </div>: <h3 onClick={handleRegChange}>Create an Account</h3>}

                <button>Submit</button>

            </form>
        </div>
    )
}