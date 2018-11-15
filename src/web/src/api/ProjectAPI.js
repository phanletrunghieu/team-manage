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