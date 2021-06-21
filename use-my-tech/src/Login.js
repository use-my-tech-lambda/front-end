import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';

const initialValues = {
    username: "",
    password: "",
    email: ""
}

const initialRegistered = false

export default function Login (props) {
    // const history = useHistory();
    const [values, setValues] = useState(initialValues)
    const [isRegistered, setIsRegistered] = useState(initialRegistered)

    const onChange = evt => {
        setValues({...values, [evt.target.name]: evt.target.value})
    }

    const onSubmit = evt => {
        evt.preventDefault()
        //submit username and pwd to database and if authenticated, store token in localstorage and push to either /home or /cards.
        // history.push('/')
    }

    const handleRegChange = () => {
        setIsRegistered(!isRegistered);
    }

    return(
        <div> Login Page
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