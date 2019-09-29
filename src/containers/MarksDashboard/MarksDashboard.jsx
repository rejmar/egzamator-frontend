import React, { useEffect } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";
import StudentMarksDashboard from "./StudentMarksDashboard/StudentMarksDashboard";
import TeacherMarksDashboard from "./TeacherMarksDashboard/TeacherMarksDashboard";

const MarksDashboard = props => {
  useEffect(() => {
    // props.onUserLog(props.userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userMarks = props.role ? (
    props.role.includes("ROLE_STUDENT") ? (
      <div>
        <StudentMarksDashboard {...props} />
      </div>
    ) : (
      <div>
        <TeacherMarksDashboard {...props} />
      </div>
    )
  ) : null;

  return (
    <div>
      <div>
        {" "}
        <h5>Your Marks:</h5>
      </div>
      {userMarks}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    role: state.user.role,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUserLog: userId => dispatch(actions.getUser(userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarksDashboard);
