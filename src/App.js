import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Navbar from "./components/navigation/Navbar";
import Wallet from "./components/wallet/Wallet";
import Explorer from "./components/explorer/Explorer";
import Mine from "./components/mine/Mine";
import Blockchain from "./blockchain/Blockchain";

const styles = theme => ({
  contentWrapper: {
    maxWidth: 1400,
    width: "100%",
    marginLeft: theme.spacing(1),
    marginRiht: theme.spacing(1)
  },
  flexBox: {
    marginTop: theme.spacing(8),
    display: "flex",
    justifyContent: "center"
  },
  fullWidth: {
    width: "100%"
  },
  paperPaddingLeft: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    width: "100%"
  },
  explorerPaper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(4)
  }
});

class App extends PureComponent {
  state = {
    blockchain: new Blockchain(4, this.updateChain),
    chain: [],
    selectedTab: "Wallet"
  };

  updateChain = chain => {
    const copyChain = [...chain];
    this.setState({ chain: copyChain });
  };

  printContent = () => {
    const { selectedTab, blockchain } = this.state;
    switch (selectedTab) {
      case "Wallet":
        return <Wallet blockchain={blockchain} />;
      case "Mine":
        return <Mine blockchain={blockchain} />;
      default:
        throw new Error("No branch selected in switch statement");
    }
  };

  switchTab = selectedTab => {
    this.setState({ selectedTab });
  };

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
