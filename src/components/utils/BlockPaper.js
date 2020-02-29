import React from "react";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    overflowX: "hidden"
  },
  transactionPaper: {
    padding: theme.spacing(1),
    overflowX: "hidden",
    marginTop: theme.spacing(1)
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
    timestamp
  } = props;
  return (
    <Paper className={classes.paper}>
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
      <Typography variant="body1">
        <b>Transactions:</b>
      </Typography>
      {transactions.map(element => (
        <Paper
          key={element.index}
          className={classes.transactionPaper}
          square
          elevation={1}
        >
          <Typography>
            <b>From address:</b>{" "}
            {element.fromAddress
              ? element.fromAddress
              : "Mining rewards have no address of sender"}
          </Typography>
          <Typography>
            <b>To address:</b> {element.toAddress}
          </Typography>
          <Typography>
            <b>Signature:</b>{" "}
            {element.signature
              ? element.signature
              : "Mining rewards have no signature"}
          </Typography>
          <Typography>
            <b>Coins:</b> {element.amount}
          </Typography>
          <Typography>
            <b>Timestamp:</b> {element.timestamp}
          </Typography>
        </Paper>
      ))}
    </Paper>
  );
}

export default withStyles(styles, { withTheme: true })(BlockPaper);
