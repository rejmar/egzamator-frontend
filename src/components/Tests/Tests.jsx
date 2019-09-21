import React, { useState, useRef } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { GoTrashcan } from "react-icons/go";

import classes from "./Tests.module.css";

const Tests = props => {
  // const [questionsCount, setQuestionsCount] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState();

  const testNameRef = useRef("");
  const questionsRef = useRef();

  const addQuestionHandler = () => {
    // setQuestionsCount(prevState => prevState + 1);

    const newQuestion = [
      { label: "description", value: "" },
      { label: "answer_a", value: "" },
      { label: "answer_b", value: "" },
      { label: "answer_c", value: "" },
      { label: "answer_d", value: "" },
      { label: "correct_answer", value: "" }
    ];

    const newQuestions = [...questions, newQuestion];

    setQuestions(newQuestions);
  };

  const updateQuestionHandler = e => {
    const questionId = e.target.id.replace(/[^0-9]/g, "");
    const field = e.target.placeholder.toLowerCase().replace(" ", "_");

    let oldQuestions = [...questions];
    let question = oldQuestions[questionId];
    let questionFieldIndex = question.findIndex(
      question => question.label === field
    );

    const updatedFields = [
      ...question,
      { label: field, value: e.target.value }
    ];
    const updatedQuestion = [
      ...updatedFields.slice(0, questionFieldIndex),
      ...updatedFields.slice(questionFieldIndex + 1)
    ];

    const updatedQuestions = [
      ...oldQuestions.slice(0, questionId),
      updatedQuestion,
      ...oldQuestions.slice(questionId + 1)
    ];

    setQuestions(updatedQuestions);
    console.log(updatedQuestions);
  };

  const deleteQuestionHandler = id => {
    console.log(id);
    const index = id - 1;
    const oldQuestions = [...questions];
    const updatedQuestions = oldQuestions.splice(index, 1);

    setQuestions(updatedQuestions);

    console.log(updatedQuestions);
  };

  const questionList = [];

  for (var i = 0; i < questions.length; ++i) {
    questionList.push(
      <Form.Group key={i} controlId={`formTestQuestion${i}`}>
        <Form.Label className={classes.questionItem}>
          {`Question ${i + 1}`}{" "}
          <GoTrashcan color="red" onClick={() => deleteQuestionHandler(i)} />
        </Form.Label>
        <Form.Control
          key={`description${i}`}
          type="text"
          placeholder="Description"
          onBlur={updateQuestionHandler}
        />
        <Form.Control
          key={`ansA${i}`}
          type="text"
          placeholder="Answer A"
          onBlur={updateQuestionHandler}
        />
        <Form.Control
          key={`ansB${i}`}
          type="text"
          placeholder="Answer B"
          onBlur={updateQuestionHandler}
        />
        <Form.Control
          key={`ansC${i}`}
          type="text"
          placeholder="Answer C"
          onBlur={updateQuestionHandler}
        />
        <Form.Control
          key={`ansD${i}`}
          type="text"
          placeholder="Answer D"
          onBlur={updateQuestionHandler}
        />
        <Form.Control
          key={`correctAns${i}`}
          type="text"
          placeholder="Correct answer"
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
        <Form
          className={classes.Form}
          ref={testNameRef}
          onSubmit={() => props.onSubmit(props)}
        >
          <Form.Group controlId="formTestSubject">
            <Form.Label className={classes.Label}>Subject</Form.Label>
            <Form.Control type="text" placeholder={props.subject} disabled />
          </Form.Group>
          <Form.Group controlId="formTestName">
            <Form.Label className={classes.Label}>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter test name" />
          </Form.Group>
          <Form.Label className={classes.Label}>Questions</Form.Label>
          <Form.Group controlId="formTestQuestions" ref={questionsRef}>
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

export default Tests;
