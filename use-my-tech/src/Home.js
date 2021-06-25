import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'

const HomeStyle = styled.div `
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&family=Source+Serif+Pro:wght@300&display=swap');

    h1 {
        font-family: 'Roboto', 'sans-serif';
    }

    .home-container { 
        background-image: url('https://images.unsplash.com/photo-1607677686474-ad91fc94f5ae?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fGVsZWN0cm9uaWNzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60');
    background-repeat: no-repeat;
    background-position: center;
    height:200vh;
    color: white;
    }

    .titles {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        align-items: center;
        padding: 45px;
        padding-bottom: 50px;

        font-family: 'Roboto', 'sans-serif';
        font-size: 135%;
        font-weight: bolder;
    }
`



export default function Home (props) {

    return(

        <HomeStyle>
            <div className='home-container'>
                <div className= 'titles'>
                    <h3>
                    Find the electronics you need, <br/>
                    no need to buy them.
                    </h3>
                    <h3>Make money on the electronics you don't use</h3>
                </div>
            </div>

        </HomeStyle>
        
    )
}