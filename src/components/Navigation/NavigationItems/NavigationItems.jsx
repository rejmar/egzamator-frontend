import React from "react";
import { connect } from "react-redux";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";
import Auxx from "../../../hoc/Auxx";

const NavigationItems = props => {
  const nonAuthenticatedItems = (
    <Auxx>
      <NavigationItem link={"/"} exact>
        Home
      </NavigationItem>
      <NavigationItem link={"/auth"}>Log in</NavigationItem>
    </Auxx>
  );

  const studentItems = (
    <Auxx>
      <NavigationItem link={"/"} exact>
        Home
      </NavigationItem>
      <NavigationItem link={"/tests"}>Tests</NavigationItem>
      <NavigationItem link={"/marks"}>Marks</NavigationItem>
      <NavigationItem link={"/logout"}>Logout</NavigationItem>
    </Auxx>
  );

  const teacherItems = (
    <Auxx>
      <NavigationItem link={"/"} exact>
        Home
      </NavigationItem>
      <NavigationItem link={"/tests"}>Tests</NavigationItem>
      <NavigationItem link={"/subjects"}>Subjects</NavigationItem>
      <NavigationItem link={"/logout"}>Logout</NavigationItem>
    </Auxx>
  );

  const authenticatedItems =
    props.role === "ROLE_STUDENT" ? studentItems : teacherItems;

  return (
    <ul className={classes.NavigationItems}>
      {props.isAuthenticated ? authenticatedItems : nonAuthenticatedItems}
    </ul>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    role: state.user.role
  };
};

export default connect(mapStateToProps)(NavigationItems);
