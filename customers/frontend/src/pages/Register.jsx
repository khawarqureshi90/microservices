import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import {FaUser} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import { register, reset } from '../features/auth/authSlice' 


function Register() {
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    })
    const{name, email, password, password2} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const{user, isLoading, isError, isSuccess, message,response} = 
    useSelector(
        (state)=> state.auth
        )

        useEffect(() => {
            if(isError){
                toast.error(message)
            }

            //Redirect when registered
            if(isSuccess) {
                navigate('/login')
            }
            dispatch(reset())
        }, [isError, isSuccess, user, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) =>{
        e.preventDefault()

        if(password != password2){
            toast.error('Password do not match')
        }
        else{
            const userData = {
                name,email,password,
            }
            dispatch(register(userData))
        }
    }


    return(
    <>
    <section className='headind'>
    <h1>
        <FaUser/> Register
    </h1>
    <p>Please create an account</p>
    </section>

    <section className='form'>
        <form onSubmit={onSubmit}>
            <div>
                <input
                type='text'
                className='form-group'
                placeholder='Enter your name'
                id='name'
                name='name'
                value={name}
                onChange={onChange}
                required
                />
            </div>

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
                <input
                type='password'
                className='form-group'
                placeholder='Confirm password'
                id='password2'
                name='password2'
                value={password2}
                onChange={onChange}
                required
                />
            </div>

            <div>
                <button>
                    Submit
                </button>
            </div>
        </form>
    </section>
    </>
    )
}
export default Register