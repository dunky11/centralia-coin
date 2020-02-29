import React from "react";
import PropTypes from "prop-types";
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
        <Typography variant="h6" color="inherit" className={classes.grow}>
          <b>Centralia Coin</b> - The not so decentralized cryptocurrency
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
