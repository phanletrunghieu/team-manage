import React, { Component } from 'react'
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import { getProjectMember, assignMember, unassignMember } from './actions/get_members';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
});

class ProjectMember extends Component {
    state = {
        memberToAssign: 0
    }

    constructor(props){
        super(props)

        this.onClickAssignMember = this.onClickAssignMember.bind(this)
    }

    componentWillReceiveProps({match}){
        if(this.projectID !== match.params.id){
            this.projectID = match.params.id
            this.props.getProjectMember(this.projectID)
        }
    }

    onClickAssignMember(){
        let u = this.props.memberData.users[this.state.memberToAssign]
        this.props.assignMember(this.projectID, u._id)
    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="members-to-assign">Members</InputLabel>
                    <Select
                        value={this.state.memberToAssign}
                        onChange={e=>this.setState({memberToAssign: e.target.value})}
                        inputProps={{
                            name: 'members-to-assign',
                            id: 'members-to-assign',
                        }}
                    >
                        {
                            this.props.memberData.users.map((u, i)=>(
                                <MenuItem value={i}>{u.full_name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" disabled={this.props.projectMemberData.isLoading} onClick={this.onClickAssignMember}>
                    Assign
                </Button>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Full name</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Date created</TableCell>
                            <TableCell>Unassign</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.props.projectMemberData.members.map((user, i)=>(
                                <TableRow>
                                    <TableCell component="th" scope="row">{i}</TableCell>
                                    <TableCell>{user.full_name}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.date_created}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={()=>this.props.unassignMember(this.projectID, user._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    memberData: state.memberData,
    projectMemberData: state.projectMemberData,
})

const mapDispatchToProps = dispatch => ({
    getProjectMember: (project)=>dispatch(getProjectMember(project)),
    assignMember: (projectID, memberID)=>dispatch(assignMember(projectID, memberID)),
    unassignMember: (projectID, memberID)=>dispatch(unassignMember(projectID, memberID)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProjectMember))