import React, { PureComponent, Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit * 4
  }
});

class Balance extends PureComponent {
  state = { timoshis: "", pk: "" };
  checkBalance = () => {
    const { timChain } = this.props;
    const { pk } = this.state;
    this.setState({ timoshis: timChain.getBalanceOfAddress(pk) });
  };
  render() {
    const { classes } = this.props;
    const { pk, timoshis } = this.state;
    return (
      <Fragment>
        <Typography paragraph variant="h6">
          Enter the public key of a wallet to find out it's timoshis
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
