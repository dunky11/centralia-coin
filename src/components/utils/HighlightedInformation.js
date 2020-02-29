import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

const styles = theme => ({
  main: {
    backgroundColor: "rgba(253, 200, 69, .2)",
    border: "2px solid rgba(253, 200, 69, .4)",
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius
  }
});

function HighlighedInformation(props) {
  const { className, children, classes } = props;
  return (
    <div className={classNames(classes.main, className ? className : null)}>
      <Typography>{children}</Typography>
    </div>
  );
}

HighlighedInformation.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.array
  ]),
  classes: PropTypes.object
};

export default withStyles(styles, { withTheme: true })(HighlighedInformation);
