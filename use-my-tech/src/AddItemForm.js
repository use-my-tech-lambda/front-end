import React, { useState } from "react";
import axios from 'axios';
import styled from 'styled-components';
import axiosWithAuth from "./Utilities/AxiosAuth";

const initialForms = {
    item_name: "",
    item_description: "",
    item_price: "",
    item_image: "",
    item_category: "",
    item_location: ""
}

export default function ItemForm(props){
const [formValue, setFormValue] = useState(initialForms)
const {setItems, items, user_id} = props;


    const listItem = (e) => {
        e.preventDefault()
        axiosWithAuth()
        .post(`/api/items/user/${user_id}`, formValue)
        .then(res => {
            console.log(res)
            setFormValue(initialForms)
            setItems([res.data, ...items])
            
        })
        .catch(err => {
            console.log(err)
        })
    }

    const onChange = (e) => {
        setFormValue({...formValue, [e.target.name]: e.target.value})
    }

    return(
        <form onSubmit={listItem}>
                <label>Item name:
                    <input 
                    value={formValue.item_name}
                    onChange={onChange}
                    type="text"
                    name="item_name"
                    />
                </label>
                <label>Item description:
                    <input 
                    value={formValue.item_description}
                    onChange={onChange}
                    type="text"
                    name="item_description"
                    />
                </label>
                <label>Item price:
                    <input 
                    value={formValue.item_price}
                    onChange={onChange}
                    type="text"
                    name="item_price"
                    />
                </label>
                <label>Item category:
                    <input 
                    value={formValue.item_category}
                    onChange={onChange}
                    type="text"
                    name="item_category"
                    />
                </label>
                <label>Item location:
                    <input 
                    value={formValue.item_location}
                    onChange={onChange}
                    type="text"
                    name="item_location"
                    />
                </label>
                <button>+ List new Item</button>
            </form>
    )
}





