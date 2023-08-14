import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from "react-redux"
import { additems, reset } from "../features/auth/authSlice"
import Resizer from "react-image-file-resizer"
import Button from "react-bootstrap/Button"
import Nav from 'react-bootstrap/Nav';

function Admin() {

    const [formData, setFormData] = useState({
        productname: '',
        description: '',
        price: '',
        myfile: ''
    })
    const { productname, description, price, myfile } = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, isLoading, isError, isSuccess, message, response } =
        useSelector(
            (state) => state.auth
        )

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess) {
            toast("Uploaded Successfully");

        }
        dispatch(reset())
    }, [isError, isSuccess, user, message, navigate, dispatch])


    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
        console.log(productname)
    }

    const handleFileUpload = (e) => {    //i remove async here
        const file = e.target.files[0];

        try {
            Resizer.imageFileResizer(file,
                150, 150,
                "JPEG",
                100,
                0, (uri) => {
                    setFormData({ ...formData, myfile: uri })
                }, "base64", 100, 50)

            // const base64 = await converToBase64(file);
            // setFormData({...formData, myfile: base64})
            console.log(myfile)
        } catch (error) {
            console.log(error)
        }
    }


    const onSubmit = (e) => {
        e.preventDefault()

        const prodInfo = {
            productname, description, price, myfile
        }
        dispatch(additems(prodInfo))
    }

    const updateItems = () => {
        navigate("/updateitems")
    }


    return (
        <>

            <section className='headind'>
                <p>Please add product items</p>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div>
                        <input
                            type='text'
                            className='form-group'
                            placeholder='Enter product name'
                            id='productname'
                            name='productname'
                            value={productname}
                            onChange={onChange}
                            required
                        />
                    </div>

                    <div>
                        <input
                            type='text'
                            className='form-group'
                            placeholder='Enter description'
                            id='description'
                            name='description'
                            value={description}
                            onChange={onChange}
                            required
                        />
                    </div>

                    <div>
                        <input
                            type='text'
                            className='form-group'
                            placeholder='Enter price'
                            id='price'
                            name='price'
                            value={price}
                            onChange={onChange}
                            required
                        />
                    </div>

                    <div>
                        <input
                            type='file'
                            id='myfile'
                            name='myfile'
                            // value={myfile}
                            accept=".jpeg, .png, .jpg, .avif"
                            onChange={(e) => handleFileUpload(e)}
                            required
                        />
                    </div>

                    <div className="d-grid gap-2">
                        <br></br>
                                <Button type="submit">
                                    Save
                                </Button>
                                <Button type="button" onClick={() => updateItems()}>
                                    Update Items
                                </Button>
                    </div>
                </form>

            </section>
        </>
    )
}
export default Admin