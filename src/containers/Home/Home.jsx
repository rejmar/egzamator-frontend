import React from "react";
import { connect } from "react-redux";

const Home = props => {
  let content = "Not logged user content";

  if (props.isAuthenticated) {
    content = "Logged user content";
  }

  return (
    <div>
      <p>Welcome in Egzamator</p>
      <div>
        Egzamator is a web application for managing test easier for both
        students and teachers.
      </div>

      <br />

      {content}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Home);
