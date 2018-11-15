import React, { Component } from 'react'
import { connect } from "react-redux";
import { Switch, Route } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import {signout} from '../../api/UserAPI'
import { getProjectCreated, handeError as handeErrorProjectCreated } from './actions/project_created';
import { getProjectAssign, handeError as handeErrorProjectAssign } from './actions/project_assign';

import Alert from '../../components/Alert'
import ListMember from '../list_members/ListMember';


let styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    appBarTitle: {
        flexGrow: 1,
    },
    appBarMenuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    drawer: {
        width: 240,
        flexShrink: 0,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
})

class Dashboard extends Component {
    state = {
        anchorElMenu: null
    }
    constructor(props){
        super(props)

        this.onClickSignout = this.onClickSignout.bind(this)
    }

    componentDidMount(){
        this.props.getProjectCreated()
        this.props.getProjectAssign()
    }

    onClickSignout(){
        signout()
        this.props.history.replace("/")
    }

    render() {
        const { classes } = this.props

        return (
            <div className={classes.root}>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton color="inherit" aria-label="Menu" className={classes.appBarMenuButton}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.appBarTitle}>
                            Team Manage
                        </Typography>
                        <Button color="inherit" onClick={this.onClickSignout}>Sign out</Button>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                >
                    <div className={classes.toolbar} />
                    <List
                        component="nav"
                        subheader={<ListSubheader component="div">Members</ListSubheader>}
                    >
                        <ListItem button onClick={()=>this.props.history.push('/app/members')}>
                            <ListItemText primary="Members" />
                        </ListItem>
                        <ListItem button onClick={()=>this.props.history.push('/app/members/add')}>
                            <ListItemText primary="Add a member" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List
                        component="nav"
                        subheader={<ListSubheader component="div">Projects you create</ListSubheader>}
                    >
                        <ListItem button>
                            <ListItemIcon>
                                <AddIcon />
                            </ListItemIcon>
                            <ListItemText primary="Create new project" />
                        </ListItem>
                        {
                            this.props.projectCreatedData.projects.map(project=>(
                                <ListItem button key={project.name}>
                                    <ListItemText primary={project.name} />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            aria-label="More"
                                            aria-owns={this.state.anchorElMenu ? 'long-menu' : undefined}
                                            aria-haspopup="true"
                                            onClick={e=>this.setState({anchorElMenu: e.currentTarget})}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Menu
                                            id="long-menu"
                                            anchorEl={this.state.anchorElMenu}
                                            open={this.state.anchorElMenu!==null}
                                            onClose={()=>this.setState({anchorElMenu: null})}
                                        >
                                            <MenuItem onClick={()=>this.setState({anchorElMenu: null})}>Edit</MenuItem>
                                            <MenuItem onClick={()=>this.setState({anchorElMenu: null})}>Delete</MenuItem>
                                        </Menu>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))
                        }
                        </List>
                        <Divider />
                        <List
                            component="nav"
                            subheader={<ListSubheader component="div">Projects you assigned</ListSubheader>}
                        >
                        {
                            this.props.projectAssignData.projects.map(project=>(
                                <ListItem button key={project.name}>
                                    <ListItemText primary={project.name} />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            aria-label="More"
                                            aria-owns={this.state.anchorElMenu ? 'long-menu' : undefined}
                                            aria-haspopup="true"
                                            onClick={e=>this.setState({anchorElMenu: e.currentTarget})}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Menu
                                            id="long-menu"
                                            anchorEl={this.state.anchorElMenu}
                                            open={this.state.anchorElMenu!==null}
                                            onClose={()=>this.setState({anchorElMenu: null})}
                                        >
                                            <MenuItem onClick={()=>this.setState({anchorElMenu: null})}>Edit</MenuItem>
                                            <MenuItem onClick={()=>this.setState({anchorElMenu: null})}>Delete</MenuItem>
                                        </Menu>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))
                        }
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Switch>
                        <Route exact path="/app" component={ListMember}/>
                        <Route path="/app/members" component={ListMember}/>
                    </Switch>
                </main>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    projectCreatedData: state.projectCreatedData,
    projectAssignData: state.projectAssignData,
})

const mapDispatchToProps = dispatch => ({
    handeErrorProjectCreated: ()=>dispatch(handeErrorProjectCreated()),
    getProjectCreated: ()=>dispatch(getProjectCreated()),

    handeErrorProjectAssign: ()=>dispatch(handeErrorProjectAssign()),
    getProjectAssign: ()=>dispatch(getProjectAssign()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard))