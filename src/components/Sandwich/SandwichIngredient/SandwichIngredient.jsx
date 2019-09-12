import React from "react";
import classes from "./SandwichIngredient.module.css";
import PropTypes from "prop-types";

const sandwichIngredient = props => {
  let ingredient = null;

  switch (props.type) {
    case "bread-bottom":
      ingredient = <div className={classes.BreadBottom} />;
      break;
    case "bread-top":
      ingredient = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1} />
          <div className={classes.Seeds2} />
        </div>
      );
      break;
    case "meat":
      ingredient = <div className={classes.Meat} />;
      break;
    case "cheese":
      ingredient = <div className={classes.Cheese} />;
      break;
    case "salad":
      ingredient = <div className={classes.Salad} />;
      break;
    case "bacon":
      ingredient = <div className={classes.Bacon} />;
      break;
    case "pomidor":
      ingredient = <div className={classes.Pomidor} />;
      break;
    default:
      ingredient = null;
  }
  return ingredient;
};

sandwichIngredient.propTypes = {
  type: PropTypes.string.isRequired
};
export default sandwichIngredient;
