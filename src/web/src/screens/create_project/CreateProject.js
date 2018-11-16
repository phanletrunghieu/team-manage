import React, { Component } from 'react'
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {signup} from '../../api/UserAPI'
import { createProject } from '../dashboard/actions/project_created';

const styles = theme => ({
    
});

class CreateProject extends Component {
    state = {
        name: "",
    }

    constructor(props){
        super(props)

        this.onClickCreateProject = this.onClickCreateProject.bind(this)
    }

    onClickCreateProject(){
        if (!this.state.name) {
            return alert("please fill project's name")
        }
        
        this.props.createProject(this.state.name)
        this.setState({name: ''})
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                <TextField
                    id="name"
                    label="Project's name"
                    value={this.state.name}
                    onChange={e=>this.setState({name: e.target.value})}
                    margin="normal"
                    fullWidth
                />
                <Button variant="contained" color="primary" disabled={this.props.projectCreatedData.isLoading} onClick={this.onClickCreateProject}>
                    Create
                </Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    projectCreatedData: state.projectCreatedData,
})

const mapDispatchToProps = dispatch => ({
    createProject: (name)=>dispatch(createProject(name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateProject))