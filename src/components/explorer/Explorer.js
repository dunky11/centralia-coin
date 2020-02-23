import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import TimBlockPaper from "../utils/TimBlockPaper";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  marginBottom: {
    marginBottom: theme.spacing.unit
  }
});

class Explorer extends PureComponent {
  state = {};
  render() {
    const { chain, classes } = this.props;
    return (
      <Fragment>
        <Typography paragraph variant="body1">
          <b>The blockchain</b>
        </Typography>
        {chain.map((element, index) => (
          <div
            className={index !== chain.length - 1 ? classes.marginBottom : null}
            key={element.timestamp}
          >
            <TimBlockPaper
              index={element.index}
              prevHash={element.previousHash}
              hash={element.hash}
              nonce={element.nonce}
              timestamp={element.timestamp}
              transactions={element.transactions}
            />
          </div>
        ))}
      </Fragment>
    );
  }
}

Explorer.propTypes = {
  chain: PropTypes.array.isRequired
};

export default withStyles(styles)(Explorer);
