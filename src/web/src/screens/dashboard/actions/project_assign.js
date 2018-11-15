import {REQUEST_PROJECT_ASSIGN, FETCH_SUCCESSFULL, FETCH_FAIL, HANDLE_ERROR} from '../constants/project_assign'
import {getProjectAssign as getProjectAssignAPI} from '../../../api/ProjectAPI'

export function requestProjectAssign(){
    return {
        type: REQUEST_PROJECT_ASSIGN,
    }
}

export function fetchSuccessfully(projects){
    return {
        type: FETCH_SUCCESSFULL,
        projects
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