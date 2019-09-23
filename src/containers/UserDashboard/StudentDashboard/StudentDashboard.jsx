import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ListGroup } from "react-bootstrap";

import classes from "./StudentDashboard.module.css";
import * as actions from "../../../store/actions/index";

const StudentDashboard = props => {
  useEffect(() => {
    props.onStudentLoad(props.userId);
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
                  console.log(test);
                  const isFuture =
                    new Date(test.date) >
                    new Date(new Date() + test.duration * 60 * 1000);
                  return (
                    <ListGroup.Item className={classes.Item} key={test.name}>
                      <div
                        className={isFuture ? classes.FutureTest : classes.Test}
                      >
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

  const marksContainer =
    props.studentData.marks &&
    props.studentData.marks.map(mark => {
      const tests =
        props.solvedTests &&
        Object.keys(props.solvedTests).map((value, key) => {
          const subjectTests = props.solvedTests[value];

          return subjectTests
            .sort((a, b) => a.date - b.date)
            .slice(0, 1)
            .map(test => (
              <ListGroup.Item className={classes.Item} key={test.name}>
                <div className={classes.Answers}>
                  <div className={classes.AnswersItem}>
                    Test:
                    <b>{test.name}</b>
                  </div>
                  <div className={classes.AnswersItem}>
                    Date:
                    <b>{new Date(test.date).toLocaleString()}</b>
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
  return (
    <div>
      <h5>Next tests</h5>
      {testsContainer}
      <h5>Last mark</h5>
      {marksContainer}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    studentData: state.user.student,
    indexNumber: state.user.indexNumber,
    tests: state.user.studentTests,
    subjects: state.user.studentSubjects,
    solvedTests: state.user.studentSolvedTests
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
)(StudentDashboard);
