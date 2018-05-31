
import React from 'react'
import { HashRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom'
import 'antd/dist/antd.css'
import './Home.css'
import Admin from '../admin/Admin'
import InterviewerAdmin from '../interviewer/InterviewerAdmin'

export const Home = () => (
  <Router>
    <div className="demo">
      <div className="demo-nav">
        <Link to="/admin" replace>作业分配管理</Link>
        <Link to="/interviewer" replace>面试官管理</Link>
      </div>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/interviewer" component={InterviewerAdmin} />
      </Switch>
    </div>
  </Router>
)

export default withRouter(Home)

