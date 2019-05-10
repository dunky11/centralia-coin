import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import generateKeyPair from "../../timchain/generateKeyPair";

const styles = theme => ({
  flexBox: {
    display: "flex"
  },
  rightMargin: {
    marginRight: theme.spacing.unit
  },
  contentWrapper: {
    marginTop: theme.spacing.unit * 3
  },
  generateKeyButton: {
    marginTop: theme.spacing.unit * 4
  }
});

class Wallet extends PureComponent {
  state = {
    activeMenu: "Create Wallet",
    publicKey: "",
    secretKey: "",
    timoshis: "",
    balancePubKey: ""
  };

  genterateWallet = () => {
    const pair = generateKeyPair();
    this.setState({ publicKey: pair.pk, secretKey: pair.sk });
  };

  printContent = () => {
    const { classes } = this.props;
    const {
      activeMenu,
      publicKey,
      secretKey,
      timoshis,
      balancePubKey
    } = this.state;
    switch (activeMenu) {
      case "Create Wallet":
        return (
          <Fragment>
            <Typography paragraph variant="h6">
              Generate a keypair using secp256k1
            </Typography>
            <TextField
              value={publicKey}
              fullWidth
              variant="outlined"
              margin="normal"
              InputProps={{
                readOnly: true
              }}
              multiline
              label="Public Key"
            />
            <TextField
              value={secretKey}
              fullWidth
              variant="outlined"
              margin="normal"
              InputProps={{
                readOnly: true
              }}
              multiline
              label="Private Key"
            />
            <Button
              fullWidth
              onClick={this.genterateWallet}
              color="primary"
              variant="contained"
              className={classes.generateKeyButton}
            >
              Generate Wallet
            </Button>
          </Fragment>
        );
      case "Balance":
        return (
          <Fragment>
            <Typography paragraph variant="h6">
              Enter the public key of a wallet to find out it's timoshis
            </Typography>
            <TextField
              value={balancePubKey}
              fullWidth
              variant="outlined"
              margin="normal"
              onChange={event => {
                this.setState({ balancePubKey: event.target.value });
              }}
              multiline
              label="Public Key"
            />
            <TextField
              value={timoshis}
              fullWidth
              variant="outlined"
              margin="normal"
              InputProps={{
                readOnly: true
              }}
              multiline
              label="timoshis"
            />
            <Button
              fullWidth
              onClick={this.checkBalance}
              color="primary"
              variant="contained"
              className={classes.generateKeyButton}
            >
              Check Balance
            </Button>
          </Fragment>
        );
      case "Make Transaktion":
        return;
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
            variant={activeMenu === "Make Transaktion" ? "outlined" : "text"}
            onClick={() => {
              this.setState({ activeMenu: "Make Transaktion" });
            }}
            color="primary"
          >
            Make Transaktion
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
