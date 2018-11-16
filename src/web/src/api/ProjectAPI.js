import config from '../config'
import {getHeaders} from '../utils/common'

export function getProjectCreated() {
    return new Promise(async (resolve, reject)=>{
        return fetch(config.api_url+'/users/projects/create', {
            headers: getHeaders(),
        })
        .then(res => res.json())
        .then(resJSON=>{
            if (resJSON.status === 0) {
                return reject(resJSON.error.message)
            }

            resolve(resJSON.result)
        })
        .catch(err=>reject(err))
    })
}

export function getProjectAssign() {
    return new Promise(async (resolve, reject)=>{
        return fetch(config.api_url+'/users/projects/assign', {
            headers: getHeaders(),
        })
        .then(res => res.json())
        .then(resJSON=>{
            if (resJSON.status === 0) {
                return reject(resJSON.error.message)
            }

            resolve(resJSON.result)
        })
        .catch(err=>reject(err))
    })
}

export function createProject(name) {
    return new Promise(async (resolve, reject)=>{
        return fetch(config.api_url+'/projects', {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({
                project: {name}
            }),
        })
        .then(res => res.json())
        .then(resJSON=>{
            if (resJSON.status === 0) {
                return reject(resJSON.error.message)
            }

            resolve(resJSON.result)
        })
        .catch(err=>reject(err))
    })
}

export function deleteProject(projectID) {
    return new Promise(async (resolve, reject)=>{
        return fetch(config.api_url+'/projects/'+projectID, {
            method: "DELETE",
            headers: getHeaders(),
        })
        .then(res => res.json())
        .then(resJSON=>{
            if (resJSON.status === 0) {
                return reject(resJSON.error.message)
            }

            resolve(resJSON.result)
        })
        .catch(err=>reject(err))
    })
}

export function updateProject(project) {
    return new Promise(async (resolve, reject)=>{
        return fetch(config.api_url+'/projects/' + project._id, {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify({
                project: {name: project.name}
            }),
        })
        .then(res => res.json())
        .then(resJSON=>{
            if (resJSON.status === 0) {
                return reject(resJSON.error.message)
            }

            resolve(resJSON.result)
        })
        .catch(err=>reject(err))
    })
}

export function getProjectMember(projectID) {
    return new Promise(async (resolve, reject)=>{
        return fetch(config.api_url+'/projects/' + projectID + '/members', {
            headers: getHeaders(),
        })
        .then(res => res.json())
        .then(resJSON=>{
            if (resJSON.status === 0) {
                return reject(resJSON.error.message)
            }

            resolve(resJSON.result)
        })
        .catch(err=>reject(err))
    })
}

export function assignMember(projectID, memberID) {
    return new Promise(async (resolve, reject)=>{
        return fetch(config.api_url+'/projects/' + projectID + '/assign', {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({
                users: [memberID]
            }),
        })
        .then(res => res.json())
        .then(resJSON=>{
            if (resJSON.status === 0) {
                return reject(resJSON.error.message)
            }

            resolve(resJSON.result)
        })
        .catch(err=>reject(err))
    })
}

export function unassignMember(projectID, memberID) {
    return new Promise(async (resolve, reject)=>{
        return fetch(config.api_url+'/projects/' + projectID + '/assign', {
            method: "DELETE",
            headers: getHeaders(),
            body: JSON.stringify({
                users: [memberID]
            }),
        })
        .then(res => res.json())
        .then(resJSON=>{
            if (resJSON.status === 0) {
                return reject(resJSON.error.message)
            }

            resolve(resJSON.result)
        })
        .catch(err=>reject(err))
    })
}