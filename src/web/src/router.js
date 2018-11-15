import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Auth from './screens/auth/Auth'
import Dashboard from './screens/dashboard/Dashboard'
import PrivateRoute from './components/PrivateRoute'

const Root = () => (
    <Router>
        <div>
            <Route exact path="/" component={Auth} />
            <PrivateRoute path="/app" component={Dashboard} />
        </div>
    </Router>
)

export default Root;