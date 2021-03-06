import React, { useState } from "react";
import { connect } from "react-redux";

import Aux from "../Auxx";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import classes from "./Layout.module.css";

const Layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(prevState => !prevState.showSideDrawer);
  };

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  return (
    <Aux>
      <Toolbar
        isAuth={props.isAuthenticated}
        role={props.role}
        drawerToggleClicked={sideDrawerToggleHandler}
      />
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={showSideDrawer}
        closed={sideDrawerClosedHandler}
      />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    role: state.user.role
  };
};

export default connect(mapStateToProps)(Layout);
