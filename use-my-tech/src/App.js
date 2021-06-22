import './App.css';
import React, { useEffect, useState } from 'react'
import { Switch, Link, Route, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import Login from './Login'
import Home from './Home'
import Rent from './Rent'
import MyItems from './MyItems'
import axios from 'axios'



function App() {

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
        <button>Login</button>
      </NavLink>
      </header>

      <Switch>
        <Route path='/login'>
          <Login/>
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
