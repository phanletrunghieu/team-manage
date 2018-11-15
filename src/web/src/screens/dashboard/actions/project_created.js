import {REQUEST_PROJECT_CREATED, FETCH_SUCCESSFULL, FETCH_FAIL, HANDLE_ERROR} from '../constants/project_created'
import {getProjectCreated as getProjectCreatedAPI} from '../../../api/ProjectAPI'

export function requestProjectCreated(){
    return {
        type: REQUEST_PROJECT_CREATED,
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

export function getProjectCreated(){
    return (dispatch)=>{
        dispatch(requestProjectCreated())

        getProjectCreatedAPI()
        .then(projects=>{
            dispatch(fetchSuccessfully(projects))
        })
        .catch(err=>dispatch(fetchError(err)))
    }
}