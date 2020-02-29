import React, { PureComponent, Fragment } from "react";
import { Typography, TextField, Button, withStyles } from "@material-ui/core";

const styles = theme => ({
  button: {
    marginTop: theme.spacing(4)
  }
});

class Balance extends PureComponent {
  state = { coins: "", pk: "" };
  checkBalance = () => {
    const { blockchain } = this.props;
    const { pk } = this.state;
    this.setState({ coins: blockchain.getBalanceOfAddress(pk) });
  };
  render() {
    const { classes } = this.props;
    const { pk, coins } = this.state;
    return (
      <Fragment>
        <Typography paragraph variant="h6">
          Enter the public key of a wallet to find out it's balance
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
          label="Public Key"
        />
        <TextField
          value={coins}
          fullWidth
          variant="outlined"
          margin="normal"
          InputProps={{
            readOnly: true
          }}
          multiline
          label="Coins"
        />
        <Button
          fullWidth
          onClick={this.checkBalance}
          color="primary"
          variant="contained"
          className={classes.button}
          disabled={!pk}
        >
          Check Balance
        </Button>
      </Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Balance);
