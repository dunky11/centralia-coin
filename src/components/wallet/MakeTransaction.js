import React, { PureComponent, Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Transaction from "../../timchain/Transaction";
import HighlightedInformation from "../utils/HighlightedInformation";

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit * 4
  },
  highLightedInformation: {
    marginTop: theme.spacing.unit * 2
  }
});

class Balance extends PureComponent {
  state = { pk: "", sk: "", timoshis: "", recPk: "", status: null };
  makeTransaction = () => {
    this.setState({ status: null });
    const { timChain } = this.props;
    const { pk, recPk, sk, timoshis } = this.state;
    const transaction = new Transaction(pk, recPk, parseInt(timoshis));
    try {
      transaction.signTransaction(pk, sk);
      timChain.addTransaction(transaction);
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
    const { pk, sk, timoshis, recPk, status } = this.state;
    return (
      <Fragment>
        <Typography paragraph variant="h6">
          Transfer timoshis from one wallet to another
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
          value={timoshis}
          fullWidth
          variant="outlined"
          margin="normal"
          onChange={event => {
            const { value } = event.target;
            if (isNaN(value)) {
              return;
            }
            this.setState({ timoshis: event.target.value });
          }}
          multiline
          label="Timoshis to send"
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
          disabled={!pk || !sk || !recPk || !timoshis}
          onClick={this.makeTransaction}
        >
          Create Transaction
        </Button>
      </Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Balance);
