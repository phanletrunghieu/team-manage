import {REQUEST_LIST_USER, FETCH_FAIL, FETCH_SUCCESSFULL, HANDLE_ERROR} from '../constants/list_member'

const initialState = {
    isLoading: false,
    users: [],
    error: null
}

export const userData = (state = initialState, action) => {
    switch(action.type){
    case REQUEST_LIST_USER:
        return {
            ...state,
            isLoading: true
        }
    case FETCH_SUCCESSFULL:
        return {
            ...state,
            isLoading: false,
            users: action.users
        }
    case FETCH_FAIL:
        return {
            ...state,
            isLoading: false,
            error: action.error
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