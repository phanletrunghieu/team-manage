import {REQUEST_PROJECT_CREATED, PROJECT_CREATED_CREATE_SUCCESSFULL, PROJECT_CREATED_FETCH_FAIL, PROJECT_CREATED_FETCH_SUCCESSFULL, PROJECT_CREATED_HANDLE_ERROR, PROJECT_CREATED_DELETE_SUCCESSFULL, PROJECT_CREATED_UPDATE_SUCCESSFULL} from '../constants/project_created'

const initialState = {
    isLoading: false,
    projects: [],
    error: null
}

export const projectCreatedData = (state = initialState, action) => {
    switch(action.type){
    case REQUEST_PROJECT_CREATED:
        return {
            ...state,
            isLoading: true
        }
    case PROJECT_CREATED_FETCH_SUCCESSFULL:
        return {
            ...state,
            isLoading: false,
            projects: action.projects
        }
    case PROJECT_CREATED_FETCH_FAIL:
        return {
            ...state,
            isLoading: false,
            error: action.error
        }
    case PROJECT_CREATED_HANDLE_ERROR:
        return {
            ...state,
            isLoading: false,
            error: null
        }
    case PROJECT_CREATED_CREATE_SUCCESSFULL:
        return {
            ...state,
            isLoading: false,
            projects: state.projects.concat(action.projects)
        }
    case PROJECT_CREATED_DELETE_SUCCESSFULL:
        return {
            ...state,
            isLoading: false,
            projects: state.projects.filter(p=>p._id !== action.projectID)
        }
    case PROJECT_CREATED_UPDATE_SUCCESSFULL:
        return {
            ...state,
            isLoading: false,
            projects: state.projects.map(p=>{
                if(p._id===action.project._id){
                    return Object.assign(p, action.project)
                }
                return p
            })
        }
    default:
        return state
    }
}