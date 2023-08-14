import { useState, useEffect } from "react"
import { toast } from 'react-toastify'
import { Button, Col, Row } from "react-bootstrap"
import { Card } from "react-bootstrap"
import ListGroup from 'react-bootstrap/ListGroup';
import authService from "../features/auth/authService"
import { useNavigate } from "react-router-dom";

function Catalogue() {
    const [menuItems, setmenuItems] = useState([])
    const [cartvalue, setcartvalue] = useState([])
    // var [orderItem, setorderItem] = useState([])
    var [addprice, setaddprice] = useState([])
    var modifiedArray = JSON.parse(localStorage.getItem("cart"))


    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
        //IMPORTANT LINES
        setcartvalue(JSON.parse(localStorage.getItem("cart")));
        setaddprice(JSON.parse(localStorage.getItem("totalprice")));

        // localStorage.removeItem("cart")
        // localStorage.removeItem("totalprice")
    }, []);

    const fetchData = async () => {
        const productData = await authService.getdata();
        setmenuItems(productData);
        return productData;
    }

    const addtoCart = (index) => {
        cartvalue.push(menuItems[index]);
        // setorderItem(cartvalue)  //prevoius value was "orderedItem"
        localStorage.setItem("cart", JSON.stringify(cartvalue))
        totalPrice(index)
    }

    const deleteCartItem = (index) => {
        //Modifying in price
        var totalprice = addprice - modifiedArray[index].price;
        setaddprice(totalprice);
        localStorage.setItem("totalprice", JSON.stringify(totalprice))

        // Deleting cart items
        modifiedArray.splice(index, 1)
        localStorage.setItem("cart", JSON.stringify(modifiedArray))
        setcartvalue(JSON.parse(localStorage.getItem("cart")));
    }

    const totalPrice = (index) => {

        const itemprice = [...menuItems];
        const newprice = parseInt(itemprice[index].price);

        if (addprice == "null") {
            var totalamount = Number("0" ?? 0) + Number(newprice ?? 0)
            setaddprice(totalamount);
            localStorage.setItem("totalprice", JSON.stringify(totalamount))
        }
        else {
            var totalamount = Number(addprice ?? 0) + Number(newprice ?? 0)
            setaddprice(totalamount)
            localStorage.setItem("totalprice", JSON.stringify(totalamount))
        }
    }

    const checkout = () => {
        if (cartvalue.length > 0) {
            navigate('/payment')
        }
        else {
            toast("Please select atleast one item")
        }
    }

    return (
        <>
            <div class="row no-gutters">
                <div class="col-sm-7">
                    {menuItems?.length !== 0 && (
                        <ul>
                            {menuItems.map((item, index) => (

                                <Card className="menucard" key={index} border="primary">
                                    <div class="row no-gutters">
                                        <div class="col-md-8">
                                            <Card.Body>
                                                <Card.Title>{item.productname}</Card.Title>
                                                <Card.Text>{item.description}</Card.Text>
                                                <Card.Text>{"€" + item.price}</Card.Text>
                                                <Button onClick={() => addtoCart(index)}>Add to Cart</Button>
                                            </Card.Body>
                                        </div>

                                        <div class="col-md-4">
                                            <img src={item.myfile} class="img-fluid rounded-end imgsize"></img>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </ul>
                    )}
                </div>

                <div class="col-sm-4" >
                    <Card border="primary" >
                        <ListGroup className="ListGroup" variant="flush">
                            <ListGroup.Item>
                                <br />
                                <h5>
                                    Your order
                                </h5>
                                <Button onClick={() => checkout()}>Go to Checkout</Button>
                            </ListGroup.Item>
                        </ListGroup>


                        {cartvalue?.length !== 0 && (
                            <ul>
                                <ListGroup className="listgroup" variant="flush">

                                    {cartvalue.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <div class="row no-gutters">
                                                <div class="col-md-10">
                                                    <Card.Text>{item.productname}</Card.Text>
                                                    <Card.Text>{item.description}</Card.Text>
                                                </div>
                                                <div class="col-md-2">
                                                    <button className="deletebutton"><img className="deleteicon" src="/delete2.png" alt="my image" onClick={() => deleteCartItem(index)} /></button>
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                                <div class="row no-gutters">
                                    <div class="col-md-10">
                                        <strong>

                                            <Card.Text>{"Total"}</Card.Text>
                                        </strong>
                                    </div>
                                    <div class="col-md-2">
                                        <strong>
                                            <Card.Text>{"€" + addprice}</Card.Text>
                                        </strong>

                                    </div>
                                </div>
                            </ul>
                        )}
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Catalogue