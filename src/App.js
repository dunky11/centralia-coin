import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Navbar from "./components/navigation/Navbar";
import Wallet from "./components/wallet/Wallet";
import Explorer from "./components/explorer/Explorer";
import Mine from "./components/mine/Mine";
import TimChain from "./timchain/TimChain";

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
  },
  explorerPaper: {
    padding: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 4
  }
});

class App extends PureComponent {
  state = { timChain: null, chain: [], selectedTab: "Wallet" };

  updateChain = chain => {
    const copyChain = [...chain];
    this.setState({ chain: copyChain });
  };

  printContent = () => {
    const { selectedTab, timChain } = this.state;
    switch (selectedTab) {
      case "Wallet":
        return <Wallet timChain={timChain} />;
      case "Mine":
        return <Mine timChain={timChain} />;
      default:
        throw new Error("No branch selected in switch statement");
    }
  };

  switchTab = selectedTab => {
    this.setState({ selectedTab });
  };

  componentDidMount() {
    const timChain = new TimChain(4, this.updateChain);
    this.setState({ timChain });
  }

  render() {
    const { classes } = this.props;
    const { chain } = this.state;
    return (
      <Fragment>
        <Navbar switchTab={this.switchTab} />
        <div className={classes.flexBox}>
          <div className={classes.contentWrapper}>
            <Grid container justify="space-between">
              <Grid item xs={12} md={7}>
                <Paper className={classes.paperPaddingLeft}>
                  {this.printContent()}
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper className={classes.explorerPaper}>
                  <Explorer chain={chain} />
                </Paper>
              </Grid>
            </Grid>
          </div>
        </div>
      </Fragment>
    );
  }
}

App.propTypes = {
  location: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(App);
