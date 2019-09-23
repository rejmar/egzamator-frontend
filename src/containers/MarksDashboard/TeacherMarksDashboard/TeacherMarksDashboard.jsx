import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import ReactDataGrid from "react-data-grid";

import * as actions from "../../../store/actions/index";

const TeacherMarksDashboard = props => {
  // const [subject, setSubject] = useState();

  useEffect(() => {
    props.onPageLoad(props.userId);
    // setSubject
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>teacher</div>;
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onPageLoad: userId => dispatch(actions.getTeacherSubjects(userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherMarksDashboard);
