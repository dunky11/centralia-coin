import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  bordered: {
    border: "2px solid rgba(0, 0, 0, 0.13)",
    overflowX: "hidden",
    padding: theme.spacing(1)
  }
});

function BlockPaper(props) {
  const {
    hash,
    prevHash,
    transactions,
    index,
    nonce,
    classes,
    timestamp,
    theme
  } = props;
  return (
    <div className={classes.bordered}>
      <Typography variant="body1">
        <b>Index:</b> {index}
      </Typography>
      <Typography variant="body1">
        <b>Previous hash:</b> {prevHash}
      </Typography>
      <Typography variant="body1">
        <b>Hash:</b> {hash}
      </Typography>
      <Typography variant="body1">
        <b>Nonce:</b> {nonce}
      </Typography>
      <Typography variant="body1">
        <b>Timestamp:</b> {timestamp}
      </Typography>
      <Typography
        variant="body1"
        style={{
          marginBottom: transactions.length >= 1 ? theme.spacing(1) : 0
        }}
      >
        <b>Transactions:</b>
      </Typography>
      {transactions.map((tx, index) => (
        <div className={classes.bordered} key={index}>
          <Typography>
            <b>From address:</b>{" "}
            {tx.fromAddress ? tx.fromAddress : "Mining reward"}
          </Typography>
          <Typography>
            <b>To address:</b> {tx.toAddress}
          </Typography>
          <Typography>
            <b>Signature:</b> {tx.signature ? tx.signature : "Mining reward"}
          </Typography>
          <Typography>
            <b>Coins:</b> {tx.amount}
          </Typography>
          <Typography>
            <b>Timestamp:</b> {tx.timestamp}
          </Typography>
        </div>
      ))}
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(BlockPaper);
