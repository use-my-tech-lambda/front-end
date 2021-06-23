import React, { useEffect, useState } from 'react'
import axios from 'axios';
import axiosWithAuth from './Utilities/AxiosAuth';

//receives an array of objects through props (changes based on which of the three buttons they click for rent, rent out, currently renting)
//creates "cards" of each of the items received with product name, price, description, image, location, owner name, (reviews?),
//display an action depending on which of three buttons they clicked, for example a button to say "book now" or edit item
export default function Cards (props) {

    const [items, setItems] = useState([])

    useEffect(() => {
        axiosWithAuth()
        .get('/api/items')
        .then(res => {
            console.log(res.data)
            setItems(res.data)
        })
        .catch(err => {
            console.log(err);
      })
    }, [])

    return (
        <div> 
            <h2>Rent Some Electronics</h2>
            {items.map (item => (
                <div
                key={item.item_id}
                >
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
        </div>
    )
    }