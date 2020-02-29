import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { Typography, TextField, Button, withStyles } from "@material-ui/core";
import BlockPaper from "../utils/BlockPaper";

const styles = theme => ({
  button: {
    marginTop: theme.spacing(4)
  },
  curBlockPaper: {
    marginTop: theme.spacing(1)
  }
});

class Mine extends PureComponent {
  state = { pk: "", hash: "", mining: false, transactions: [] };

  startMining = async () => {
    const { blockchain, validateChain } = this.props;
    const { pk, mining } = this.state;
    const minedNewBlock = blockchain.minePendingTransactions(pk);
    if (minedNewBlock) {
      await validateChain();
    }
    const { curBlock } = blockchain;
    this.setState({
      index: curBlock.index,
      prevHash: curBlock.previousHash,
      hash: curBlock.hash,
      nonce: curBlock.nonce,
      timestamp: curBlock.timestamp,
      transactions: curBlock.transactions
    });
    if (mining) {
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
    const { classes, theme } = this.props;
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
          Mine blocks to get coins
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
          <Fragment>
            <Typography
              variant="h6"
              style={{ marginTop: theme.spacing(1) }}
              paragraph
            >
              Current block
            </Typography>
            <div className={classes.curBlockPaper}>
              <BlockPaper
                index={index}
                hash={hash}
                prevHash={prevHash}
                nonce={nonce}
                timestamp={timestamp}
                transactions={transactions}
              />
            </div>
          </Fragment>
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

Mine.propTypes = {
  blockchain: PropTypes.object,
  validateChain: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(Mine);
