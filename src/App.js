import React, { Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Switch from "react-router-dom/Switch";
import Grid from "@material-ui/core/Grid";
import withRouter from "react-router-dom/withRouter";
import Navbar from "./components/navigation/Navbar";
import PropsRoute from "./components/utils/PropsRoute";
import Wallet from "./components/wallet/Wallet";
import Explorer from "./components/explorer/Explorer";
import Mine from "./components/mine/Mine";

const styles = theme => ({
  contentWrapper: {
    maxWidth: 1400,
    width: "100%",
    marginLeft: theme.spacing.unit,
    marginRiht: theme.spacing.unit
  },
  flexBox: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    justifyContent: "center"
  },
  fullWidth: {
    width: "100%"
  },
  paperPaddingLeft: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    width: "100%"
  }
});

function App(props) {
  const { location, classes } = props;
  return (
    <Fragment>
      <Navbar />
      <div className={classes.flexBox}>
        <div className={classes.contentWrapper}>
          <Grid container justify="space-between">
            <Grid item xs={12} md={7}>
              <Paper className={classes.paperPaddingLeft}>
                <Switch>
                  <PropsRoute
                    location={location}
                    path="/wallet"
                    component={Wallet}
                  />
                  <PropsRoute
                    location={location}
                    path="/mine"
                    component={Mine}
                  />
                  <PropsRoute
                    location={location}
                    path=""
                    component={Explorer}
                  />
                </Switch>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper className={classes.fullWidth}>Hallo Welt!</Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    </Fragment>
  );
}

App.propTypes = {
  location: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles, { withTheme: true })(App));
