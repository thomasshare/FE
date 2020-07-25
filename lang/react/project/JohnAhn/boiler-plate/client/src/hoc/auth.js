

import React, { useEffect } from 'react';
// import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';
// import { response } from 'express';
// import LandingPage from '../components/views/LandingPage/LandingPage';


export default function (SpecificComponent, option, adminRoute = null) {

    // SpecificComponent는 각 컴포넌트들.. 예> LandingPage 컴포넌트
    // option은 null(아무나 접근 가능한 페이지), true(로그인한 유저만 접근 가능한 페이지), false(로그인한 유저는 접근 불가능한 페이지)가 있음
    // adminRoute = null은 파라미터가 없으면 기본으로 null이 적용되는 ES6 문법 임

    function AuthenticationCheck(props) {

        const dispatch = useDispatch();
        
        // 핸들러가 아니기 때문에 useEffect를 사용해야 함???
        useEffect(() => {
            
            dispatch(auth()).then(response => {
                console.log('auth client response', response);

                // 로그인 하지 않은 상태 (isAuth가 false인 상태)
                if(!response.payload.isAuth) {
                    // 로그인 하지 않았지만 option은 true인 상태는 로그인 페이지로 이동
                    if(option) {
                        props.history.push('/login')
                    }
                } else {
                    // 로그인한 상태
                    if(adminRoute && !response.payload.isAdmin) {
                        // 로그인 했지만, adminRoute가 true이고 어드민이 아닌상태는 랜딩 페이지로
                        props.history.push('/')
                    } else {
                        // 로그인 했지만 adminRoute가 true가 아니고 option이 false인 상태
                        if(option === false) {
                            props.history.push('/')
                        }
                    }
                }
            })

        }, []);

        // return ( < SpecificComponent /> )
        // 아래 {...props} 를 넣어줌으로써 각 페이지 마다 import withRouter를 설정할 필요 없음
        return <SpecificComponent {...props} />;
    }



    return AuthenticationCheck
}




