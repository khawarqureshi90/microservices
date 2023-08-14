import React, { useState } from "react";
import {
    MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBContainer, MDBInput,
    MDBRow, MDBRadio, MDBBtn, MDBListGroup, MDBListGroupItem,
} from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import { v4 as uuid } from 'uuid'
import { useDispatch } from "react-redux";
import { placeOrder } from "../features/auth/authSlice";

function Checkout() {

    const dispatch = useDispatch();
    const cus_id = (JSON.parse(localStorage.getItem('user'))).customerid;
    const {email} = (JSON.parse(localStorage.getItem('user')));
    var price = localStorage.getItem("totalprice");
    const [orderPrice, setorderPrice] = useState(price)

    // code when client go for making payment
    const payment = () => {
        //oredr id
        const uniqueid = uuid();
        let date_time = new Date();

        const orderDetail = {
            cus_id, email, uniqueid, orderPrice, date_time
        }

        dispatch(placeOrder(orderDetail))
        // toast("Your order has been placed")
    }

    return (
        <MDBContainer className="py-5">
            <MDBRow>
                <MDBCol md="8" className="mb-4">
                    <MDBCard className="mb-4">
                        <MDBCardHeader className="py-3">
                            <h5 className="mb-0">Delivery Address</h5>
                        </MDBCardHeader>
                        <MDBCardBody>

                            <MDBInput
                                wrapperClass="mb-4"
                                label="Address"
                                id="form3"
                                type="text"
                            />

                            <hr className="my-4" />

                            <h5 className="mb-4">Payment</h5>

                            <MDBRadio
                                name="flexRadioDefault"
                                id="flexRadioDefault1"
                                label="Payment accepted only by Credit card"
                                wrapperClass="mb-4"
                                checked
                            />

                            <MDBRow>
                                <MDBCol>
                                    <MDBInput
                                        label="Name on card"
                                        id="form6"
                                        type="text"
                                        wrapperClass="mb-4"
                                    />
                                </MDBCol>
                                <MDBCol>
                                    <MDBInput
                                        label="Card number"
                                        id="form7"
                                        type="text"
                                        wrapperClass="mb-4"
                                    />
                                </MDBCol>
                            </MDBRow>

                            <MDBRow>
                                <MDBCol md="3">
                                    <MDBInput
                                        label="Expiration"
                                        id="form8"
                                        type="text"
                                        wrapperClass="mb-4"
                                    />
                                </MDBCol>
                                <MDBCol md="3">
                                    <MDBInput
                                        label="CVV"
                                        id="form8"
                                        type="text"
                                        wrapperClass="mb-4"
                                    />
                                </MDBCol>
                            </MDBRow>

                            <Button onClick={() => payment()}>Place Order</Button>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>

                <MDBCol md="4" className="mb-4">
                    <MDBCard className="mb-4">
                        <MDBCardHeader className="py-3">
                            <h5 className="mb-0">Summary</h5>
                        </MDBCardHeader>
                        <MDBCardBody>
                            <MDBListGroup flush>
                                <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                    Products
                                    <span>
                                        <text>{"€" + price}</text>
                                    </span>
                                </MDBListGroupItem>
                                <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                    Shipping
                                    <span>Gratis</span>
                                </MDBListGroupItem>
                                <hr className="my-2"></hr>
                                <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                    <div>
                                        <strong>Total amount</strong>
                                        <strong>
                                            <p className="mb-0">(including VAT)</p>
                                        </strong>
                                    </div>
                                    <span>
                                        <strong>
                                            <text>{"€" + price}</text>
                                        </strong>
                                    </span>
                                </MDBListGroupItem>
                            </MDBListGroup>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );

}
export default Checkout