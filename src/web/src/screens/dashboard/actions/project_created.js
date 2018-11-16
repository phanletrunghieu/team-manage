import {REQUEST_PROJECT_CREATED, PROJECT_CREATED_CREATE_SUCCESSFULL, PROJECT_CREATED_FETCH_SUCCESSFULL, PROJECT_CREATED_DELETE_SUCCESSFULL, PROJECT_CREATED_FETCH_FAIL, PROJECT_CREATED_HANDLE_ERROR, PROJECT_CREATED_UPDATE_SUCCESSFULL} from '../constants/project_created'
import {
    getProjectCreated as getProjectCreatedAPI,
    createProject as createProjectAPI,
    deleteProject as deleteProjectAPI,
    updateProject as updateProjectAPI
} from '../../../api/ProjectAPI'

export function requestProjectCreated(){
    return {
        type: REQUEST_PROJECT_CREATED,
    }
}

export function fetchSuccessfully(projects){
    return {
        type: PROJECT_CREATED_FETCH_SUCCESSFULL,
        projects
    }
}

export function createProjectSuccessfully(project){
    return {
        type: PROJECT_CREATED_CREATE_SUCCESSFULL,
        projects: [project]
    }
}

export function deleteProjectSuccessfully(projectID){
    return {
        type: PROJECT_CREATED_DELETE_SUCCESSFULL,
        projectID
    }
}

export function updateProjectSuccessfully(project){
    return {
        type: PROJECT_CREATED_UPDATE_SUCCESSFULL,
        project
    }
}

export function fetchError(error){
    return {
        type: PROJECT_CREATED_FETCH_FAIL,
        error
    }
}

export function handeError(){
    return {
        type: PROJECT_CREATED_HANDLE_ERROR,
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

export function createProject(name){
    return (dispatch)=>{
        createProjectAPI(name)
        .then(project=>{
            dispatch(createProjectSuccessfully(project))
        })
        .catch(err=>dispatch(fetchError(err)))
    }
}

export function deleteProject(projectID){
    return (dispatch)=>{
        deleteProjectAPI(projectID)
        .then(()=>{
            dispatch(deleteProjectSuccessfully(projectID))
        })
        .catch(err=>dispatch(fetchError(err)))
    }
}

export function updateProject(project){
    return (dispatch)=>{
        updateProjectAPI(project)
        .then(()=>{
            dispatch(updateProjectSuccessfully(project))
        })
        .catch(err=>dispatch(fetchError(err)))
    }
}