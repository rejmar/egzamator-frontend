import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Order from "../../components/Order/Order";
import axios from "../../axios-tests";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

const tests = props => {
  useEffect(() => {
    // props.onFetchtests
  (props.token, props.userId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let tests
 = <Spinner />;
  if (!props.loading) {
    tests
   = props.tests
  .map(order => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}
      />
    ));
  }
  return <div>{tests
}</div>;
};

const mapStateToProps = state => {
  return {
    tests
  : state.order.tests
  ,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchtests
  : (token, userId) => dispatch(actions.fetchtests
    (token, userId))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(tests
, axios));
