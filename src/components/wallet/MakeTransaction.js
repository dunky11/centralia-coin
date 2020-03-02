import React, { PureComponent, Fragment } from "react";
import { Typography, TextField, Button, withStyles } from "@material-ui/core";
import HighlightedInformation from "../utils/HighlightedInformation";
import Transaction from "../../blockchain/Transaction";

const styles = theme => ({
  button: {
    marginTop: theme.spacing(4)
  },
  highLightedInformation: {
    marginTop: theme.spacing(2)
  }
});

class Balance extends PureComponent {
  state = { pk: "", sk: "", coins: "", recPk: "", status: null };

  makeTransaction = () => {
    this.setState({ status: null });
    const { blockchain } = this.props;
    const { pk, recPk, sk, coins } = this.state;
    const transaction = new Transaction(pk, recPk, parseInt(coins));
    try {
      transaction.signTransaction(pk, sk);
      blockchain.addTransaction(transaction);
      this.setState({
        status: "Transaction will be in the next block if it's valid"
      });
    } catch (e) {
      console.log(e);
      if (
        e.message === "Cannot add invalid transaction to chain" ||
        e.message === "You cannot sign transactions for other wallets!"
      ) {
        this.setState({ status: e.message });
      } else {
        throw e;
      }
    }
  };

  render() {
    const { classes } = this.props;
    const { pk, sk, coins, recPk, status } = this.state;
    return (
      <Fragment>
        <Typography paragraph variant="h6">
          Transfer coins from one wallet to another
        </Typography>
        <TextField
          value={pk}
          fullWidth
          variant="outlined"
          margin="normal"
          onChange={event => {
            this.setState({ pk: event.target.value });
          }}
          multiline
          label="Your wallets public key"
        />
        <TextField
          value={sk}
          fullWidth
          variant="outlined"
          margin="normal"
          onChange={event => {
            this.setState({ sk: event.target.value });
          }}
          multiline
          label="Your wallets private key"
        />
        <TextField
          value={recPk}
          fullWidth
          variant="outlined"
          margin="normal"
          onChange={event => {
            this.setState({ recPk: event.target.value });
          }}
          multiline
          label="The recipient's wallet public key"
        />
        <TextField
          value={coins}
          fullWidth
          variant="outlined"
          margin="normal"
          onChange={event => {
            const { value } = event.target;
            if (isNaN(value)) {
              return;
            }
            this.setState({ coins: event.target.value });
          }}
          multiline
          label="Coins to send"
        />
        {status && (
          <HighlightedInformation className={classes.highLightedInformation}>
            {status}
          </HighlightedInformation>
        )}
        <Button
          className={classes.button}
          fullWidth
          variant="contained"
          color="primary"
          disabled={!pk || !sk || !recPk || !coins}
          onClick={this.makeTransaction}
        >
          Create Transaction
        </Button>
      </Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Balance);
