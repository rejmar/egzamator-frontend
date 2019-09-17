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

const App = props => {
  useEffect(() => {
    props.onTryAutoSignup(props.userData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userData]);

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
    routes = (
      <Switch>
        <Route path="/" exact component={UserDashboard} />
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
    isAuthenticated: state.auth.token !== null,
    userData: state.user.userData
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
