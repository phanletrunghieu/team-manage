import { REQUEST_PROJECT_MEMBER, PROJECT_MEMBER_FETCH_SUCCESSFULL, PROJECT_MEMBER_FETCH_FAIL, PROJECT_MEMBER_HANDLE_ERROR, PROJECT_MEMBER_ASSIGN, PROJECT_MEMBER_UNASSIGN } from '../constants/get_members'

const initialState = {
    isLoading: false,
    members: [],
    error: null
}

export const projectMemberData = (state = initialState, action) => {
    switch(action.type){
    case REQUEST_PROJECT_MEMBER:
        return {
            ...state,
            isLoading: true
        }
    case PROJECT_MEMBER_FETCH_SUCCESSFULL:
        return {
            ...state,
            isLoading: false,
            members: action.members
        }
    case PROJECT_MEMBER_FETCH_FAIL:
        return {
            ...state,
            isLoading: false,
            error: action.error
        }
    case PROJECT_MEMBER_HANDLE_ERROR:
        return {
            ...state,
            error: null
        }
    case PROJECT_MEMBER_ASSIGN:
        return {
            ...state,
            members: state.members.concat([action.member])
        }
    case PROJECT_MEMBER_UNASSIGN:
        return {
            ...state,
            members: state.members.filter(m=>m._id!==action.memberID)
        }
    default:
        return state
    }
}