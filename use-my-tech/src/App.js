import './App.css';
import React, { useEffect, useState } from 'react'
import { Switch, Link, Route, NavLink, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Login from './Login'
import Home from './Home'
import Rent from './Rent'
import MyItems from './MyItems'
import axios from 'axios'

const NavBar = styled.div `
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&family=Source+Serif+Pro:wght@300&display=swap');


h1, h2, h3, h4, label {
            font-family: 'Roboto', 'sans-serif';

        }

        p {
            font-family: 'Source Serif Pro', 'serif';
        }

header {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding: 4px;
  margin: 2px;
  background-color: #f5f2ed;
  opacity: 60%;
}

.links {
  margin: 5px;
  padding: 4px;
  background-color: transparent;
  color: '#2f3357';
  border-color: transparent;
  &:hover {
      font-weight: bold;
  }
}

`
const initialRegistered = true

function App() {
  const [isRegistered, setIsRegistered] = useState(initialRegistered)
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token'))
  const [allItems, setAllItems] = useState([])
  const history = useHistory();


  const logout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('user_id')
    setLoggedIn(false)
    history.push('/')
  }
  return (
      <NavBar>
    <div className="App">
      <header>
        <div>
        <NavLink to='/rent'>
          <button className='links'>Rent</button>
        </NavLink>
        <NavLink to='/my-items'>
          <button className='links'>My Items</button>
        </NavLink>
        {/* <NavLink to='/cards'>
          <button className='links'>Currently Rented Out</button>
        </NavLink> */}
        </div>
        <div>
        <NavLink to='/login'>
        {!loggedIn ? <button className='links'>Login</button> : <button className='links' onClick={logout}>Logout</button>}
      </NavLink>
        </div>
      </header>

      <Switch>
        <Route path='/login'>
          <Login isRegistered={isRegistered} setIsRegistered={setIsRegistered} setLoggedIn={setLoggedIn}/>
        </Route>
        <Route path='/rent'>
          <Rent allItems={allItems} setAllItems={setAllItems}/>
        </Route>
        <Route path='/my-items'>
          <MyItems setAllItems={setAllItems} allItems={allItems}/>
        </Route>
        <Route path='/'>
          <Home/>
        </Route>
      </Switch>
    </div>
        </NavBar>
  );
}

export default App;
