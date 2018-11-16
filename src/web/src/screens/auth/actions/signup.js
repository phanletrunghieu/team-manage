import {signup as signupAPI} from '../../../api/UserAPI'
import {START_SIGNUP, SIGNUP_SUCCESSFULL, SIGNUP_FAIL, SIGNUP_HANDLE_ERROR} from '../constants/signup'

export function signup(username, password, full_name, phone){
    return (dispatch)=>{
        dispatch(startSignup())

        signupAPI(username, password, full_name, phone)
        .then(user=>{
            dispatch(signupSuccessfull())
        })
        .catch(err=>dispatch(signupFail(err)))
    }
}

export function startSignup(){
    return {
        type: START_SIGNUP,
    }
}

export function signupSuccessfull(){
    return {
        type: SIGNUP_SUCCESSFULL,
    }
}

export function signupFail(err){
    return {
        type: SIGNUP_FAIL,
        err: err
    }
}

export function handeError(){
    return {
        type: SIGNUP_HANDLE_ERROR,
    }
}