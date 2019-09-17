import React from "react";
import egzamatorLogo from "../../assets/images/egzamator-logo.jpg";
import classes from "./Logo.module.css";
const logo = props => (
  <div className={classes.Logo}>
    <img src={egzamatorLogo} alt="MyEgzamatorLogo" />
  </div>
);

export default logo;
