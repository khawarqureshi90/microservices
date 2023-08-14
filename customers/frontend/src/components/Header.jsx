import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import Nav from 'react-bootstrap/Nav';
import { toast } from 'react-toastify';

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)


    const onLogout = () => {
        dispatch(logout())
        setTimeout(() => {
            navigate('/login')
        }, 1)
        dispatch(reset())
    }

    // need to go on orders page
    const onOrders = () => {
        user.isAdmin ? (
            navigate('/kitchenorders')
        ):(
            navigate('/orders')
        )
        
    }

    return (
        <header>
            <div className='logo'>
                <Link to='/'>
                    <h1>
                        Just Eat
                    </h1>
                </Link>
            </div>
            <ul>
                {user ? (
                    <>
                            <button onClick={onLogout}><FaSignOutAlt />Logout</button>

                            <button onClick={onOrders}>View Orders</button>

                        {/* <Nav variant="pills" activeKey="1" defaultActiveKey="/admin">
                            <Nav.Item>
                                <Nav.Link eventKey="1" href="/admin">Add Product</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="2" href="/updateitems">Update Product</Nav.Link>
                            </Nav.Item>
                        </Nav> */}
                    </>


                ) : (
                    <>
                        <li>
                            <Link to='/login'>
                                <FaSignInAlt /> Login
                            </Link>
                        </li>
                        <li>
                            <Link to='/register'>
                                <FaUser /> Register
                            </Link>
                        </li>
                    </>
                )}

            </ul>
        </header>

    )
}
export default Header