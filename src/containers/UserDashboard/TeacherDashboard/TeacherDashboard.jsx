import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ListGroup } from "react-bootstrap";

import classes from "./TeacherDashboard.module.css";
import * as actions from "../../../store/actions/index";

const TeacherDashboard = props => {
  useEffect(() => {
    props.onTeacherLoad(props.userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const testsContainer =
    props.subjects &&
    props.subjects
      .sort((a, b) => a.name < b.name)
      .map(subject => {
        const tests =
          props.tests &&
          Object.keys(props.tests).map((value, key) => {
            const subjectTests = props.tests[value];

            if (subject.name === value) {
              return subjectTests
                .sort((a, b) => a.date - b.date)
                .filter(test => new Date(test.date) > new Date())
                .slice(0, 1)
                .map(test => {
                  return (
                    <ListGroup.Item className={classes.Item} key={test.name}>
                      <div className={classes.Test}>
                        <div className={classes.TestItem}>
                          NAME: <b>{test.name}</b>
                        </div>{" "}
                        <div className={classes.TestItem}>
                          DATE: <b>{new Date(test.date).toLocaleString()}</b>
                        </div>
                      </div>
                    </ListGroup.Item>
                  );
                });
            }
            return null;
          });
        return (
          <ul key={subject.name}>
            <div className={classes.Subject}>{subject.name}</div>
            <ListGroup className={classes.ListGroup}>{tests}</ListGroup>
          </ul>
        );
      });
  return (
    <div>
      <h5>Next tests</h5>
      {testsContainer}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    teacherData: state.user.teacher,
    indexNumber: state.user.indexNumber,
    tests: state.user.teacherTests,
    subjects: state.user.teacherSubjects
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTeacherLoad: userId => dispatch(actions.getTeacherData(userId))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherDashboard);
