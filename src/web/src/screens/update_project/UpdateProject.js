import React, { Component } from 'react'
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { updateProject } from '../dashboard/actions/project_created';

const styles = theme => ({
    
});

class UpdateProject extends Component {
    state = {
        name: "",
    }

    constructor(props){
        super(props)

        this.onClickUpdateProject = this.onClickUpdateProject.bind(this)
    }

    componentWillReceiveProps({match, projectCreatedData}){
        let p = projectCreatedData.projects.find(p=>p._id === match.params.id)
        if(p){
            this.project = p
            this.setState({name: p.name})
        }
    }

    onClickUpdateProject(){
        if (!this.state.name) {
            return alert("please fill project's name")
        }
        
        if (this.project) {
            this.project.name = this.state.name
            this.props.updateProject(this.project)
        }
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
                <Button variant="contained" color="primary" disabled={this.props.projectCreatedData.isLoading} onClick={this.onClickUpdateProject}>
                    Update
                </Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    projectCreatedData: state.projectCreatedData,
})

const mapDispatchToProps = dispatch => ({
    updateProject: (project)=>dispatch(updateProject(project)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UpdateProject))