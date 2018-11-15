import React, { Component } from 'react'
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {getListUsers} from './actions/list_member'
import { log } from 'util';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

class ListMember extends Component {
    constructor(props){
        super(props)

        // this.props.getListUsers()
        this.props.userData.users.map(console.log);
    }

    render() {
        const { classes, userData } = this.props;
        console.log(userData)

        return (
            <div className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Full name</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Date created</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            userData.users.map((user, i)=>{
                                
                                return (
                                    <TableRow>
                                    <TableCell component="th" scope="row">{i}</TableCell>
                                    <TableCell>{user.full_name}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.date_created}</TableCell>
                                </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    userData: state.userData
})

const mapDispatchToProps = dispatch => ({
    getListUsers: ()=>dispatch(getListUsers()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ListMember))