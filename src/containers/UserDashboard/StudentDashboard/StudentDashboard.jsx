import React, { useEffect } from "react";
import { connect } from "react-redux";

const StudentDashboard = props => {
  // useEffect(() => {

  // })
  console.log(props);
  return (
    <div>
      <h1>Welcome on StudentDashboard</h1>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    studentData: state.user.student
  };
};
export default connect(mapStateToProps)(StudentDashboard);
