import React, { useEffect } from "react";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";

const Test = props => {
  useEffect(() => {});
  return (
    <div>
      <h5>Welcome on particular test</h5>
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
