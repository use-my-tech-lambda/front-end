import './App.css';
import React, { useEffect, useState } from 'react'
import { Switch, Link, Route, NavLink, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Login from './Login'
import Home from './Home'
import Rent from './Rent'
import MyItems from './MyItems'
import axios from 'axios'

const initialRegistered = true


function App() {
  const [isRegistered, setIsRegistered] = useState(initialRegistered)
  const [loggedIn, setLoggedIn] = useState(false)
  const history = useHistory();


  const logout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('user_id')
    setLoggedIn(false)
    history.push('/')
  }
  return (
    <div className="App">
      <header>
        <NavLink to='/rent'>
          <button>Rent</button>
        </NavLink>
        <NavLink to='/my-items'>
          <button>My Items</button>
        </NavLink>
        {/* <NavLink to='/cards'>
          <button>Currently Rented Out</button>
        </NavLink> */}
        <NavLink to='/login'>
        {!loggedIn ? <button>Login</button> : <button onClick={logout}>Logout</button>}
      </NavLink>
      </header>

      <Switch>
        <Route path='/login'>
          <Login isRegistered={isRegistered} setIsRegistered={setIsRegistered} setLoggedIn={setLoggedIn}/>
        </Route>
        <Route path='/rent'>
          <Rent/>
        </Route>
        <Route path='/my-items'>
          <MyItems/>
        </Route>
        <Route path='/'>
          <Home/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
