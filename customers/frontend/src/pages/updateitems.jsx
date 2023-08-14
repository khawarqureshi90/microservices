import { useEffect, useState } from "react";
import authService from "../features/auth/authService";
import { Button, Card, Row, Col } from "react-bootstrap";
import {
    MDBCol, MDBContainer, MDBInput, MDBRow
} from "mdb-react-ui-kit";
import Popup from "../components/popup";


function Updateitems() {

    const [values, setValues] = useState({
        productname: '',
        description: '',
        price: ''
    })

    const [menuItems, setmenuItems] = useState([])
    const [buttonPopup, setbuttonPopup] = useState(false);
    const [id, setid] = useState([])

    useEffect(() => {
        fetchData();
    }, []);

    //Getting data from database
    const fetchData = async () => {
        const productData = await authService.getdata();
        setmenuItems(productData);
        return productData;
    }
    //Showing popup
    const updateitem = (index) => {
        setbuttonPopup(true);
        setid(menuItems[index]._id)
        setValues({
            ...values, productname: menuItems[index].productname,
            description: menuItems[index].description, price: menuItems[index].price
        })
        console.log(menuItems[index])
    }

    //Updating data from database
    const savechanges = () => {
        authService.updateItem(id, values)
        fetchData();
        setbuttonPopup(false);
    }

    //Deleting data from database
    const deleteitem = async (index) => {
        await authService.deleteitem(menuItems[index]._id);
        fetchData();
    }


    return (
        <>
            {menuItems?.length !== 0 && (
                <ul>
                    <Row>
                        {menuItems.map((item, index) => {
                            return (
                                <Col sm={6} md={3} className='mt-3'>
                                    <Card style={{ width: '18rem' }} className="updateitem-main-card">
                                        <Card.Img className="updateitem-img" variant="top" src={item.myfile} />
                                        <Card.Body>
                                            <Card.Title>{item.productname}</Card.Title>
                                            <Card.Text>{item.description}</Card.Text>
                                            <Card.Text>{"€" + item.price}</Card.Text>
                                            <Row>
                                                <Col>
                                                    <Button onClick={() => { updateitem(index) }}> Update</Button>
                                                </Col>

                                                <Col>
                                                    <Button onClick={() => { deleteitem(index) }}> Delete</Button>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
                </ul>
            )}

            <Popup trigger={buttonPopup} setTrigger={setbuttonPopup}>
                <h2>Modify items detail</h2>
                
                <div className='d-flex w-100 vh-50 justify-content-center aligh-items-center'>
                    <div className='w-50 border text-white p-5'>
                        <form>
                            <div>
                                <label htmlFor="name">Name:</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Product name'
                                    name='productname'
                                    value={values.productname}
                                    onChange={e => setValues({ ...values, productname: e.target.value })}
                                />
                            </div>

                            <div>
                                <label htmlFor="description">Description:</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    label="Product name"
                                    placeholder='description'
                                    name="description"
                                    value={values.description}
                                    onChange={e => setValues({ ...values, description: e.target.value })}
                                />
                            </div>

                            <div>
                                <label htmlFor="price">Price:</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='price'
                                    name="price"
                                    value={values.price}
                                    onChange={e => setValues({ ...values, price: e.target.value })}
                                />
                            </div>
                        </form>
                        <br />

                        <div>
                            <Button onClick={() => savechanges()}>Save Changes</Button>
                        </div>
                    </div>
                </div>
            </Popup>
        </>
    )
}
export default Updateitems;