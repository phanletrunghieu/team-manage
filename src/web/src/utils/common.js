import {getToken} from '../api/UserAPI'

export function getHeaders(token) {
    var headers = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Accept": "application/json",
    })
  
    token = token || getToken()
    if(token)
        headers.append('x-access-token', token)
    return headers
}