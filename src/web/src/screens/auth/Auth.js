import React, { Component } from 'react'
import { connect } from "react-redux";
import {login, handeError as handeErrorLogin} from './actions/signin'
import {signup, handeError as handeErrorSignup} from './actions/signup'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Alert from '../../components/Alert'

let styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: "100vh",
        backgroundColor: "#E1E6E9"
    },
    paper: {
        width: 330,
        padding: "20px"
    },
    btnSignIn: {
        width: "100%",
        margin: "10px 0",
    },
    hr: {
        backgroundColor: "#e0e0e0",
        height: 1,
        border: 0,
    },
    textRight: {
        textAlign: "right"
    }
}

class Auth extends Component {
    state = {
        tab: 1,
        username: "",
        phone: "",
        password: "",
        password1: "",
        password2: "",
        full_name: "",
    }

    constructor(props){
        super(props)

        this.onClickLogin = this.onClickLogin.bind(this)
        this.onClickSignup = this.onClickSignup.bind(this)
    }

    onClickLogin(){
        let {username, password} = this.state

        if (!username) {
            return alert("please fill your username")
        }

        if (!password) {
            return alert("please fill your password")
        }

        this.props.login(username, password)
    }

    onClickSignup(){
        let {username, password1, password2, full_name, phone} = this.state

        if (!username) {
            return alert("please fill your username")
        }

        if (password1 !== password2) {
            return alert("password not match")
        }

        if (!password1) {
            return alert("please fill your password")
        }

        if (!phone) {
            return alert("please fill your phone")
        }

        this.props.signup(username, password1, full_name, phone)
    }

    render() {
        if(this.props.signupData.signupSuccessfull && this.state.tab===2)
            this.setState({tab: 1})

        if(this.props.loginData.loginSuccessfull)
            this.props.history.push("/app")

        return (
            <div style={styles.container}>
            {
                this.state.tab === 1 && (
                    <Paper elevation={1} style={styles.paper}>
                        <Typography variant="h5" component="h3" align="center">Sign in</Typography>
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
                        <Typography variant="body1" component="p" align="right" color="primary">Forgot Password?</Typography>
                        <Button variant="contained" color="primary" style={styles.btnSignIn} disabled={this.props.loginData.startLogin && !this.props.loginData.loginSuccessfull} onClick={this.onClickLogin}>
                            Sign in
                        </Button>
                        <hr style={styles.hr}/>
                        <div style={styles.textRight}>
                            <Typography variant="body1" component="span" align="right" style={{display: "inline-block"}}>Not a member?</Typography>
                            <Typography variant="body1" component="span" align="right" color="primary" style={{display: "inline-block", cursor: "pointer"}} onClick={()=>this.setState({tab: 2})}>Sign Up</Typography>
                        </div>
                    </Paper>
                )
            }
            {
                this.state.tab === 2 && (
                    <Paper elevation={1} style={styles.paper}>
                        <Typography variant="h5" component="h3" align="center">Sign up</Typography>
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
                        <TextField
                            id="username"
                            label="Your username"
                            value={this.state.username}
                            onChange={e=>this.setState({username: e.target.value})}
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            id="password1"
                            label="Your password"
                            type="password"
                            value={this.state.password1}
                            onChange={e=>this.setState({password1: e.target.value})}
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            id="password2"
                            label="Retype your password"
                            type="password"
                            value={this.state.password2}
                            onChange={e=>this.setState({password2: e.target.value})}
                            margin="normal"
                            fullWidth
                        />
                        <Button variant="contained" color="primary" style={styles.btnSignIn} disabled={this.props.signupData.startSignup && !this.props.signupData.signupSuccessfull} onClick={this.onClickSignup}>
                            Sign up
                        </Button>
                        <hr style={styles.hr}/>
                        <div style={styles.textRight}>
                            <Typography variant="body1" component="span" align="right" style={{display: "inline-block"}}>Have an account?</Typography>
                            <Typography variant="body1" component="span" align="right" color="primary" style={{display: "inline-block", cursor: "pointer"}} onClick={()=>this.setState({tab: 1})}>Sign In</Typography>
                        </div>
                    </Paper>
                )
            }
            {
                !!this.props.loginData.error && (
                    <Alert title="Error" onClose={this.props.handeErrorLogin}>{this.props.loginData.error}</Alert>
                )
            }
            {
                !!this.props.signupData.error && (
                    <Alert title="Error" onClose={this.props.handeErrorSignup}>{this.props.signupData.error}</Alert>
                )
            }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loginData: state.loginData,
    signupData: state.signupData,
})

const mapDispatchToProps = dispatch => ({
    login: (username, password)=>dispatch(login(username, password)),
    signup: (username, password, full_name)=>dispatch(signup(username, password, full_name)),
    handeErrorLogin: ()=>dispatch(handeErrorLogin()),
    handeErrorSignup: ()=>dispatch(handeErrorSignup()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)