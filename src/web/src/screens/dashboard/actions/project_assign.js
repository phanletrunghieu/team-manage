import {REQUEST_PROJECT_ASSIGN, PROJECT_ASSIGN_FETCH_SUCCESSFULL, PROJECT_ASSIGN_FETCH_FAIL, PROJECT_ASSIGN_HANDLE_ERROR} from '../constants/project_assign'
import {getProjectAssign as getProjectAssignAPI} from '../../../api/ProjectAPI'

export function requestProjectAssign(){
    return {
        type: REQUEST_PROJECT_ASSIGN,
    }
}

export function fetchSuccessfully(projects){
    return {
        type: PROJECT_ASSIGN_FETCH_SUCCESSFULL,
        projects
    }
}

export function fetchError(error){
    return {
        type: PROJECT_ASSIGN_FETCH_FAIL,
        error
    }
}

export function handeError(){
    return {
        type: PROJECT_ASSIGN_HANDLE_ERROR,
    }
}

export function getProjectAssign(){
    return (dispatch)=>{
        dispatch(requestProjectAssign())

        getProjectAssignAPI()
        .then(projects=>{
            dispatch(fetchSuccessfully(projects))
        })
        .catch(err=>dispatch(fetchError(err)))
    }
}