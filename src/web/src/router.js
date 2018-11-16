import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'

import Auth from './screens/auth/Auth'
import Dashboard from './screens/dashboard/Dashboard'

const Root = () => (
    <Router>
        <div>
            <Route exact path="/" component={Auth} />
            <PrivateRoute path="/app" component={Dashboard} />
        </div>
    </Router>
)

export default Root;