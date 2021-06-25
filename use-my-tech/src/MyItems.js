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


export default function MyItems (props) {
    const [items, setItems] = useState([])
    const [editing, setEditing] = useState(true)
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
        .post(`/api/items/user/${user_id}`, {item_name: "newtest", item_price: "25", item_category: "camera", item_location: "springville"})
        .then(res => {
            console.log(res)
            setItems([res.data, ...items])
        })
        .catch(err => {
            console.log(err)
        })
    }

    const editItem = (e) => {
        const index = items.findIndex(x => x.item_id == e.target.value)
        axiosWithAuth()
        .put(`/api/items/${user_id}/${e.target.value}`, {item_name: "newtest", item_price: "25", item_category: "camera", item_location: "mapleton"} )
        .then(res =>{
            const newArray = [...items]
            newArray[index] = res.data
            setItems(newArray)
            // setEditing(false)
            // need to edit the correct object in the array with the res of the put
        })
        .catch(err => {
            console.log(err)
        })
    }

    const Cardmaker = styled.div`
        border:1px solid blue;
        margin:1%;
    `

    return (
        <Card>
            <h2>My Items</h2>
       
            <h2>{user_id}</h2>
            <button onClick={rentNow}>+ List new Item</button>
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
                <button onClick={editItem} value={item.item_id}>Edit Item</button>
            </div>
            ))}
      
      </Card>
    )

    }