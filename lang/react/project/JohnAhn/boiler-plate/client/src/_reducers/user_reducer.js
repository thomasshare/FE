

import { LOGIN_USER, REGISTER_USER, AUTH_USER } from '../_actions/types';

// previousState와 action을 조합해서 다음 state를(nextState) 만들어 줌
// 액션에서 리턴된 객체를 action 파라미터로 받음
export default function (state = {}, action) {

    // 액션 타입이 많아지기 때문에 switch 문법을 사용 함
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
            // break;
        case REGISTER_USER:
            return { ...state, registerSuccess: action.payload }
            // break; 
        case AUTH_USER:
            return { ...state, userData: action.payload }
            // break; 
        default:
            return state;
    }
}