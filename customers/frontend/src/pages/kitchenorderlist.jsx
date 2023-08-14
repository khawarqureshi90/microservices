import { useState, useEffect } from "react"
import { Card, Button } from "react-bootstrap"
import authService from "../features/auth/authService"
import Popup from "../components/popup"

function Kitchenorderlist() {
    const [allorders, setallorders] = useState([])
    const [showpopup, setshowpopup] = useState(false)
    const [email, setemail] = useState()
    const [price, setprice] = useState()
    const [index, setindex] = useState()
    const [mailcontent, setmailcontent ] = useState({
        subject:'',
        message:''
    })

    const {subject, message} = mailcontent;

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const kitchenorders = await authService.getallorders();
        setallorders(kitchenorders);
        return kitchenorders;
    }

    const cancelOrder = (index) => {
        setshowpopup(true);
        setemail(allorders[index].email)
        setprice(allorders[index].price)
        setindex(index)
    }

    const sendEmail = () => {
        setshowpopup(false);

        const refundemail = {
            email, subject, message, price
        }

        authService.sendemail(refundemail);
        // authService.deletecancelledorder(index);
    }

    const forwardToKitchen = (index) => {
        console.log(index);
    }

    return (
        <>
            {allorders?.length !== 0 && (
                <ul>
                    {allorders.map((item, index) => (
                        <Card className="menucard" key={index} border="primary">
                            <div class="row no-gutters">
                                <div class="col-md-8">
                                    <Card.Body>
                                        <Card.Title>{"Order Detail"}</Card.Title>
                                        <Card.Text>{"Order Id: " + item.orderid}</Card.Text>
                                        <Card.Text>{"Customer Id: " + item.customerid}</Card.Text>
                                        <Card.Text>{"Price: " + "€" + item.price}</Card.Text>
                                    </Card.Body>
                                </div>

                                <div class="col-md-4">
                                    <Button className="cancelbutton" onClick={() => cancelOrder(index)}>Cancel Order</Button>
                                    <Button className="cancelbutton" onClick={() => forwardToKitchen(index)}>Ready to Deliver</Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </ul>
            )}






            {/* POPUP FOR CANCEL AND EMAIL */}
            <Popup trigger={showpopup} setTrigger={setshowpopup}>
                <h2>Sending Email</h2>

                <div className='d-flex w-100 vh-50 justify-content-center aligh-items-center'>
                    <div className='w-50 border text-white p-5'>
                        <form>
                            <div>
                                <label htmlFor="name">Name:</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Email'
                                    name='email'
                                    value={email}
                                    // onChange={e => setValues({ ...values, productname: e.target.value })}
                                />
                            </div>

                            <div>
                                <label htmlFor="description">Description:</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    label="subject"
                                    placeholder='Subject'
                                    name="subject"
                                    onChange={e => setmailcontent({ ...mailcontent, subject: e.target.value })}
                                />
                            </div>

                            <div>
                                <label htmlFor="price">Price:</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Enter your message here'
                                    name="reason"
                                    onChange={e => setmailcontent({ ...mailcontent, message: e.target.value })}
                                />
                            </div>
                        </form>
                        <br />

                        <div>
                            <Button onClick={() => sendEmail()}>Send</Button>
                        </div>
                    </div>
                </div>
            </Popup>
        </>
    )
}
export default Kitchenorderlist