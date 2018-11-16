import {START_LOGIN, LOGIN_SUCCESSFULL, LOGIN_HANDLE_ERROR, LOGIN_FAIL} from '../constants/signin.js'

const initialState = {
    startLogin: false,
    loginSuccessfull: false,
    error: null
}

export const loginData = (state = initialState, action) => {
    switch(action.type){
    case START_LOGIN:
        return {
            ...state,
            startLogin: true
        }
    case LOGIN_SUCCESSFULL:
        return {
            ...state,
            startLogin: false,
            loginSuccessfull: true
        }
    case LOGIN_FAIL:
        return {
            ...state,
            startLogin: false,
            error: action.err
        }
    case LOGIN_HANDLE_ERROR:
        return {
            ...state,
            error: null
        }
    default:
        return state
    }
}