import config from '../config'
import {getHeaders} from '../utils/common'

const KEY_TOKEN = 'token';

export function getToken(){
    return sessionStorage.getItem(KEY_TOKEN);
  }
  
  export function setToken(token) {
    sessionStorage.setItem(KEY_TOKEN, token);
  }

export function checkToken(token) {
    return new Promise((resolve, reject)=>{
        resolve()
    })
}

export function login(username, password) {
    return new Promise(async (resolve, reject)=>{
        return fetch(config.api_url+'/users/login', {
            method: "POST",
            body: JSON.stringify({username, password}),
        })
        .then(res => res.json())
        .then(resJSON=>{
            if (resJSON.status === 0) {
                return reject(resJSON.error.message)
            }

            let token = resJSON.result.token

            setToken(token)
            resolve(token)
        })
        .catch(err=>reject(err))
    })
}

export function signup(username, password, full_name) {
    return new Promise(async (resolve, reject)=>{
        return fetch(config.api_url+'/users', {
            method: "POST",
            body: JSON.stringify({
                user: {username, password, full_name}
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

export function findAllUsers() {
    return new Promise(async (resolve, reject)=>{
        return fetch(config.api_url+'/users', {
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

export function isLoggedIn() {
    const tok=getToken();
    return !!tok;
}

export function signout() {
    const tok=setToken();
    return !!tok;
}

export function requireAuth(nextState, replace) {
    if (!isLoggedIn()) {
        replace({pathname: '/'});
    }
}