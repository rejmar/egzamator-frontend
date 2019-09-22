import React, { useEffect } from "react";
import { connect } from "react-redux";

const TeacherDashboard = props => {
  return (
    <div>
      <h1>Welcome {props.indexNumber}</h1>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    teacherData: state.user.teacher,
    indexNumber: state.user.indexNumber
  };
};
export default connect(mapStateToProps)(TeacherDashboard);
