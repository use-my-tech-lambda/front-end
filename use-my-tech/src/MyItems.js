import React, { useEffect, useState } from 'react'
import axios from 'axios';
import axiosWithAuth from './Utilities/AxiosAuth';

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

export default function Cards (props) {
    const [items, setItems] = useState([])
    const { setAllItems, allItems } = props;
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

    const rentNow = (e) => {
        axiosWithAuth()
        .post(`/api/items/user/${user_id}`, {item_name: "testtesttest", item_price: "25", item_category: "camera", item_location: "springville"})
        .then(res => {
            setItems([res, ...items])
        })
        .catch(err => {
            console.log(err)
        })
        // setAllItems([, ...allItems])
    }

    return (
        <div> 
            <h2>{user_id}</h2>
            <button onClick={rentNow}>+ List new Item</button>
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