import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { ListGroup } from "react-bootstrap";

import * as actions from "../../../store/actions/index";
import classes from "./StudentMarksDashboard.module.css";

const StudentMarksDashboard = props => {
  console.log(props);
  // const [subject, setSubject] = useState();

  useEffect(() => {
    props.onStudentLoad(props.userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tests =
    props.studentData.marks &&
    props.studentData.marks.map(mark => {
      const tests =
        props.solvedTests &&
        Object.keys(props.solvedTests).map((value, key) => {
          const subjectTests = props.solvedTests[value];

          return subjectTests.map(test => (
            <ListGroup.Item className={classes.Item} key={test.name}>
              <div className={classes.Answers}>
                <div className={classes.AnswersItem}>
                  Test: <b>{test.name}</b>
                </div>
                <div className={classes.AnswersItem}>
                  Mark: <b>{mark.mark}</b>
                </div>
              </div>
            </ListGroup.Item>
          ));
        });

      return (
        <ul key={mark.id}>
          <ListGroup className={classes.ListGroup}>{tests}</ListGroup>
        </ul>
      );
    });

  // console.log(props.solvedTests);
  return <ListGroup>{tests}</ListGroup>;
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
