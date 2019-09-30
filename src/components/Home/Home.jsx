import React from "react";
import { connect } from "react-redux";
import classes from "./Home.module.css";

const Home = props => {
  return (
    <div className={classes.Main}>
      <h3>Welcome to Egzamator</h3>
      <div className={classes.Paragraph}>
        Egzamator is a web application for easy tests management for both
        students and teachers.
      </div>
      <div className={classes.Paragraph}>
        You can try Egzamator for free! Thanks to e-tests you are saving our
        Planet Earth and also saving yours and yours teachers time. Application
        supports mobile devices!
      </div>
      <div className={classes.Paragraph}>
        If you are already registered - log in and check whether your tests are
        running late! If you have never registered - sign up. It will take up to
        2 minutes!
      </div>
      <div className={classes.Paragraph}>For both, click LOG IN button.</div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Home);
