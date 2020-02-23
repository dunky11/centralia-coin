import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import TimBlockPaper from "../utils/TimBlockPaper";

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit * 4
  },
  curBlockPaper: {
    marginTop: theme.spacing.unit
  }
});

class Mine extends PureComponent {
  state = { pk: "", hash: "", mining: false, transactions: [] };
  startMining = () => {
    const { timChain } = this.props;
    const { pk, mining } = this.state;
    if (mining) {
      timChain.minePendingTransactions(pk);
      const { curBlock } = timChain;
      this.setState({
        index: curBlock.index,
        prevHash: curBlock.previousHash,
        hash: curBlock.hash,
        nonce: curBlock.nonce,
        timestamp: curBlock.timestamp,
        transactions: curBlock.transactions
      });
      window.setTimeout(this.startMining, 10);
    }
  };
  initMiningLoop = () => {
    this.setState({ mining: true }, this.startMining);
  };
  stopMiningLoop = () => {
    this.setState({ mining: false });
  };
  render() {
    const { classes } = this.props;
    const {
      pk,
      mining,
      index,
      prevHash,
      hash,
      nonce,
      timestamp,
      transactions
    } = this.state;
    return (
      <Fragment>
        <Typography paragraph variant="h6">
          Mine blocks to get timoshis
        </Typography>
        <TextField
          value={pk}
          onChange={event => {
            this.setState({ pk: event.target.value });
          }}
          fullWidth
          variant="outlined"
          margin="normal"
          multiline
          label="Public key of wallet to reward"
        />
        {mining && (
          <div className={classes.curBlockPaper}>
            <TimBlockPaper
              index={index}
              hash={hash}
              prevHash={prevHash}
              nonce={nonce}
              timestamp={timestamp}
              transactions={transactions}
            />
          </div>
        )}
        <Button
          fullWidth
          onClick={mining ? this.stopMiningLoop : this.initMiningLoop}
          color="primary"
          variant="contained"
          className={classes.button}
          disabled={!pk}
        >
          {mining ? "Stop Mining" : "Start Mining"}
        </Button>
      </Fragment>
    );
  }
}

Mine.propTypes = { timChain: PropTypes.object };

export default withStyles(styles, { withTheme: true })(Mine);
