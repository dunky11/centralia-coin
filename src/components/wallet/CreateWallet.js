import React, { PureComponent, Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import generateKeyPair from "../../blockchain/generateKeyPair";

const styles = theme => ({
  button: {
    marginTop: theme.spacing(4)
  }
});

class CreateWallet extends PureComponent {
  state = { pk: "", sk: "" };

  createWallet = () => {
    const pair = generateKeyPair();
    this.setState({ pk: pair.pk, sk: pair.sk });
  };

  render() {
    const { classes } = this.props;
    const { pk, sk } = this.state;
    return (
      <Fragment>
        <Typography paragraph variant="h6">
          Generate a keypair
        </Typography>
        <TextField
          value={pk}
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
          value={sk}
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
          onClick={this.createWallet}
          color="primary"
          variant="contained"
          className={classes.button}
        >
          Generate Wallet
        </Button>
      </Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(CreateWallet);
