import {REQUEST_LIST_USER, LIST_USER_FETCH_SUCCESSFULL, LIST_USER_FETCH_FAIL, LIST_USER_HANDLE_ERROR} from '../constants/list_member'
import {findAllUsers} from '../../../api/UserAPI'

export function requestListUser(){
    return {
        type: REQUEST_LIST_USER,
    }
}

export function fetchSuccessfully(users){
    return {
        type: LIST_USER_FETCH_SUCCESSFULL,
        users
    }
}

export function fetchError(error){
    return {
        type: LIST_USER_FETCH_FAIL,
        error
    }
}

export function handeError(){
    return {
        type: LIST_USER_HANDLE_ERROR,
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