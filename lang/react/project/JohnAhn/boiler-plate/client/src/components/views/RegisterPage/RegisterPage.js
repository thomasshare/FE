import React, { useState } from 'react';
// import Axios from 'axios';
// 아래와 같은 에러 발생 시 import { response } from 'express'; 를 주석처리 해야 함
// TypeError: Cannot read property 'prototype' of undefined
// (anonymous function)
// node_modules/express/lib/response.js:42
// import { response } from 'express';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
// import { withRouter } from 'react-router-dom';



function RegisterPage(props) {

    const dispatch = useDispatch();

    const [Email, setEmail] = useState('')
    const [Name, setName] = useState('이름')
    const [Password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')

    const onEmailHandler = (event) => {
        setEmail( event.currentTarget.value )
    }
    // 이름 넣는 텍스트 박스를 클릭 했을때 공백으로 초기화
    const onClickNameHandler = (event) => {
        setName( event.currentTarget.value = '' )
    }
    const onNameHandler = (event) => {
        setName( event.currentTarget.value )
    }
    const onPasswordHandler = (event) => {
        setPassword( event.currentTarget.value )
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword( event.currentTarget.value )
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (Password !== ConfirmPassword) {
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
        }

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
            name: Name,
            password: Password
        }
        // redux dispatch 할때 action을 파라미넡로 넣어 줌, 그러면 action 폴더의 user_action.js 를 실행한 결과를 던짐
        dispatch(registerUser(body))
            .then( response => {
                if (response.payload.registerSuccess) {
                    props.history.push('/login');
                } else {
                    alert('Failed to sign up');
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
                {/* value에 들어가는 값은 useState에 있는 값이 들어감 예> Name은 useState의 Name */}
                {/* setName은 입력된 값이 이벤트 핸들러에 의해 setName에 할당 */}
                <label>Email</label>
                <input type='email' value={Email} onChange={ onEmailHandler } />
                <label>Name</label>
                <input type='text' value={Name} onClick={ onClickNameHandler } onChange={ onNameHandler }  />
                <label>Password</label>
                <input type='password' value={Password} onChange={ onPasswordHandler } />
                <label>Confirm Password</label>
                <input type='password' value={ConfirmPassword} onChange={ onConfirmPasswordHandler } />
                <br />
                <button type='submit'>
                    회원 가입
                </button>
            </form>
        </div>
    )
}

// export default withRouter(RegisterPage)
export default RegisterPage



















