import React,{useEffect} from 'react';
import axios from 'axios';
// 리액트에서는 페이지간에 이동을 할때 react-router-dom을 이용함
// import { withRouter } from 'react-router-dom';
// import { response } from 'express';

// import React, { useState } from 'react';
// import Axios from 'axios';
// 아래와 같은 에러 발생 시 import { response } from 'express'; 를 주석처리 해야 함
// TypeError: Cannot read property 'prototype' of undefined
// (anonymous function)
// node_modules/express/lib/response.js:42
// import { response } from 'express';
// import { useDispatch } from 'react-redux';
// import { registerUser } from '../../../_actions/user_action';
// import { response } from 'express';

function LandingPage(props) {

    useEffect(() => {
        axios.get('/api/hello')
        .then(response => { console.log('hello 는? : ',response) });

    }, [])



    // const dispatch = useDispatch();

    // const [Email, setEmail] = useState('')
    // const [Name, setName] = useState('이름')
    // const [Password, setPassword] = useState('')
    // const [ConfirmPassword, setConfirmPassword] = useState('')

    // const onEmailHandler = (event) => {
    //     setEmail( event.currentTarget.value )
    // }
    // 이름 넣는 텍스트 박스를 클릭 했을때 공백으로 초기화
    const onClickLogoutHandler = () => {


        axios.get('/api/users/logout')
        .then(response => {
            console.log(response.data);
            
            if (response.data.success) {
                props.history.push('/login');
            } else {
                alert('Failed to logout');
            }
            
        })



    }
    
        
        








    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <h2>시작 페이지 입니다.</h2>
            <button onClick={ onClickLogoutHandler }>로그 아웃</button>
        </div>
    )
} /* end of LandingPage function */

// export default withRouter(LandingPage)
export default LandingPage
