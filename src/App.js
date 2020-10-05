import React, { useEffect, Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Layout from "./hoc/Layout/Layout";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";
import Spinner from "./components/UI/Spinner/Spinner";
import Home from "./components/Home/Home";
import UserDashboard from "./containers/UserDashboard/UserDashboard";

const App = (props) => {
  useEffect(() => {
    props.onTryAutoSignup(props.userData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Auth = React.lazy(() => {
    return import("./containers/Auth/Auth");
  });

  const TestsDashboard = React.lazy(() => {
    return import("./containers/TestsDashboard/TestsDashboard");
  });

  const MarksDashboard = React.lazy(() => {
    return import("./containers/MarksDashboard/MarksDashboard");
  });

  let routes = (
    <Switch>
      <Route path="/auth" render={(props) => <Auth {...props} />} />
      <Route path="/" exact component={Home} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    props.userRole === "ROLE_STUDENT"
      ? (routes = (
          <Switch>
            <Route path="/tests" exact component={TestsDashboard} />
            <Route path="/marks" exact component={MarksDashboard} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/" exact component={UserDashboard} />

            <Redirect to="/" />
          </Switch>
        ))
      : (routes = (
          <Switch>
            <Route path="/tests" component={TestsDashboard} />
            <Route path="/marks" exact component={MarksDashboard} />

            <Route path="/logout" exact component={Logout} />
            <Route path="/" exact component={UserDashboard} />
            <Redirect to="/" />
          </Switch>
        ));
  }
  return (
    <div>
      <Layout>
        <Suspense fallback={<Spinner />}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

App.propTypes = {
  userData: PropTypes.any,
  isAuthenticated: PropTypes.bool,
  userRole: PropTypes.string,
  onTryAutoSignup: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    userData: state.user.userData,
    userRole: state.user.role,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: (userData) => dispatch(actions.authCheckState(userData)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
