import React, { useState, useEffect } from 'react'
import { auth, googleAuthProvider } from "../../firebase"
import { toast } from 'react-toastify'
import { Button } from 'antd'
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'

const createOrUpdateUser = async (authToken) =>{
    return await axios.post(`${process.env.REACT_APP_API}/create-or-update-user`, {}, {
        headers:{
            authToken: authToken
        }
    })

}

const Login = ({history}) => {
    const [email, setEmail] = useState("megawats.oitavo@gmail.com")
    const [password, setPassword] = useState("123456")
    const [loading, setLoading] = useState(false)

    let dispatch = useDispatch()

    const {user} = useSelector((state) => ({...state}))
    useEffect(() => {
        if(user && user.token) history.push("/")
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        // console.table(email, password)
        try {
            const result = await auth.signInWithEmailAndPassword(email, password)
            // console.log(result)
            const { user } = result
            const idTokenResult = await user.getIdTokenResult()

            createOrUpdateUser(idTokenResult.token)
            .then((res) =>
            console.log("CREATE AND UPDATE RES", res))
            .catch()

            // dispatch({
            //     type: 'LOGGED_IN_USER',
            //     payload: {
            //         email: user.email,
            //         token: idTokenResult.token
            //     }
            // })
            // history.push('/')

        } catch (error) {
            console.log(error)
            toast.error(error.message)
            setLoading(false)

        }
    }

    const googleLogin = async () => {
        auth.signInWithPopup(googleAuthProvider)
        .then(async (result) => {
            const {user} = result
            const idTokenResult = await user.getIdTokenResult()
            dispatch({
                type: 'LOGGED_IN_USER',
                payload: {
                    email: user.email,
                    token: idTokenResult.token
                }
            })
            history.push('/')
        })
        .catch((err) => {
            console.log(err)
            toast.error(err.message)
        })

    }

    const loginForm = () => <form onSubmit={handleSubmit}>
        <div className="form-group">
            <input
                type="email"
                className="form-control"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoFocus
                placeholder="Type your email here!"
            />
        </div>

        <div className="form-group">
            <input
                type="password"
                className="form-control"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Type your password here!"
            />

            <br />
        </div>

        <Button
            onClick={handleSubmit}
            icon={<MailOutlined />}
            type="primary"
            className="mb-3"
            block
            shape="round"
            size="large"
            disabled={!email || password.length < 6}
        >
            Login With Email/Password
        </Button>
    </form>

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>Login</h4>)}
                    {loginForm()}

                    <Button
                        onClick={googleLogin}
                        icon={<GoogleOutlined />}
                        type="danger"
                        className="mb-3"
                        block
                        shape="round"
                        size="large"
                    >
                        Login With Google
                    </Button>

                    <Link to="/forgot/password" className="float-right text Danger">
                        Forgot Password
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default Login