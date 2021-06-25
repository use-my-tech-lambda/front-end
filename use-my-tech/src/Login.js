import axios from 'axios';
import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const initialValues = {
    username: "",
    password: "",
    email: ""
}

const initialRegistered = true

const LoginPage = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&family=Source+Serif+Pro:wght@300&display=swap');

        h1, h2, h3, h4, label {
            font-family: 'Roboto', 'sans-serif';

        }

        p {
            font-family: 'Source Serif Pro', 'serif';
        }

        form, input, div {
            display: flex;
            flex-flow: column wrap;
            justify-content: center;
            align-items: center;
            padding:8px;
            margin: 8px;
        }

        
        .submit {
            width: 100%;
            padding: 8px;
            border-radius: 5.5px;
            background: #2f3357;
            border-color: #2f3357;
            color: white;
            &:hover {
                transform: scale(1.1);
                background-color: #f43f5e;
                border-color: #f43f5e;
    }
        }

        display: flex column;
        justify-content: center;
        padding: 8px;
        margin: 8px;
        width: 90%;
        height: 100%;


`

export default function Login (props) {
    // const history = useHistory();
    const [values, setValues] = useState(initialValues)
    const [isRegistered, setIsRegistered] = useState(initialRegistered)

    const onChange = evt => {
        setValues({...values, [evt.target.name]: evt.target.value})
    }

    const onSubmit = evt => {
        evt.preventDefault()
        axios.post('https://ft-backend-use-my-tech.herokuapp.com/api/users/login', {username: values.username, password: values.password})
            .then(res => {
                console.log(res)
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('user_id', res.data.user_id)
                // history.push('/rent')
            })
            .catch(err => {
                console.log(err)
            })
        //submit username and pwd to database and if authenticated, store token in localstorage and push to either /home or /cards.
        
    }

    const handleRegChange = () => {
        setIsRegistered(!isRegistered);
    }

    return(
        <LoginPage>

        <div> 
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <label>Username 
                    <input
                        value={values.username}
                        onChange={onChange}
                        name='username'
                        type='text'
                        placeholder='Electronics_Lover'
                        />
                </label>
                <label>Password 
                    <input 
                        value={values.password}
                        onChange={onChange}
                        name='password'
                        type='text'
                        placeholder= '********'
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
                        placeholder='ilove@electronics.com'
                        />
                </label>

                <h4 onClick={handleRegChange}>Already have an account? Login</h4> 
                </div>: <h4 onClick={handleRegChange}>Create an Account</h4>}

                <button className="submit">Submit</button>
                
            </form>

        </div>
        </LoginPage>
    )
}