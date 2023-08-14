import { useState, useEffect } from "react"
import Card from 'react-bootstrap/Card';
import authService from "../features/auth/authService";

function OrderList() {
    const [orderdata, setorderdata] = useState([]);

    useEffect(() => {
        fetchOrders()
    }, []);

    const fetchOrders = async () => {
        const cus_id = (JSON.parse(localStorage.getItem('user'))).customerid;
        const orderList = await authService.getorders(cus_id);
        setorderdata(orderList);
        return orderList;
    }


    return (
        <>
            {orderdata?.length !== 0 && (
                <ul>
                    {orderdata.map((item, index) => (

                        <Card className="menucard" key={index} border="primary">
                            <Card.Body>
                                <Card.Title>{"Order Detail"}</Card.Title>
                                <Card.Text>{"Order Id: " + item.orderid}</Card.Text>
                                <Card.Text>{"Price: " + "€" + item.price}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </ul>
            )}
        </>
    )
}
export default OrderList