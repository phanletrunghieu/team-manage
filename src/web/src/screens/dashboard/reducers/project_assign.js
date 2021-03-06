import {REQUEST_PROJECT_ASSIGN, PROJECT_ASSIGN_FETCH_FAIL, PROJECT_ASSIGN_FETCH_SUCCESSFULL, PROJECT_ASSIGN_HANDLE_ERROR, PROJECT_ASSIGN_ADD, PROJECT_ASSIGN_REMOVE} from '../constants/project_assign'

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
    case PROJECT_ASSIGN_FETCH_SUCCESSFULL:
        return {
            ...state,
            isLoading: false,
            projects: action.projects
        }
    case PROJECT_ASSIGN_FETCH_FAIL:
        return {
            ...state,
            isLoading: false,
            error: action.error
        }
    case PROJECT_ASSIGN_HANDLE_ERROR:
        return {
            ...state,
            error: null
        }
    case PROJECT_ASSIGN_ADD:
        return {
            ...state,
            projects: [...state.projects, action.project],
        }
    case PROJECT_ASSIGN_REMOVE:
        return {
            ...state,
            projects: state.projects.filter(p=>p._id!==action._id),
        }
    default:
        return state
    }
}