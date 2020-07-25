import axios from 'axios';
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from './types';

// 노출 되어야 될 페이지에서 서버에 던지는 객체를 파라미터(dataToSubmit)로 받음 - loginPage의 body 객체
export function loginUser(dataToSubmit) {
    
    // 액션 파일에서 서버에 데이터를 던지고 응답 받은 결과를 객체로 리턴 하면 리턴된 객체를 리듀서(_reducer 폴더)에서 state로 받음
    const request = axios.post('/api/users/login', dataToSubmit)
    .then(response => 
        // console.log('서버에서 받은 내용', response);
        // 서버에서 받은 response data 를 request에 저장한다.
        response.data
    )

    // 저장된 request를 return 시켜서 reducer에게 보냄
    return {
        type: LOGIN_USER,
        // payload는 서버에서 응답받은 값
        payload: request
    }
}

export function registerUser(dataToRegister) {
    
    // 액션 파일에서 서버에 데이터를 던지고 응답 받은 결과를 객체로 리턴 하면 리턴된 객체를 리듀서(_reducer 폴더)에서 state로 받음
    const request = axios.post('/api/users/register', dataToRegister)
    .then(response => 
        // console.log('서버에서 받은 내용', response);
        // 서버에서 받은 response data 를 request에 저장한다.
        response.data
    )

    // 저장된 request를 return 시켜서 reducer에게 보냄
    return {
        type: REGISTER_USER,
        // payload는 서버에서 응답받은 값
        payload: request
    }
}

export function auth() {
    
    // 액션 파일에서 서버에 데이터를 던지고 응답 받은 결과를 객체로 리턴 하면 리턴된 객체를 리듀서(_reducer 폴더)에서 state로 받음
    const request = axios.get('/api/users/auth')
    .then(response => 
        // console.log('서버에서 받은 내용', response);
        // 서버에서 받은 response data 를 request에 저장한다.
        response.data
    )

    // 저장된 request를 return 시켜서 reducer에게 보냄
    return {
        type: AUTH_USER,
        // payload는 서버에서 응답받은 값
        payload: request
    }
}