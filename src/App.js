import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import { Paper, Grid, withStyles } from "@material-ui/core";
import Navbar from "./components/navigation/Navbar";
import Wallet from "./components/wallet/Wallet";
import Explorer from "./components/explorer/Explorer";
import Mine from "./components/mine/Mine";
import jsonToBlockchain from "./blockchain/jsonToBlockchain";
import Blockchain from "./blockchain/Blockchain";

const styles = theme => ({
  contentWrapper: {
    maxWidth: 1600,
    width: "100%",
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    }
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
    padding: theme.spacing(2),
    width: "100%"
  },
  leftContent: {
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(3)
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: theme.spacing(1)
    }
  }
});

class App extends PureComponent {
  state = {
    blockchain: null,
    chain: [],
    selectedTab: "Wallet"
  };

  componentDidMount() {
    this.fetchBlochchain();
  }

  fetchBlochchain = () => {
    const ajax = new XMLHttpRequest();
    ajax.open(
      "GET",
      `https://h2867975.stratoserver.net/centralia-coin/get-blockchain?cb=${Date.now()}`
    );
    ajax.onload = () => {
      const blockchain = jsonToBlockchain(ajax.responseText, this.updateChain);
      if (blockchain.chain.length > 0) {
        console.log("valid chain came back");
        this.setState({ blockchain: blockchain, chain: blockchain.chain });
      } else {
        console.log("invalid chain came back");
        this.setState({
          blockchain: new Blockchain(4, this.updateChain)
        });
      }
    };
    ajax.send();
  };

  updateChain = chain => {
    const copyChain = [...chain];
    this.setState({ chain: copyChain });
  };

  validateChain = async () => {
    return new Promise((resolve, reject) => {
      const { chain } = this.state;
      const ajax = new XMLHttpRequest();
      const formData = new FormData();
      formData.append("blockchain", JSON.stringify(chain));
      ajax.open(
        "POST",
        "https://h2867975.stratoserver.net/centralia-coin/add-block"
      );
      ajax.onload = () => {
        const blockchain = jsonToBlockchain(
          ajax.responseText,
          this.updateChain
        );
        this.setState({ blockchain: blockchain, chain: blockchain.chain });
        resolve();
      };
      ajax.onerror = reject;
      ajax.send(formData);
    });
  };

  printContent = () => {
    const { selectedTab, blockchain } = this.state;
    switch (selectedTab) {
      case "Wallet":
        return <Wallet blockchain={blockchain} />;
      case "Mine":
        return (
          <Mine blockchain={blockchain} validateChain={this.validateChain} />
        );
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
              <Grid item xs={12} md={7} className={classes.leftContent}>
                <Paper className={classes.paperPaddingLeft}>
                  {this.printContent()}
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Explorer chain={chain} />
              </Grid>
            </Grid>
          </div>
        </div>
      </Fragment>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(App);
