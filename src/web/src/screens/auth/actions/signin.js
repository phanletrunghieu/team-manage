import {login as loginAPI} from '../../../api/UserAPI'
import {START_LOGIN, LOGIN_SUCCESSFULL, LOGIN_FAIL, LOGIN_HANDLE_ERROR} from '../constants/signin.js'

export function login(username, password){
    return (dispatch)=>{
        dispatch(startLogin())

        loginAPI(username, password)
        .then(token=>{
            dispatch(loginSuccessfull())
        })
        .catch(err=>dispatch(loginFail(err)))
    }
}

export function startLogin(){
    return {
        type: START_LOGIN,
    }
}

export function loginSuccessfull(){
    return {
        type: LOGIN_SUCCESSFULL,
    }
}

export function loginFail(err){
    return {
        type: LOGIN_FAIL,
        err: err
    }
}

export function handeError(){
    return {
        type: LOGIN_HANDLE_ERROR,
    }
}