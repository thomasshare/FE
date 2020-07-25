import React, { useState } from 'react';
// import Axios from 'axios';
// 아래와 같은 에러 발생 시 import { response } from 'express'; 를 주석처리 해야 함
// TypeError: Cannot read property 'prototype' of undefined
// (anonymous function)
// node_modules/express/lib/response.js:42
// import { response } from 'express';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
// import { withRouter } from 'react-router-dom';



function LoginPage(props) {

    const dispatch = useDispatch();

    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')

    const onEmailHandler = (event) => {
        setEmail( event.currentTarget.value )
    }
    const onPasswordHandler = (event) => {
        setPassword( event.currentTarget.value )
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();

        console.log('Email : ', Email);
        console.log('Password : ', Password);

        // redux를 안쓰고 state를 보낼때는
        // let body = {
        //     email: Email,
        //     password: Password
        // }
        // Axios.post('/api/users/login', body)
        // .then(response => {
        //     console.log('서버에서 받은 내용', response);
        // })

        let body = {
            email: Email,
            password: Password
        }
        // redux dispatch 할때 action을 파라미넡로 넣어 줌, 그러면 action 폴더의 user_action.js 를 실행한 결과를 던짐
        dispatch(loginUser(body))
            .then( response => {
                if (response.payload.loginSuccess) {
                    props.history.push('/');
                } else {
                    alert('Login Failed');
                }
            })
        // Axios.post('/api/users/login', body)
        // .then(response => {
        //     console.log('서버에서 받은 내용', response);
        // })

        
        
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>

            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={ onSubmitHandler }
            >
                <label>Email</label>
                <input type='email' value={Email} onChange={ onEmailHandler } />
                <label>Password</label>
                <input type='password' value={Password} onChange={ onPasswordHandler } />
                <br />
                <button type='submit'>
                    Login
                </button>
            </form>
        </div>
    )
}

// export default withRouter(LoginPage)
export default LoginPage