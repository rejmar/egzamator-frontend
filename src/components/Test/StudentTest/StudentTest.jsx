import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Modal, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import pl from "date-fns/locale/en-GB";

import classes from "./StudentTest.module.css";

const StudentTest = props => {
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [testName, setTestName] = useState("");
  const [testStartDate, setTestStartDate] = useState();
  const [testDuration, setTestDuration] = useState(0);

  useEffect(() => {
    setQuestions(props.test.questions);
    // const answers = props.test.questions.map(question => ({
    //   id: question.id,
    //   answer: null
    // }));
    // setAnswers(answers);
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
  };

  const addAnswerHandler = event => {
    // console.log(e);
    const questionId = event.target.id.replace(/[^0-9]/g, "");
    const id = props.test.questions[questionId].id;

    let oldAnswers = [...answers];

    const newAnswer = {
      id: id,
      answer: event.target.value
    };

    const updatedAnswers = [
      ...oldAnswers.slice(0, questionId),
      newAnswer,
      ...oldAnswers.slice(questionId + 1)
    ];

    setAnswers(updatedAnswers);
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

  const submitHandler = event => {
    const studentTest = {
      subject: event.test.subject,
      name: testName ? testName : event.test.name,
      questions: questions,
      answers: answers
    };
    !props.historical && props.onSubmit(studentTest);
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
          disabled
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
          disabled
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
          disabled
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
          disabled
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
          disabled
        />
        <Form.Label className={classes.questionItem}>
          {`Your Answer`}
        </Form.Label>
        <Form.Control
          key={`yourAns${i}`}
          type="text"
          placeholder={"Your Answer"}
          maxLength={1}
          onBlur={addAnswerHandler}
          field="student_ans"
          disabled={props.historical}
        />
      </Form.Group>
    );
  }
  return (
    <Modal show={props.onShow} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {props.historical ? "Review test" : "Solve test"}
        </Modal.Title>
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
              disabled
            />
          </Form.Group>
          {props.historical && (
            <Form.Group controlId="formTestDate">
              <div className={classes.DateGroup}>
                <Form.Label className={classes.Label}>Test Date</Form.Label>
                <DatePicker
                  className={classes.DatePicker}
                  selected={props.test.date ? props.test.date : testStartDate}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="d MMMM, yyyy HH:mm"
                  locale="pl"
                  disabled
                />
              </div>
            </Form.Group>
          )}
          {props.historical && (
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
                disabled
              />
            </Form.Group>
          )}
          <Form.Label className={classes.Label}>Questions</Form.Label>
          <Form.Group controlId="formTestQuestions">{questionList}</Form.Group>
          <Form.Group>
            <Button variant="light" onClick={props.onHide}>
              Close
            </Button>
            {!props.historical &&
              (answers.length === questions.length && (
                <Button variant={"success"} type="submit">
                  Submit
                </Button>
              ))}
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default StudentTest;
