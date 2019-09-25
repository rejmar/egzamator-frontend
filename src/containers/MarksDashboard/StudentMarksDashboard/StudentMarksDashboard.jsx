import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { ListGroup } from "react-bootstrap";

import * as actions from "../../../store/actions/index";
import classes from "./StudentMarksDashboard.module.css";

const StudentMarksDashboard = props => {
  // const [subject, setSubject] = useState();

  useEffect(() => {
    props.onStudentLoad(props.userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const marksContainer =
    props.studentData.marks &&
    props.studentData.marks
      .sort((a, b) => b.test.date - a.test.date)
      .map(mark => {
        return (
          <ListGroup className={classes.ListGroup} key={mark.test.id}>
            <ListGroup.Item className={classes.Item}>
              <div
                className={`${classes.Answers} ${
                  mark.mark >= 50 ? classes.Passed : classes.Failed
                }`}
              >
                <div className={classes.AnswersItem}>
                  NAME: <b>{mark.test.name}</b>
                </div>
                <div className={classes.AnswersItem}>
                  DATE: <b>{new Date(mark.test.date).toLocaleString()}</b>
                </div>
                <div className={classes.AnswersItem}>
                  RESULT: <b>{mark.mark}%</b>
                </div>
              </div>
            </ListGroup.Item>
          </ListGroup>
        );
      });

  return <ListGroup>{marksContainer}</ListGroup>;
};

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    solvedTests: state.user.studentSolvedTests,
    studentData: state.user.student
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onStudentLoad: userId => dispatch(actions.getStudentData(userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentMarksDashboard);
