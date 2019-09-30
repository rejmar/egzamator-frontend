import React, { useState, useEffect } from "react";

import StudentTest from "../../Test/StudentTest/StudentTest";
import classes from "./StudentTestsDashboard.module.css";
import * as actions from "../../../store/actions/index";

import { connect } from "react-redux";
import { Button, ListGroup } from "react-bootstrap";

const StudentTestsDashboard = props => {
  const [show, setShow] = useState(false);
  const [future, setFuture] = useState(false);
  const [historical, setHistorical] = useState(false);
  const [test, setAnswers] = useState();

  useEffect(() => {
    props.onStudentLoad(props.userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setShow(false);
    setFuture(false);
    setHistorical(false);
  };
  const handleShow = () => setShow(true);

  const openAnswersHandler = (test, subject) => {
    setFuture(
      new Date(test.date) > new Date(new Date() + test.duration * 60 * 1000)
    );
    setHistorical(
      new Date(test.date + test.duration * 60 * 1000) < new Date() ||
        solvedTestNames.includes(test.name)
    );

    const solvedTest = props.studentData.marks.filter(
      mark => mark.test.name === test.name
    )[0];

    const testToOpen = {
      ...test,
      subject,
      solvedTest
    };
    setAnswers(testToOpen);
    setShow(true);
  };

  const handleSubmit = object => {
    setShow(false);
    setHistorical(false);
    setFuture(false);

    if (!object.isHistorical) {
      const newSolvedAnswers = { ...object, userId: props.userId };

      props.onAnswersSubmit(newSolvedAnswers);
      setAnswers(null);
    }
  };

  const solvedTestNames =
    props.studentData && props.studentData.marks.map(mark => mark.test.name);

  const pendingTestsContainer =
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
                .sort((a, b) => ("" + a.name).localeCompare(b.name))
                .filter(
                  test =>
                    new Date() >= new Date(test.date) &&
                    new Date() <=
                      new Date(test.date + test.duration * 60 * 1000) &&
                    !solvedTestNames.includes(test.name)
                )
                .map(test => {
                  return (
                    <ListGroup.Item className={classes.Item} key={test.name}>
                      <div
                        className={classes.Answers}
                        onClick={() => {
                          openAnswersHandler(test, subject.name);
                        }}
                      >
                        <div className={classes.AnswersItem}>
                          NAME: <b>{test.name}</b>
                        </div>{" "}
                        <div className={classes.AnswersItem}>
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
            {/* <div className={classes.Subject}>{subject.name}</div> */}
            <ListGroup className={classes.ListGroup}>{tests}</ListGroup>
          </ul>
        );
      });

  const futureTestsContainer =
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
                .sort((a, b) => ("" + a.name).localeCompare(b.name))
                .filter(
                  test =>
                    new Date(test.date) >
                    new Date(new Date() + test.duration * 60 * 1000)
                )
                .map(test => {
                  return (
                    <ListGroup.Item className={classes.Item} key={test.name}>
                      <div className={classes.FutureTest}>
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
            {/* <div className={classes.Subject}>{subject.name}</div> */}
            <ListGroup className={classes.ListGroup}>{tests}</ListGroup>
          </ul>
        );
      });

  const historicalTestsContainer =
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
                .sort((a, b) => b.date - a.date)
                .filter(test => {
                  return (
                    new Date(test.date + test.duration * 60 * 1000) <
                      new Date() || solvedTestNames.includes(test.name)
                  );
                })
                .map(test => {
                  const solvedTestMark =
                    props.studentData &&
                    props.studentData.marks
                      .map(mark => mark)
                      .filter(mark => mark.test.name === test.name)
                      .map(mark => mark.mark)[0];

                  return (
                    <ListGroup.Item className={classes.Item} key={test.name}>
                      <div
                        className={`${classes.Item} ${
                          solvedTestMark >= 50 ? classes.Passed : classes.Failed
                        }`}
                        onClick={() => {
                          openAnswersHandler(test, subject.name);
                        }}
                      >
                        <div className={classes.AnswersItem}>
                          NAME: <b>{test.name}</b>
                        </div>{" "}
                        <div className={classes.AnswersItem}>
                          DATE: <b>{new Date(test.date).toLocaleString()}</b>
                        </div>
                        <div className={classes.AnswersItem}>
                          MARK:{" "}
                          <b>{`${
                            solvedTestMark == null
                              ? "Not participated"
                              : solvedTestMark + "%"
                          }`}</b>
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
            <ListGroup className={classes.ListGroup}>{tests}</ListGroup>
          </ul>
        );
      });

  return (
    <div>
      <h5>Pending tests:</h5>
      {pendingTestsContainer}
      <h5>Your future tests:</h5>
      {futureTestsContainer}
      <h5>Your historical tests:</h5>
      {historicalTestsContainer}
      {show && (
        <StudentTest
          historical={historical}
          future={future}
          test={test}
          onShow={show}
          onHide={handleClose}
          onSubmit={handleSubmit}
          solvedTests={props.solvedTests}
        />
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    subjects: state.user.studentSubjects,
    tests: state.user.studentTests,
    solvedTests: state.user.studentSolvedTests,
    test: state.user.studentOpenedTest,
    studentData: state.user.student
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAnswersSubmit: test => dispatch(actions.addStudentAnswers(test)),
    onStudentLoad: userId => dispatch(actions.getStudentData(userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentTestsDashboard);
