import {REQUEST_PROJECT_ASSIGN, FETCH_FAIL, FETCH_SUCCESSFULL, HANDLE_ERROR} from '../constants/project_assign'

const initialState = {
    isLoading: false,
    projects: [],
    error: null
}

export const projectAssignData = (state = initialState, action) => {
    switch(action.type){
    case REQUEST_PROJECT_ASSIGN:
        return {
            ...state,
            isLoading: true
        }
    case FETCH_SUCCESSFULL:
        return {
            ...state,
            isLoading: false,
            projects: action.projects
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