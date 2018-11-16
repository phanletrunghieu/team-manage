import { combineReducers } from "redux";
import {loginData} from "../screens/auth/reducers/signin"
import {signupData} from "../screens/auth/reducers/signup"

import {projectCreatedData} from "../screens/dashboard/reducers/project_created"
import {projectAssignData} from "../screens/dashboard/reducers/project_assign"

import {memberData} from "../screens/list_members/reducers/list_member"
import {projectMemberData} from "../screens/project_member/reducers/get_members"

export default combineReducers({
    loginData,
    signupData,

    projectCreatedData,
    projectAssignData,
    memberData,
    projectMemberData
});