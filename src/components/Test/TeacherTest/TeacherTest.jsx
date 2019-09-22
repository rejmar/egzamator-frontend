import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Modal, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import en from "date-fns/locale/en-GB";

import classes from "./TeacherTest.module.css";

const Test = props => {
  const [questions, setQuestions] = useState([]);
  const [testName, setTestName] = useState("");
  const [testStartDate, setTestStartDate] = useState();
  const [testDuration, setTestDuration] = useState(0);

  useEffect(() => {
    setQuestions(props.test.questions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  registerLocale("en", en);

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
      questions: questions
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
          onBlur={updateQuestionHandler}
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
          onBlur={updateQuestionHandler}
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
          onBlur={updateQuestionHandler}
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
          onBlur={updateQuestionHandler}
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
          onBlur={updateQuestionHandler}
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
          onBlur={updateQuestionHandler}
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
              defaultValue={props.test.subject}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="formTestName">
            <Form.Label className={classes.Label}>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder={`${props.test.name ? props.test.name : "Test Name"}`}
              defaultValue={props.test.name}
              onBlur={e => setTestName(e.target.value)}
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
                }}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="d MMMM, yyyy HH:mm"
                locale="en"
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
              onBlur={e => setTestDuration(e.target.value)}
            />
          </Form.Group>
          <Form.Label className={classes.Label}>Questions</Form.Label>
          <Form.Group controlId="formTestQuestions">
            {questionList}

            <Button variant="primary" size="sm" onClick={addQuestionHandler}>
              Add question
            </Button>
          </Form.Group>
          <Form.Group>
            <Button variant="light" onClick={props.onHide}>
              Close
            </Button>

            <Button variant="success" type="submit">
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Test;
