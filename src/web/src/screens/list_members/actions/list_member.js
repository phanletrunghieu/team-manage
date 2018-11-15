import {REQUEST_LIST_USER, FETCH_SUCCESSFULL, FETCH_FAIL, HANDLE_ERROR} from '../constants/list_member'
import {findAllUsers} from '../../../api/UserAPI'

export function requestListUser(){
    return {
        type: REQUEST_LIST_USER,
    }
}

export function fetchSuccessfully(users){
    return {
        type: FETCH_SUCCESSFULL,
        users
    }
}

export function fetchError(error){
    return {
        type: FETCH_FAIL,
        error
    }
}

export function handeError(){
    return {
        type: HANDLE_ERROR,
    }
}

export function getListUsers(){
    return (dispatch)=>{
        dispatch(requestListUser())

        findAllUsers()
        .then(users=>{
            dispatch(fetchSuccessfully(users))
        })
        .catch(err=>dispatch(fetchError(err)))
    }
}