import React, { useState, useEffect } from "react";

import StudentTest from "../../../components/Test/StudentTest/StudentTest";
import classes from "./StudentTestsDashboard.module.css";
import * as actions from "../../../store/actions/index";

import { connect } from "react-redux";
import { Button, ListGroup } from "react-bootstrap";

const StudentTestsDashboard = props => {
  const [show, setShow] = useState(false);
  const [subject, setSubject] = useState("");
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
    setHistorical(new Date(test.date + test.duration * 60 * 1000) < new Date());

    const testToOpen = {
      ...test,
      subject
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
      setSubject(null);
    } else {
      props.history.push({ pathname: "/tests", state: { test: object } });
    }
  };

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
                      new Date(test.date + test.duration * 60 * 1000)
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
                .sort((a, b) => ("" + a.name).localeCompare(b.name))
                .filter(
                  test =>
                    new Date(test.date + test.duration * 60 * 1000) < new Date()
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
    test: state.user.studentOpenedTest
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAnswersSubmit: test => dispatch(actions.addStudentAnswers(test)),
    // onAnswersGet: userId => dispatch(actions.getAnswers(userId)),
    onStudentLoad: userId => dispatch(actions.getStudentData(userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentTestsDashboard);
