import {START_SIGNUP, SIGNUP_SUCCESSFULL, HANDLE_ERROR, SIGNUP_FAIL} from '../constants/signup'

const initialState = {
    startSignup: false,
    signupSuccessfull: false,
    error: null
}

export const signupData = (state = initialState, action) => {
    switch(action.type){
    case START_SIGNUP:
        return {
            ...state,
            startSignup: true
        }
    case SIGNUP_SUCCESSFULL:
        return {
            ...state,
            startSignup: false,
            signupSuccessfull: true
        }
    case SIGNUP_FAIL:
        return {
            ...state,
            startSignup: false,
            error: action.err
        }
    case HANDLE_ERROR:
        return {
            ...state,
            error: null
        }
    default:
        return state
    }
}