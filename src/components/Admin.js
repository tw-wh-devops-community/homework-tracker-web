import React from "react";
import {connect} from "react-redux";
import actions from "../redux/actions/adminActions";

export class Admin extends React.Component {
  constructor(props) {
    super(props);
    props.fetchHomework();
  }

  render() {
    const interviewer = this.props.homework.interviewer;
    return (
      <div className="homepage">
        {interviewer}
      </div>
    );

  }
}

function mapStateToProps(state) {

  return {
    homework: state.admin.homework
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchHomework: ()=> dispatch(actions.fetchHomework())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);