import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {auth} from "../../firebase"
import {toast} from 'react-toastify'


const Register  = ({history}) => {
    const [email, setEmail] = useState("")

    const {user} = useSelector((state) => ({...state}))
    useEffect(() => {
        if(user && user.token) history.push("/")
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('ENV --->', process.env.REACT_APP_REGISTER_REDIRECT_URL)
        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true
        }

        await auth.sendSignInLinkToEmail(email, config)
        toast.success(`A validation is send to your ${email}. 
        Click the link to complete your registration!`
        )
        window.localStorage.setItem('emailFormRegistration', email)

        setEmail("")

    }
    const registerForm = () => <form onSubmit={handleSubmit}>
        <input 
        type="email" 
        className="form-control" 
        value={email}
        onChange={e => setEmail(e.target.value)}
        autoFocus
        placeholder="Type your email here!"
        >
        </input>
        <br />

        <button type="submit" className="btn btn-raised">
            Register
        </button>
        </form>
    
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    {registerForm()}
                </div>
            </div>
        </div>
    )
}

export default Register