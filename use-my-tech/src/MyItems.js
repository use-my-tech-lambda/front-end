import React, { useEffect, useState } from 'react'
import axios from 'axios';
import axiosWithAuth from './Utilities/AxiosAuth';
import styled from 'styled-components';

//receives an array of objects through props (changes based on which of the three buttons they click for rent, rent out, currently renting)
//creates "cards" of each of the items received with product name, price, description, image, location, owner name, (reviews?),
//display an action depending on which of three buttons they clicked, for example a button to say "book now" or edit item
//Send 4 urls for the items, unsplash.
//Be able to upload a new item, edit, update.
//Styling.
    //Stretch
//Reviews
//Payments
//Schedule

const Card = styled.div `
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&family=Source+Serif+Pro:wght@300&display=swap');

    h1, h2, h3, h4, label {
        font-family: 'Roboto', 'sans-serif';

    }

    p {
        font-family: 'Source Serif Pro', 'serif';
    }

    img{
        border-width: 2px;
        border-color: #f5f2ed;
    }
    .item {
        border-color: #2f3357;
        border-radius: 5px;
    }

`

export default function Cards (props) {

    const [items, setItems] = useState([])
    const user_id = localStorage.getItem('user_id')

    useEffect(() => {
        axiosWithAuth()
        .get(`/api/users/${user_id}/items`)
        .then(res => {
            console.log(res.data)
            setItems(res.data)
        })
        .catch(err => {
            console.log(err);
      })
    }, [])

    return (
        <Card>
            <h2>My Items</h2>
            {items.map (item => (
                <div
                key={item.item_id}
                className='item'>
                <img
                src={item.item_image}
                alt={item.item_name}
                />
                <h4>{item.item_name}</h4>
                <p>{item.item_description}</p>
                <p>{item.item_price}</p>
                <p>{item.item_category}</p>
                <p>{item.item_location}</p>
                <p>{item.item_owner}</p>
                </div>
            ))}
        </Card>
    )
    }