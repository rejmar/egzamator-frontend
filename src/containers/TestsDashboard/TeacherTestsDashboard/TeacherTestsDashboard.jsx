import React, { useState, useEffect } from "react";

import Test from "../../../components/Test/TeacherTest/TeacherTest";
import classes from "./TeacherTestsDashboard.module.css";
import * as actions from "../../../store/actions/index";

import { connect } from "react-redux";
import { Button, ListGroup } from "react-bootstrap";

const TeacherTestsDashboard = props => {
  const [show, setShow] = useState(false);
  const [subject, setSubject] = useState("");
  const [exist, setExist] = useState(false);
  const [test, setTest] = useState();

  useEffect(() => {
    props.onTeacherLoad(props.userId);
    // setSubjects(props.onTeacherLoad(props.userId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const openTestHandler = (test, subject) => {
    setExist(true);

    const testToOpen = {
      ...test,
      subject
    };
    setTest(testToOpen);
    setShow(true);
  };

  const handleSubmit = test => {
    setShow(false);
    const newTest = { ...test, userId: props.userId };
    console.log(newTest);

    props.onTestSubmit(newTest);
    setExist(false);
    setTest(null);
    setSubject(null);
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
                .sort((a, b) => ("" + a.name).localeCompare(b.name))
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

  return (
    <div>
      {testsContainer}
      {show && (
        <Test
          exist={exist}
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
    subjects: state.user.teacherSubjects,
    tests: state.user.teacherTests,
    test: state.user.teacherOpenedTest
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTestSubmit: test => dispatch(actions.addNewTest(test)),
    onTestGet: userId => dispatch(actions.getTest(userId)),
    onTeacherLoad: userId => dispatch(actions.getTeacherData(userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherTestsDashboard);
