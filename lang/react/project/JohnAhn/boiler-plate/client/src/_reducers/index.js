 import { combineReducers } from 'redux';
 import user from './user_reducer';
//  import comment from './comment_reducer';

// 변경된 state를 하나로 묶기 위하여 combineReducers를 사용 함
const rootReducer = combineReducers({
    user
    // comment
})

export default rootReducer;