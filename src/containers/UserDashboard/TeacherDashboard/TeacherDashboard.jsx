import React, { useEffect } from "react";
import { connect } from "react-redux";

const TeacherDashboard = props => {
  console.log(props);
  return (
    <div>
      <h1>Welcome on TeacherDashboard</h1>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    teacherData: state.user.teacher
  };
};
export default connect(mapStateToProps)(TeacherDashboard);
