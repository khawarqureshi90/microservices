import axios from 'axios'
import { toast } from "react-toastify";

const API_URL = '/api/register/'
const API_URL_login = '/api/auth/'
const API_URL_ADDITEMS = '/api/addproduct'
const API_URL_GETITEMS = '/api/addproduct/get'
const API_URL_DELETEITEMS = '/api/addproduct/delete/'
const API_URL_UPDATEITEMS = '/api/addproduct/'

const API_URL_PLACEORDER = 'http://localhost:5001/api/orders/'
const API_URL_GETORDER = 'http://localhost:5001/api/orders/get/'
const API_URL_KITCHENORDER = 'http://localhost:5001/api/orders/allorders'


const API_URL_SENDEMAIL = 'http://localhost:5002/api/cancelorders/'

//Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)
    if (response.data) {
        return false;
    }
    else {
        return response.data
    }
}

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL_login, userData)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// Logout user
const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('data')
}

//Place Order
const placeOrder = async (orderdata) => {
    const response = await axios.post(API_URL_PLACEORDER, orderdata)
    if (response.data) {
        toast("Your order has been placed")
        // return false
    }
    else {
        return response.data
    }
}

//Add item detail
const additems = async (itemData) => {
    const response = await axios.post(API_URL_ADDITEMS, itemData)
    if (response.data) {
        // localStorage.setItem('user', JSON.stringify(response.data))
        return false;
    }
    else {
        return response.data
    }
}

//GetData from all
const getdata = async () => {
    const response = await axios.get(API_URL_GETITEMS)
    // if(response.data){
    //     localStorage.setItem('data', JSON.stringify(response.data))
    // }
    // else{
    if (response.data)
        return response.data;
    else
        return null;
    //}
}

const getorders = async (cus_id) => {
    const list = await axios.get(API_URL_GETORDER + cus_id)
    if (list.data)
        return list.data;
    else
        return null;
}

const getallorders = async () => {
    const orders = await axios.get(API_URL_KITCHENORDER)
    if (orders.data)
        return orders.data;
    else
        return null
}

//delete item
const deleteitem = async (itemid) => {
    debugger;
    const ress = await axios.delete(API_URL_DELETEITEMS + itemid)
    if (ress.data) return false;
    console.log(itemid)
}

//Update items
const updateItem = async (id, updatedData) => {
    const resp = await axios.put(API_URL_UPDATEITEMS + id, updatedData)
    if (resp.data) return false;
    console.log(updatedData.id)
}

const sendemail = async (content) => {
    const resp = await axios.post(API_URL_SENDEMAIL, content)
    if (resp.data) return false;
}

const deletecancelledorder = async (index) => {

}

const authService = {
    register, login, logout, additems, getdata, deleteitem,
    updateItem, placeOrder, getorders, getallorders, sendemail,
    deletecancelledorder
}
export default authService