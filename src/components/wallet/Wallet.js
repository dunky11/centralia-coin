import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { Button, withStyles } from "@material-ui/core";
import Balance from "./Balance";
import CreateWallet from "./CreateWallet";
import MakeTransaction from "./MakeTransaction";

const styles = theme => ({
  flexBox: {
    display: "flex"
  },
  rightMargin: {
    marginRight: theme.spacing(1)
  },
  contentWrapper: {
    marginTop: theme.spacing(3)
  }
});

class Wallet extends PureComponent {
  state = {
    activeMenu: "Create Wallet"
  };

  printContent = () => {
    const { blockchain } = this.props;
    const { activeMenu } = this.state;
    switch (activeMenu) {
      case "Create Wallet":
        return <CreateWallet />;
      case "Balance":
        return <Balance blockchain={blockchain} />;
      case "Make Transaction":
        return <MakeTransaction blockchain={blockchain} />;
      default:
        throw new Error("No branch selected in switcht statement.");
    }
  };

  render() {
    const { classes } = this.props;
    const { activeMenu } = this.state;
    return (
      <Fragment>
        <div className={classes.flexBox}>
          <Button
            className={classes.rightMargin}
            onClick={() => {
              this.setState({ activeMenu: "Create Wallet" });
            }}
            variant={activeMenu === "Create Wallet" ? "outlined" : "text"}
            color="primary"
          >
            Create Wallet
          </Button>
          <Button
            className={classes.rightMargin}
            onClick={() => {
              this.setState({ activeMenu: "Balance" });
            }}
            variant={activeMenu === "Balance" ? "outlined" : "text"}
            color="primary"
          >
            Balance
          </Button>
          <Button
            variant={activeMenu === "Make Transaction" ? "outlined" : "text"}
            onClick={() => {
              this.setState({ activeMenu: "Make Transaction" });
            }}
            color="primary"
          >
            Make Transaction
          </Button>
        </div>
        <div className={classes.contentWrapper}>{this.printContent()}</div>
      </Fragment>
    );
  }
}

Wallet.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles, { withTheme: true })(Wallet);
