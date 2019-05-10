import React from "react";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    overflowX: "hidden"
  },
  transactionPaper: {
    padding: theme.spacing.unit,
    overflowX: "hidden",
    marginTop: theme.spacing.unit
  }
});

function TimBlockPaper(props) {
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
              : "Im a mining reward and got no from address"}
          </Typography>
          <Typography>
            <b>To address:</b> {element.toAddress}
          </Typography>
          <Typography>
            <b>Timoshis:</b> {element.amount}
          </Typography>
          <Typography>
            <b>Timestamp:</b> {element.timestamp}
          </Typography>
        </Paper>
      ))}
    </Paper>
  );
}

export default withStyles(styles, { withTheme: true })(TimBlockPaper);
