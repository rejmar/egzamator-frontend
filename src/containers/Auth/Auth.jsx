import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as validationUtils from "../../common/ValidationUtils";

const Auth = props => {
  const [registerControls, setRegisterControls] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Email address"
      },
      value: "",
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    indexNumber: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Index number"
      },
      value: "",
      validation: {
        required: true,
        isNumeric: true,
        minLength: 4
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password"
      },
      value: "",
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    },
    password2: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Check password"
      },
      value: "",
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    }
  });
  const [loginControls, setLoginControls] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Email address"
      },
      value: "",
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password"
      },
      value: "",
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    }
  });
  const [isSignup, setIsSignup] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (props.authRedirectPath !== "/") {
      props.onSetAuthRedirectPath();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignup]);

  const inputChangedHandler = (event, controls, controlName) => {
    const updatedControls = {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value: event.target.value,
        valid: validationUtils.checkValidity(
          event.target.value,
          controls[controlName].validation
        ),
        touched: true
      }
    };

    let isFormValid = Object.keys(updatedControls)
      .map((value, key) => {
        const controlEl = updatedControls[value];

        return controlEl.valid;
      })
      .every(el => el === true);

    setIsFormValid(isFormValid);

    isSignup
      ? setRegisterControls(updatedControls)
      : setLoginControls(updatedControls);
  };

  const submitHandler = event => {
    event.preventDefault();

    props.onAuth(
      controls.email.value,
      controls.password.value,
      isSignup ? controls.indexNumber.value : -1,
      isSignup
    );
  };

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };

  const formElementsArray = [];

  let controls = isSignup ? registerControls : loginControls;

  for (let key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key]
    });
  }

  let form = formElementsArray.map(formElement => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={event => inputChangedHandler(event, controls, formElement.id)}
    />
  ));

  let errorMessage = null;

  let passwords = form.filter(el => el.key.includes("password"));

  let passCheck = passwords
    .map(password => password.props.value)
    .every(password => password === passwords[0].props.value);

  let valid = isFormValid && passCheck ? true : false;

  if (props.loading) {
    form = <Spinner />;
  }

  if (!passCheck) {
    errorMessage = <p>Passwords are not equal</p>;
  }

  if (props.error) {
    if (props.error.message) {
      errorMessage = <p>Error: {props.error.message}</p>;
    } else {
      errorMessage = <p>Error: {props.error}</p>;
    }
  }

  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <Button
          clicked={submitHandler}
          disabled={!valid}
          btnType={valid ? "Success" : "Danger"}
        >
          Submit
        </Button>
      </form>
      <Button clicked={switchAuthModeHandler} btnType="Text">
        {isSignup
          ? "Already a member? Click to log in"
          : "Not registered? Click to sign up"}
      </Button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, indexNumber, isSignup) =>
      dispatch(actions.auth(email, password, indexNumber, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
