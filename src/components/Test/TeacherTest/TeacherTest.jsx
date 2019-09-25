/* eslint-disable no-loop-func */
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Modal, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import pl from "date-fns/locale/en-GB";
import { Formik } from "formik";
import * as yup from "yup";

import classes from "./TeacherTest.module.css";

const TeacherTest = props => {
  const [questions, setQuestions] = useState([]);
  const [testName, setTestName] = useState("");
  const [testStartDate, setTestStartDate] = useState(new Date());
  const [testDuration, setTestDuration] = useState(0);
  const [invalid, setInvalid] = useState(new Set());

  useEffect(() => {
    setQuestions(props.test.questions);

    const oldInvalid = new Set(invalid);
    !props.test.name && oldInvalid.add("name");
    !props.test.duration && oldInvalid.add("duration");

    if (props.test.questions.length === 0) {
      oldInvalid.add("description1");
      oldInvalid.add("ansA1");
      oldInvalid.add("ansB1");
      oldInvalid.add("ansC1");
      oldInvalid.add("ansD1");
      oldInvalid.add("correctAns1");
    }
    setInvalid(oldInvalid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  registerLocale("pl", pl);

  const addQuestionHandler = () => {
    const newQuestion = {
      id: questions.length + 1,
      description: "",
      ans_a: "",
      ans_b: "",
      ans_c: "",
      ans_d: "",
      correct_ans: ""
    };
    const newQuestions = [...questions, newQuestion];

    setQuestions(newQuestions);

    const oldInvalid = new Set(invalid);
    oldInvalid.add("description".concat(questions.length + 1));
    oldInvalid.add("ansA".concat(questions.length + 1));
    oldInvalid.add("ansB".concat(questions.length + 1));
    oldInvalid.add("ansC".concat(questions.length + 1));
    oldInvalid.add("ansD".concat(questions.length + 1));
    oldInvalid.add("correctAns".concat(questions.length + 1));

    setInvalid(oldInvalid);
  };

  const updateQuestionHandler = e => {
    const questionId = e.target.id.replace(/[^0-9]/g, "");
    const field = e.target.getAttribute("field");

    let oldQuestions = [...questions];
    let question = oldQuestions[questionId];

    question[field] = e.target.value;

    const updatedQuestions = [
      ...oldQuestions.slice(0, questionId),
      question,
      ...oldQuestions.slice(questionId + 1)
    ];

    setQuestions(updatedQuestions);
  };

  const handleDateChange = date => {
    setTestStartDate(date);
  };

  const submitHandler = event => {
    const test = {
      subject: event.test.subject,
      name: testName ? testName : event.test.name,
      date: testStartDate ? testStartDate : event.test.date,
      duration: testDuration ? testDuration : event.test.duration,
      questions: questions,
      isHistorical: testStartDate
        ? testStartDate < new Date()
        : event.test.date < new Date()
    };

    props.onSubmit(test);
  };

  const questionList = [];
  for (var i = 0; i < questions.length; ++i) {
    questionList.push(
      <Form.Group key={i} controlId={`formTestQuestion${i}`}>
        <Form.Label className={classes.questionItem}>
          <b>{`Question ${i + 1}`}</b>
        </Form.Label>
        <br />
        <Form.Label className={classes.questionItem}>
          {`Description`}
        </Form.Label>
        <Form.Control
          key={`description${i}`}
          type="text"
          placeholder={`${
            props.test.questions[i]
              ? props.test.questions[i].description
              : "Description"
          }`}
          defaultValue={`${
            props.test.questions[i] ? props.test.questions[i].description : ""
          }`}
          field="description"
          onBlur={e => {
            updateQuestionHandler(e);

            const oldInvalid = new Set(invalid);
            e.target.value.trim() === (null || "")
              ? oldInvalid.add("description".concat(i))
              : oldInvalid.delete("description".concat(i));
            setInvalid(oldInvalid);
          }}
          disabled={props.historical}
        />
        <Form.Label className={classes.questionItem}>{`Answer A`}</Form.Label>
        <Form.Control
          key={`ansA${i}`}
          type="text"
          placeholder={`${
            props.test.questions[i] ? props.test.questions[i].ans_a : "Answer A"
          }`}
          defaultValue={`${
            props.test.questions[i] ? props.test.questions[i].ans_a : ""
          }`}
          field="ans_a"
          onBlur={e => {
            updateQuestionHandler(e);

            const oldInvalid = new Set(invalid);
            e.target.value.trim() === (null || "")
              ? oldInvalid.add("ansA".concat(i))
              : oldInvalid.delete("ansA".concat(i));
            setInvalid(oldInvalid);
          }}
          disabled={props.historical}
        />
        <Form.Label className={classes.questionItem}>{`Answer B`}</Form.Label>
        <Form.Control
          key={`ansB${i}`}
          type="text"
          placeholder={`${
            props.test.questions[i] ? props.test.questions[i].ans_b : "Answer B"
          }`}
          defaultValue={`${
            props.test.questions[i] ? props.test.questions[i].ans_b : ""
          }`}
          field="ans_b"
          onBlur={e => {
            updateQuestionHandler(e);
            const oldInvalid = new Set(invalid);
            e.target.value.trim() === (null || "")
              ? oldInvalid.add("ansB".concat(i))
              : oldInvalid.delete("ansB".concat(i));
            setInvalid(oldInvalid);
          }}
          disabled={props.historical}
        />
        <Form.Label className={classes.questionItem}>{`Answer C`}</Form.Label>
        <Form.Control
          key={`ansC${i}`}
          type="text"
          placeholder={`${
            props.test.questions[i] ? props.test.questions[i].ans_c : "Answer C"
          }`}
          defaultValue={`${
            props.test.questions[i] ? props.test.questions[i].ans_c : ""
          }`}
          field="ans_c"
          onBlur={e => {
            updateQuestionHandler(e);
            const oldInvalid = new Set(invalid);
            e.target.value.trim() === (null || "")
              ? oldInvalid.add("ansC".concat(i))
              : oldInvalid.delete("ansC".concat(i));
            setInvalid(oldInvalid);
          }}
          disabled={props.historical}
        />
        <Form.Label className={classes.questionItem}>{`Answer D`}</Form.Label>
        <Form.Control
          key={`ansD${i}`}
          type="text"
          placeholder={`${
            props.test.questions[i] ? props.test.questions[i].ans_d : "Answer D"
          }`}
          defaultValue={`${
            props.test.questions[i] ? props.test.questions[i].ans_d : ""
          }`}
          field="ans_d"
          onBlur={e => {
            updateQuestionHandler(e);
            const oldInvalid = new Set(invalid);
            e.target.value.trim() === (null || "")
              ? oldInvalid.add("ansD".concat(i))
              : oldInvalid.delete("ansD".concat(i));
            setInvalid(oldInvalid);
          }}
          disabled={props.historical}
        />
        <Form.Label className={classes.questionItem}>
          {`Correct Answer`}
        </Form.Label>
        <Form.Control
          key={`correctAns${i}`}
          type="text"
          placeholder={`${
            props.test.questions[i]
              ? props.test.questions[i].correct_ans
              : "Correct Answer"
          }`}
          defaultValue={`${
            props.test.questions[i] ? props.test.questions[i].correct_ans : ""
          }`}
          maxLength={1}
          field="correct_ans"
          onBlur={e => {
            updateQuestionHandler(e);
            const oldInvalid = new Set(invalid);
            e.target.value.trim() === (null || "")
              ? oldInvalid.add("correctAns".concat(i))
              : oldInvalid.delete("correctAns".concat(i));
            setInvalid(oldInvalid);
          }}
          disabled={props.historical}
        />
      </Form.Group>
    );
  }

  return (
    <Modal show={props.onShow} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create test</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className={classes.Form} onSubmit={() => submitHandler(props)}>
          <Form.Group controlId="formTestSubject">
            <Form.Label className={classes.Label}>Subject</Form.Label>
            <Form.Control
              type="text"
              placeholder={props.test.subject}
              // defaultValue={props.test.subject}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="formTestName">
            <Form.Label className={classes.Label}>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder={`${props.test.name ? props.test.name : "Test Name"}`}
              // defaultValue={props.test.name}
              onBlur={e => {
                setTestName(e.target.value);
                const oldInvalid = new Set(invalid);
                e.target.value.trim() === (null || "")
                  ? oldInvalid.add("name")
                  : oldInvalid.delete("name");
                setInvalid(oldInvalid);
              }}
              disabled={props.historical}
            />
          </Form.Group>
          <Form.Group controlId="formTestDate">
            <div className={classes.DateGroup}>
              <Form.Label className={classes.Label}>Test Date</Form.Label>
              <DatePicker
                className={classes.DatePicker}
                selected={props.test.date ? props.test.date : testStartDate}
                onChange={date => {
                  handleDateChange(new Date(Date.parse(date)));
                  const oldInvalid = new Set(invalid);
                  date <= new Date()
                    ? oldInvalid.add("date")
                    : oldInvalid.delete("date");
                  setInvalid(oldInvalid);
                }}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="d MMMM, yyyy HH:mm"
                locale="pl"
                disabled={props.historical}
              />
            </div>
          </Form.Group>
          <Form.Group controlId="formTestDuration">
            <Form.Label className={classes.Label}>
              Duration (in minutes)
            </Form.Label>
            <Form.Control
              type="number"
              placeholder={`${
                props.test.duration ? props.test.duration : "Test Duration"
              }`}
              defaultValue={props.test.duration}
              onBlur={e => {
                setTestDuration(e.target.value);
                const oldInvalid = new Set(invalid);
                e.target.value.trim() == (null || undefined || "" || 0)
                  ? oldInvalid.add("duration")
                  : oldInvalid.delete("duration");
                setInvalid(oldInvalid);
              }}
              disabled={props.historical}
            />
          </Form.Group>
          <Form.Label className={classes.Label}>Questions</Form.Label>
          <Form.Group controlId="formTestQuestions">
            {questionList}

            {!props.historical && (
              <Button variant="primary" size="sm" onClick={addQuestionHandler}>
                Add question
              </Button>
            )}
          </Form.Group>
          <Form.Group>
            <div className={classes.Buttons}>
              <div className={classes.Button}>
                <Button variant="light" onClick={props.onHide}>
                  Close
                </Button>
              </div>
              {!props.historical &&
                invalid.size === 0 &&
                testStartDate >
                  new Date(new Date() + testDuration * 60 * 1000) && (
                  <div className={classes.Button}>
                    <Button
                      variant="danger"
                      onClick={() => props.onDelete(props.test.name)}
                    >
                      Remove
                    </Button>
                  </div>
                )}
              {!props.historical && invalid.size === 0 && (
                <div className={classes.Button}>
                  <Button variant="success" type="submit">
                    Submit
                  </Button>
                </div>
              )}
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TeacherTest;
