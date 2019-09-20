import React, { useState, useEffect } from "react";

import Aux from "../../../hoc/Auxx";
import Modal from "../../../components/UI/Modal/Modal";

import { connect } from "react-redux";
import Test from "../Test/Test";

const TeacherTests = props => {
  const [creating, setCreating] = useState(false);

  const creationHandler = () => {
    // if (props.isAuthenticated) {
    //   setPurchasing(true);
    // } else {
    //   props.onSetAuthRedirectPath("/checkout");
    //   props.history.push("/auth");
    // }
    setCreating(true);
  };

  const creationCancelHandler = () => {
    setCreating(false);
  };

  const subjects = Array.from(props.teacherData.subjects.sort());

  console.log(subjects);

  const tests = subjects.map(subject => {
    const testsCount = subject.tests.length;
    console.log(subject);

    const tests = subject.tests.map(test => (
      <li key={test.name}>
        <a href="#">{test.name}</a>
      </li>
    ));
    return (
      <ul>
        <div>
          <b>
            {subject.name} ({testsCount})
          </b>
        </div>

        <br></br>
        {tests}
        <a href="#">
          <div>(+) Create new test</div>
        </a>
      </ul>
    );
  });

  return (
    <div>
      <h1>Your tests:</h1>
      {tests}
      <Aux>
        <Modal show={creating} modalClosed={creationCancelHandler}>
          {/* {orderSummary} */}
          {<Test />}
        </Modal>
      </Aux>
    </div>
  );
};

const mapStateToDispatch = state => {
  return {
    teacherData: state.user.teacher
  };
};

export default connect(mapStateToDispatch)(TeacherTests);
