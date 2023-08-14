import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { FaSignInAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'


function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const { email, password } = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, isLoading, isError, isSuccess, message } =
        useSelector(
            (state) => state.auth
        )

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        //Redirect when logged in
        if (isSuccess || user && user.isAdmin) {
            navigate('/admin')
        }
        if (isSuccess || user && !user.isAdmin) {
            navigate('/catalogue')
        }

        dispatch(reset())
    }, [isError, isSuccess, user, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email, password,
        }
        dispatch(login(userData))
    }


    return (
        <>
            <section className='heading'>
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Please enter your email and password</p>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>

                    <div>
                        <input
                            type='email'
                            className='form-group'
                            placeholder='Enter your email'
                            id='email'
                            name='email'
                            value={email}
                            onChange={onChange}
                            required
                        />
                    </div>

                    <div>
                        <input
                            type='password'
                            className='form-group'
                            placeholder='Enter password'
                            id='password'
                            name='password'
                            value={password}
                            onChange={onChange}
                            required
                        />
                    </div>

                    <div>
                        <button>
                            Login
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}
export default Login