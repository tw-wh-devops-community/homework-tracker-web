
import React from 'react'
import { HashRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom'
import 'antd/dist/antd.css'
import './Home.css'
import Admin from '../admin/Admin'
import InterviewerAdmin from '../interviewer/InterviewerAdmin'

export class Home extends React.Component {
  state = {
    selected: 'admin',
  }

  changeClass = (name) => {
    this.setState({ selected: name })
  }

  render() {
    const { selected } = this.state
    return (
      <Router>
        <div className="demo">
          <div className="demo-nav">
            <div className="homepage-logo">HOMEWORK 管理平台</div>
            <Link to="/interviewer" replace className={selected === 'interviewer' ? 'selected' : 'unselected'} onClick={() => this.changeClass('interviewer')}>面试官管理</Link>
            <span>|</span>
            <Link to="/" replace className={selected === 'admin' ? 'selected' : 'unselected'} onClick={() => this.changeClass('admin')}>作业分配管理</Link>
          </div>
          <Switch>
            <Route exact path="/" component={Admin} />
            <Route path="/interviewer" component={InterviewerAdmin} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default withRouter(Home)

