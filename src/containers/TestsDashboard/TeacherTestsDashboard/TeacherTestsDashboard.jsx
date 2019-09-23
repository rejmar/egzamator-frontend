import React, { useState, useEffect } from "react";

import Test from "../../../components/Test/TeacherTest/TeacherTest";
import classes from "./TeacherTestsDashboard.module.css";
import * as actions from "../../../store/actions/index";

import { connect } from "react-redux";
import { Button, ListGroup } from "react-bootstrap";

const TeacherTestsDashboard = props => {
  const [show, setShow] = useState(false);
  const [subject, setSubject] = useState("");
  const [historical, setHistorical] = useState(false);
  const [test, setTest] = useState();

  useEffect(() => {
    props.onTeacherLoad(props.userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = testName => {
    setShow(false);
    console.log(testName);
    props.onTestDelete(testName, props.userId);
  };

  const openTestHandler = (test, subject) => {
    setHistorical(new Date(test.date) < new Date());

    const testToOpen = {
      ...test,
      subject
    };
    setTest(testToOpen);
    setShow(true);
  };

  const handleSubmit = test => {
    setShow(false);

    if (!test.isHistorical) {
      const newTest = { ...test, userId: props.userId };

      props.onTestSubmit(newTest);
      setHistorical(false);
      setTest(null);
      setSubject(null);
    } else {
      props.history.push({ pathname: "/subjects", state: { test: test } });
    }
  };

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
                .map(test => {
                  return (
                    <ListGroup.Item className={classes.Item} key={test.name}>
                      <div
                        className={classes.Test}
                        onClick={() => {
                          openTestHandler(test, subject.name);
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
            <ListGroup className={classes.ListGroup}>
              {tests}
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  const newTest = {
                    subject: subject.name,
                    name: null,
                    duration: null,
                    date: null,
                    questions: []
                  };
                  setTest(newTest);
                  handleShow();
                }}
              >
                Add new test
              </Button>
            </ListGroup>
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
                .filter(test => new Date(test.date) < new Date())
                .map(test => {
                  return (
                    <ListGroup.Item className={classes.Item} key={test.name}>
                      <div
                        className={classes.Test}
                        onClick={() => {
                          openTestHandler(test, subject.name);
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

  return (
    <div>
      <h5>Your future tests:</h5>
      {testsContainer}
      <h5>Your historical tests:</h5>
      {historicalTestsContainer}
      {show && (
        <Test
          historical={historical}
          test={test}
          onShow={show}
          onHide={handleClose}
          onDelete={handleDelete}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    subjects: state.user.teacherSubjects,
    tests: state.user.teacherTests,
    test: state.user.teacherOpenedTest
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTestSubmit: test => dispatch(actions.addNewTest(test)),
    onTestGet: userId => dispatch(actions.getTest(userId)),
    onTeacherLoad: userId => dispatch(actions.getTeacherData(userId)),
    onTestDelete: (testName, userId) =>
      dispatch(actions.deleteTest(testName, userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherTestsDashboard);
