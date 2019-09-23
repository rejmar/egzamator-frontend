import React from "react";
import classes from "./Button.module.css";
import { Button } from "react-bootstrap";

const button = props => (
  <Button
    disabled={props.disabled}
    onClick={props.clicked}
    variant={`${
      props.btnType === "Success"
        ? "success"
        : props.btnType === "Danger" && "danger"
    }`}
    className={[classes.Button, classes[props.btnType]].join(" ")}
  >
    {props.children}
  </Button>
);

export default button;
