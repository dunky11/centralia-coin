import React from "react";
import PropTypes from "prop-types";
import Link from "react-router-dom/Link";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  marginRight: {
    marginRight: theme.spacing.unit
  },
  menuLink: {
    textDecoration: "none",
    color: theme.palette.common.white
  }
});

function Navbar(props) {
  const { classes } = props;
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          TimCOIN
        </Typography>
        <Link to="/explorer" className={classes.menuLink}>
          <Button color="inherit" size="large" className={classes.marginRight}>
            Explorer
          </Button>
        </Link>
        <Link to="/wallet" className={classes.menuLink}>
          <Button color="inherit" size="large" className={classes.marginRight}>
            Wallet
          </Button>
        </Link>
        <Link to="/mine" className={classes.menuLink}>
          <Button color="inherit" size="large">
            Mine
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Navbar);
