import React, { useState, useEffect } from "react";

import Tests from "../../../components/Tests/Tests";
import classes from "./TeacherTestsDashboard.module.css";
import * as actions from "../../../store/actions/index";

import { connect } from "react-redux";
import { Button, Modal, Form, ListGroup } from "react-bootstrap";

const TeacherTests = props => {
  const [show, setShow] = useState(false);
  const [subject, setSubject] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const handleSubmit = props => {
    setShow(false);
    console.log(props);
  };

  const subjects = Array.from(props.teacherData.subjects.sort());

  const testsContainer = subjects.map(subject => {
    const testsCount = subject.tests.length;

    const tests = subject.tests.map(test => (
      <ListGroup.Item className={classes.Item} key={test.id}>
        <a href="#">{test.name}</a>
      </ListGroup.Item>
    ));
    return (
      <ul>
        <div>
          <b>
            {subject.name} ({testsCount})
          </b>
        </div>
        <br />
        <ListGroup className={classes.ListGroup}>
          {tests}
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setSubject(subject.name);
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
      <h1>Your tests:</h1>
      {testsContainer}
      {show && (
        <Tests
          subject={subject}
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
    teacherData: state.user.teacher
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTestSubmit: () => dispatch(actions.addNewTest())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherTests);
