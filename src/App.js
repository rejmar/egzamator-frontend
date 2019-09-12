import React, { useEffect, Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import SandwichBuilder from "./containers/SandwichBuilder/SandwichBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";
import spinner from "./components/UI/Spinner/Spinner";

const App = props => {
  useEffect(() => {
    props.onTryAutoSignup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Orders = React.lazy(() => {
    return import("./containers/Orders/Orders");
  });
  const Checkout = React.lazy(() => {
    return import("./containers/Checkout/Checkout");
  });
  const Auth = React.lazy(() => {
    return import("./containers/Auth/Auth");
  });

  let routes = (
    <Switch>
      <Route path="/" exact component={SandwichBuilder} />
      <Route path="/auth" render={props => <Auth {...props} />} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/" exact component={SandwichBuilder} />
        <Route path="/orders" exact render={props => <Orders {...props} />} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/auth" render={props => <Auth {...props} />} />
        <Route path="/checkout" render={props => <Checkout {...props} />} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <div>
      <Layout>
        <Suspense fallback={"Loading...."}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
