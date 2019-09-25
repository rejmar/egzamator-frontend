import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import ReactDataGrid from "react-data-grid";

import * as actions from "../../../store/actions/index";
import classes from "./TeacherSubjectsDashboard.module.css";

const TeacherSubjectsDashboard = props => {
  const [subject, setSubject] = useState();
  console.log(props);

  useEffect(() => {
    props.onPageLoad(props.userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { key: "id", name: "STUDENT", width: "100" },
    { key: "title", name: "Title", width: "100" },
    { key: "count", name: "Count", width: "100" }
  ];

  const rows = [
    { id: 0, title: "row1", count: 20 },
    { id: 1, title: "row1", count: 40 },
    { id: 2, title: "row1", count: 60 },
    { id: 3, title: "row1", count: 60 },
    { id: 4, title: "row1", count: 60 },
    { id: 5, title: "row1", count: 60 }
  ];

  const subjectsContainer = subject => {
    // const rows = subject;
    // const columns = {}
    let columns = [
      { key: "id", name: "No", width: 40 },
      { key: "student", name: "Index Number", width: 125 }
    ];

    let rows = [];
    let indexNumber = null;
    let tests = new Map();

    props.tests &&
      Object.keys(props.tests).map((value, key) => {
        const subjectTests = props.tests[value];

        if (value === subject) {
          let testCounter = 1;
          let allTests = [];
          let sum = 0;
          let avg = 0;
          subjectTests.map(test => {
            let testResult = null;
            columns = [
              ...columns,
              {
                key: `test${testCounter++}`,
                name: test.name,
                width: test.name.length * 12
              }
            ];

            allTests.push(test.name);

            props.studentsData &&
              props.studentsData.map(student => {
                indexNumber = student.id;
                student.marks.map(mark => {
                  if (test.name === mark.test.name) {
                    testResult = mark.mark;
                    sum = sum + testResult;
                    tests.set(test.name, mark.mark);
                  }
                });
              });

            allTests.map(test => {
              !tests.has(test) && tests.set(test, 0);
            });

            rows = [
              ...rows,
              { id: props.studentsData.length, student: indexNumber }
            ];
          });

          columns = [...columns, { key: "avg", name: "Average", width: 85 }];
        }
      });

    console.log(columns.length);

    // props.studentsData && props.studentsData.map(student => {
    // student.marks.test.name
    // })

    return (
      <ul key={subject.name}>
        <div className={classes.Table}>
          <b>{subject.name}</b>
          <ReactDataGrid
            className={classes.Cell}
            columns={columns}
            rowGetter={i => rows[i]}
            rowsCount={20}
            minHeight={350}
            minColumnWidth={50}
          />
        </div>
      </ul>
    );
  };

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          {!subject ? "Choose subject" : subject}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {props.subjects &&
            props.subjects.map(subject => {
              return (
                <Dropdown.Item
                  key={subject.name}
                  onClick={() => {
                    setSubject(subject.name);
                    props.onSubjectChange(subject.name);
                  }}
                >
                  {subject.name}
                </Dropdown.Item>
              );
            })}
        </Dropdown.Menu>
      </Dropdown>
      {subject && subjectsContainer(subject)}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    subjects: state.user.teacherSubjects,
    tests: state.user.teacherTests,
    studentsData: state.user.studentsMarks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPageLoad: userId => dispatch(actions.getTeacherSubjects(userId)),
    onSubjectChange: subjectName =>
      dispatch(actions.getStudentsMarks(subjectName))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherSubjectsDashboard);
