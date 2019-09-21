import React, { useEffect } from "react";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";

const Test = props => {
  useEffect(() => {});
  console.log(props);
  return (
    <div>
      <h1>Welcome on particular test</h1>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onTestOpen: id => dispatch(actions.getTest(id))
    // onTestCreation:
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Test);
