import React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  withStyles
} from "@material-ui/core";

const styles = theme => ({
  logo: {
    flexGrow: 1,
    fontFamily: "Rubik",
    fontWeight: 700
  },
  marginRight: {
    marginRight: theme.spacing(1)
  },
  menuLink: {
    textDecoration: "none",
    color: theme.palette.common.white
  }
});

function Navbar(props) {
  const { classes, switchTab } = props;
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.logo}>
          Centralia Coin
        </Typography>
        <Button
          color="inherit"
          size="large"
          className={classes.marginRight}
          onClick={() => {
            switchTab("Wallet");
          }}
        >
          Wallet
        </Button>
        <Button
          color="inherit"
          size="large"
          onClick={() => {
            switchTab("Mine");
          }}
        >
          Mine
        </Button>
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  switchTab: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(Navbar);
