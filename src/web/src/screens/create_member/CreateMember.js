import React, { Component } from 'react'
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {signup} from '../../api/UserAPI'

const styles = theme => ({
    btnCreateUser: {}
});

class CreateMember extends Component {
    state = {
        username: "",
        password: "",
        full_name: "",
        phone: "",
        is_loading: false
    }

    constructor(props){
        super(props)

        this.onClickCreateUser = this.onClickCreateUser.bind(this)
    }

    onClickCreateUser(){
        this.setState({is_loading: true})

        let {username, password, full_name, phone} = this.state

        if (!username) {
            return alert("please fill username")
        }

        if (!password) {
            return alert("please fill password")
        }

        if (!full_name) {
            return alert("please fill full name")
        }

        if (!phone) {
            return alert("please fill phone")
        }

        signup(username, password, full_name, phone)
        .then(()=>{
            this.setState({
                is_loading: false,
                username: "",
                password: "",
                full_name: "",
                phone: ""
            })
        })
        .catch(err=>{
            this.setState({is_loading: false})
            alert(err.message || err)
        })
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                <TextField
                    id="username"
                    label="Your username"
                    value={this.state.username}
                    onChange={e=>this.setState({username: e.target.value})}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    id="password"
                    label="Your password"
                    type="password"
                    value={this.state.password}
                    onChange={e=>this.setState({password: e.target.value})}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    id="full_name"
                    label="Your full name"
                    value={this.state.full_name}
                    onChange={e=>this.setState({full_name: e.target.value})}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    id="phone"
                    label="Your phone"
                    value={this.state.phone}
                    onChange={e=>this.setState({phone: e.target.value})}
                    margin="normal"
                    fullWidth
                />
                <Button variant="contained" color="primary" classes={classes.btnCreateUser} disabled={this.state.is_loading} onClick={this.onClickCreateUser}>
                    Sign up
                </Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateMember))