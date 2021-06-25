import React, { useEffect, useState } from 'react'
import axios from 'axios';
import axiosWithAuth from './Utilities/AxiosAuth';
import styled from "styled-components";
import ItemForm from './AddItemForm';
// import EditItemForm from './EditItemForm';

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



export default function MyItems (props) {
    const [items, setItems] = useState([])
    const [editing, setEditing] = useState(null)
    const [editFormValue, setEditFormValue] = useState()

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

    const handleEdit = (e) => {
        setEditing(e.target.value)
        
    }
    
    const editItem = (e) => {
        axiosWithAuth()
        .put(`/api/items/${user_id}/${e.target.value}`, {item_name: "newtest", item_price: "25", item_category: "camera", item_location: "mapleton"} )
        .then(res =>{
            const index = items.findIndex(x => x.item_id == e.target.value)
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
    

    const deleteItem = (e) => {
        axiosWithAuth()
        .delete(`/api/items/${user_id}/${e.target.value}`)
        .then(res =>{
            const index = items.findIndex(x => x.item_id == e.target.value);
            const arrayAfterRemovingItem = [...items];
            arrayAfterRemovingItem.splice(index, 1);
            setItems(arrayAfterRemovingItem);
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
        <div> 
            <ItemForm editing={editing} setEditing={setEditing} setItems={setItems} items={items} user_id={user_id}/>
            
            
            {items.map (item => (
                <Cardmaker
                key={item.item_id}
                >
                {item.item_image? <img
                src={item.item_image}
                alt={item.item_name}
                /> : null}
                <h4>{item.item_name}</h4>
                <p>{item.item_description}</p>
                <p>{item.item_price}</p>
                <p>{item.item_category}</p>
                <p>{item.item_location}</p>
                <p>{item.item_owner}</p>
                <button onClick={handleEdit} value={item.item_id}>Edit Item</button>
                <button onClick={deleteItem} value={item.item_id}>Delete Item</button>
                </Cardmaker>
            ))}
        </div>
    )
    }