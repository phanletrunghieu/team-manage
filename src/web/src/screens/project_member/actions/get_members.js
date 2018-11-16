import { PROJECT_MEMBER_FETCH_SUCCESSFULL, PROJECT_MEMBER_FETCH_FAIL, PROJECT_MEMBER_HANDLE_ERROR, REQUEST_PROJECT_MEMBER, PROJECT_MEMBER_ASSIGN, PROJECT_MEMBER_UNASSIGN } from '../constants/get_members'
import {
    getProjectMember as getProjectMemberAPI,
    assignMember as assignMemberAPI,
    unassignMember as unassignMemberAPI
} from '../../../api/ProjectAPI'
import {findByID} from '../../../api/UserAPI'

export function requestProjectMember(){
    return {
        type: REQUEST_PROJECT_MEMBER,
    }
}

export function fetchSuccessfully(members){
    return {
        type: PROJECT_MEMBER_FETCH_SUCCESSFULL,
        members
    }
}

export function fetchError(error){
    return {
        type: PROJECT_MEMBER_FETCH_FAIL,
        error
    }
}

export function handeError(){
    return {
        type: PROJECT_MEMBER_HANDLE_ERROR,
    }
}

export function assignMemberSuccessfully(member){
    return {
        type: PROJECT_MEMBER_ASSIGN,
        member
    }
}

export function unassignMemberSuccessfully(memberID){
    return {
        type: PROJECT_MEMBER_UNASSIGN,
        memberID
    }
}

export function getProjectMember(projectID){
    return (dispatch)=>{
        dispatch(requestProjectMember())

        getProjectMemberAPI(projectID)
        .then(members=>{
            dispatch(fetchSuccessfully(members))
        })
        .catch(err=>dispatch(fetchError(err)))
    }
}

export function assignMember(projectID, memberID){
    return (dispatch)=>{
        assignMemberAPI(projectID, memberID)
        .then(()=>{
            return findByID(memberID)
        })
        .then(member=>{
            dispatch(assignMemberSuccessfully(member))
        })
        .catch(err=>dispatch(fetchError(err)))
    }
}

export function unassignMember(projectID, memberID){
    return (dispatch)=>{
        unassignMemberAPI(projectID, memberID)
        .then(()=>{
            dispatch(unassignMemberSuccessfully(memberID))
        })
        .catch(err=>dispatch(fetchError(err)))
    }
}