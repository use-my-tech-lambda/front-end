import './App.css';
import React, { useEffect, useState } from 'react'
import { Switch, Link, Route, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import Login from './Login'
import Home from './Home'
import Cards from './Cards'


function App() {
  return (
    <div className="App">
      <header>
        <NavLink to='/cards'>
          <button>Rent</button>
        </NavLink>
        <NavLink to='/cards'>
          <button>Rent Out</button>
        </NavLink>
        <NavLink to='/cards'>
          <button>Currently Rented Out</button>
        </NavLink>
        <NavLink to='/login'>
        <button>Login</button>
      </NavLink>
      </header>

      <Switch>
        <Route path='/login'>
          <Login/>
        </Route>
        <Route path='/cards'>
          <Cards/>
        </Route>
        <Route path='/'>
          <Home/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
