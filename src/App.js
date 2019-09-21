import React, { useEffect, Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import SandwichBuilder from "./containers/SandwichBuilder/SandwichBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";
import spinner from "./components/UI/Spinner/Spinner";
import Home from "./containers/Home/Home";
import UserDashboard from "./containers/UserDashboard/UserDashboard";
import TestsDashboard from "./containers/TestsDashboard/TestsDashboard";

const App = props => {
  useEffect(() => {
    props.onTryAutoSignup(props.userData);
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
      <Route path="/" exact component={Home} />
      <Route path="/auth" render={props => <Auth {...props} />} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    props.userRole === "ROLE_STUDENT"
      ? (routes = (
          <Switch>
            <Route path="/" exact component={UserDashboard} />
            <Route path="/tests" exact component={TestsDashboard} />
            {/* <Route path="/subjects" exact component={Subjects} /> */}

            <Route path="/logout" exact component={Logout} />
            <Redirect to="/" />
          </Switch>
        ))
      : (routes = (
          <Switch>
            <Route path="/" exact component={UserDashboard} />
            <Route path="/tests" exact component={TestsDashboard} />
            {/* <Route path="/subjects" exact component={Subjects} /> */}
            <Route path="/logout" exact component={Logout} />
            <Redirect to="/" />
          </Switch>
        ));
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
    isAuthenticated: state.auth.token !== null,
    userData: state.user.userData,
    userRole: state.user.role
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: userData => dispatch(actions.authCheckState(userData))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
