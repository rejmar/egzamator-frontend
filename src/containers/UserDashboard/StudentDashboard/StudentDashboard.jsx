import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { ListGroup } from "react-bootstrap";

import classes from "./StudentDashboard.module.css";
import * as actions from "../../../store/actions/index";
import Test from "../../../components/Test/StudentTest/StudentTest";

const StudentDashboard = props => {
  useEffect(() => {
    props.onStudentLoad(props.userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [show, setShow] = useState(false);
  const [test, setTest] = useState();
  const [historical, setHistorical] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const openTestHandler = (test, subject) => {
    setHistorical(
      new Date(test.date + test.duration * 60 * 1000) < new Date() ||
        solvedTestNames.includes(test.name)
    );

    const testToOpen = {
      ...test,
      subject
    };
    setTest(testToOpen);
    setShow(true);
  };

  const handleSubmit = object => {
    setShow(false);
    setHistorical(false);

    if (!object.isHistorical) {
      const newSolvedAnswers = { ...object, userId: props.userId };
      props.onAnswersSubmit(newSolvedAnswers);
    }
  };

  const solvedTestNames =
    props.studentData && props.studentData.marks.map(mark => mark.test.name);

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
                .filter(
                  test =>
                    new Date(test.date + test.duration * 60 * 1000) >
                      new Date() && !solvedTestNames.includes(test.name)
                )
                .slice(0, 1)
                .map(test => {
                  const isFuture =
                    new Date(test.date) >
                    new Date(new Date() + test.duration * 60 * 1000);
                  return (
                    <ListGroup.Item className={classes.Item} key={test.name}>
                      <div
                        className={isFuture ? classes.FutureTest : classes.Test}
                        onClick={() => {
                          if (!isFuture) openTestHandler(test, subject.name);
                        }}
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
    props.studentData.marks
      .sort((a, b) => b.test.date - a.test.date)
      .slice(0, 1)
      .map(mark => {
        return (
          <ListGroup className={classes.ListGroup} key={mark.test.id}>
            <ListGroup.Item className={classes.Item}>
              <div className={classes.Answers}>
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

  return (
    <div>
      <h5>Next tests</h5>
      {testsContainer}
      <h5>Last solved test</h5>
      {marksContainer}
      {show && (
        <Test
          historical={historical}
          test={test}
          onShow={show}
          onHide={handleClose}
          onSubmit={handleSubmit}
        />
      )}
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
    onStudentLoad: userId => dispatch(actions.getStudentData(userId)),
    onAnswersSubmit: test => dispatch(actions.addStudentAnswers(test))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentDashboard);
