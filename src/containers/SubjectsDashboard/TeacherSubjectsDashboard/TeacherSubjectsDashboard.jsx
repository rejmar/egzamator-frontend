import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import ReactDataGrid from "react-data-grid";

import * as actions from "../../../store/actions/index";
import classes from "./TeacherSubjectsDashboard.module.css";

const TeacherSubjectsDashboard = props => {
  const [subject, setSubject] = useState();

  useEffect(() => {
    props.onPageLoad(props.userId);
    // setSubject
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const columns = [
    { key: "id", name: "STUDENT" },
    { key: "title", name: "Title" },
    { key: "count", name: "Count" }
  ];

  const rows = [
    { id: 0, title: "row1", count: 20 },
    { id: 1, title: "row1", count: 40 },
    { id: 2, title: "row1", count: 60 }
  ];

  const subjectsContainer =
    props.subjects &&
    props.subjects
      .sort((a, b) => a.name < b.name)
      .map(subject => {
        // const tests =
        //   props.tests &&
        //   Object.keys(props.tests).map((value, key) => {
        //     const subjectTests = props.tests[value];

        //     if (subject.name === value) {
        //       return subjectTests
        //         .sort((a, b) => ("" + a.name).localeCompare(b.name))
        //         .filter(test => new Date(test.date) > new Date())
        //         .map(test => {
        //           return (
        //             <ListGroup.Item className={classes.Item} key={test.name}>
        //               <div
        //                 className={classes.Test}
        //                 onClick={() => {
        //                   openTestHandler(test, subject.name);
        //                 }}
        //               >
        //                 <div className={classes.TestItem}>
        //                   NAME: <b>{test.name}</b>
        //                 </div>{" "}
        //                 <div className={classes.TestItem}>
        //                   DATE: <b>{new Date(test.date).toLocaleString()}</b>
        //                 </div>
        //               </div>
        //             </ListGroup.Item>
        //           );
        //         });
        //     }
        //     return null;
        //   });

        return (
          <ul key={subject.name}>
            <div className={classes.Table}>
              <b>{subject.name}</b>
              <ReactDataGrid
                columns={columns}
                rowGetter={i => rows[i]}
                rowsCount={3}
                minHeight={150}
                sortable={true}
              />
            </div>
            {/* <ListGroup className={classes.ListGroup}>
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
            </ListGroup> */}
          </ul>
        );
      });

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          {!props.subject && "Choose subject"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {props.subjects &&
            props.subjects.map(subject => {
              return (
                <Dropdown.Item
                  key={subject.name}
                  onClick={() => setSubject(subject.name)}
                >
                  {subject.name}
                </Dropdown.Item>
              );
              //console.log(subject);
              //return null;
            })}
        </Dropdown.Menu>
      </Dropdown>
      {subject}
      {subjectsContainer}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    subjects: state.user.teacherSubjects
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPageLoad: userId => dispatch(actions.getTeacherSubjects(userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherSubjectsDashboard);
