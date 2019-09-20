import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";
import Auxx from "../../../hoc/Auxx";

const navigationItems = props => {
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
      <NavigationItem link={"/subjects"}>Subjects</NavigationItem>
      <NavigationItem link={"/tests"}>Tests</NavigationItem>
      <NavigationItem link={"/logout"}>Logout</NavigationItem>
    </Auxx>
  );

  const authenticatedItems =
    props.userRole === "ROLE_STUDENT" ? studentItems : teacherItems;

  return (
    <ul className={classes.NavigationItems}>
      {props.isAuthenticated ? authenticatedItems : nonAuthenticatedItems}
    </ul>
  );
};

export default navigationItems;
