import React, { useState } from "react";
import axios from 'axios';
import styled from 'styled-components';
import axiosWithAuth from "./Utilities/AxiosAuth";


const Form = styled.div `
 button {
    width: 100%;
    padding: 10px;
    margin:10px;
    border-radius: 5.5px;
    background: #2f3357;
    border-color: #2f3357;
    color: white;
        &:hover {
            transform: scale(1.1);
            background-color: #f43f5e;
            border-color: #f43f5e;
 }
}
`

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
const {setItems, items, user_id, editing, setEditing} = props;


    const listItem = (e) => {
        e.preventDefault()

        if(!editing){
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
        }else if(editing){
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
    }

    const onChange = (e) => {
        setFormValue({...formValue, [e.target.name]: e.target.value})
    }

    return(

        <Form>
        <form onSubmit={listItem}>
        <label>Item name:
        <input 
        value={formValue.item_name}
        onChange={onChange}
        type="text"
        name="item_name"
        placeholder="Canon Mark VII"
        />
        </label>
        <label>Item description:
        <input 
        value={formValue.item_description}
        onChange={onChange}
        type="text"
        name="item_description"
        placeholder="Pro photo camera"
        />
        </label>
        <label>Item price:
        <input 
        value={formValue.item_price}
        onChange={onChange}
        type="text"
        name="item_price"
        placeholder="$50 per day"
        />
        </label>
        <label>Item category:
        <input 
        value={formValue.item_category}
        onChange={onChange}
        type="text"
        name="item_category"
        placeholder="Photography"
        />
        </label>
        <label>Item location:
        <input 
        value={formValue.item_location}
        onChange={onChange}
        type="text"
        name="item_location"
        placeholder="Austin, TX"
        />
        </label>
        <button>List New Item</button>
        </form>

        </Form>
        )
    }





