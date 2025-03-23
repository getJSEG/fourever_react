
import { useRef, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setCredentials } from "../features/auth/authSlice.js";
import { useLoginMutation } from "../features/auth/authApiSlice.js";
import { useGetUsersQuery } from "../features/users/usersApiSlices.js";
import '../static/css/pages/login.css'
import Loading from "./common/Loading.js";

import logo from '../static/images/company-logo-pink-trans.png'
// import AlertMessage from "../components/common/AlertMessage.js";
// import Loading from "../components/common/Loading.js";

const Login = () => {
    const userRef = useRef()
    const errRef = useRef()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const navigate = useNavigate()
    const location = useLocation();
    const from = location.state?.from?.pathname || "/dashboard";

    const [login, {isLoading}] = useLoginMutation()

    const dispatch = useDispatch()

    useEffect( ()=> {
        userRef.current.focus()
    }, [])

    useEffect( () => {
        setErrMsg('')
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            const userData = await login({ username, password }).unwrap()

            // console.log(userData)

            dispatch(setCredentials({...userData}))
            setUsername('')
            setPassword('')
            navigate(from, { replace: true });

        } catch( err ) {
            console.log(err)
            if(!err?.status){
                setErrMsg('No Hay Conexion Con el server')
            }else if (err?.status == 400){
                setErrMsg('Acceso Denegado')
            }else if(err?.status == 401) {
                setErrMsg('No autorizado')
            }else {
                setErrMsg('Error al, iniciar de sesión')
            }
            // errRef.current.focus()
        }
    }


    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePasswordInput = (e) => setPassword(e.target.value)

    const content = isLoading ? <Loading /> : (
    <section>
        <div className="login-page-container">
            <div className="logo-container"> <img className="login-logo" src={logo}/>  </div>

            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

            <div className="login-form-container">
                <h4 className="begin-session-title"> Iniciar sesión </h4>
                
                <form onSubmit={e => handleSubmit(e)} className="login-form">
                            <label className="sign-in-label" htmlFor="username"> Usuario </label>
                            <input  className={`login-input-username`}
                                    name="username"
                                    ref={userRef}
                                    placeholder="Usuario"
                                    type="text" 
                                    onChange={e => handleUserInput(e)}
                                    value={username}
                                    required
                                    // onInvalid={e=> e.target.setCustomValidity('Este campo no debe estar en blanco')}
                                    // onInput={ e => e.target.setCustomValidity('')}
                                    ></input>
                            <span className="err-msg"></span> 

                            <label className="sign-in-label" htmlFor="password"> Contraseña: </label>
                            <input className={`login-input-password`}
                                    name="password"
                                    type="password"
                                    autoComplete="on"
                                    placeholder="Contraseña"
                                    onChange={e => handlePasswordInput(e)}
                                    value={password}
                                    required
                                    // onInvalid={e=> e.target.setCustomValidity('Este campo no debe estar en blanco')}
                                    // onInput={ e => e.target.setCustomValidity('')}
                                    ></input>
                        
                            <button className="btn-one" type='submit'>
                                INICIAR SESIÓN 
                            </button>
                    </form>
            </div>
        </div>
    </section>)


    return content
}

// const mapStateToProps = state => ({
//     loginFailMsg: state.auth.loginFailMsg,
//     isLoggedIn: state.auth.isLoggedIn,
//     isLoading: state.auth.isLoading,
//     isAuthenticated: state.auth.isAuthenticated
// });

export default Login
// export default connect(mapStateToProps, {login})(Login);