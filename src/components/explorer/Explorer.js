import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Box, Paper, Typography, withStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import BlockPaper from "../utils/BlockPaper";

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(4)
  }
});

class Explorer extends PureComponent {
  state = { page: 1 };
  pageSize = 10;

  onPaginationChange = (_, page) => {
    this.setState({ page });
  };

  render() {
    const { chain, classes } = this.props;
    const { page } = this.state;
    return (
      <Paper className={classes.paper}>
        <Typography paragraph variant="h6">
          The blockchain
        </Typography>
        {[...chain]
          .reverse()
          .slice((page - 1) * this.pageSize, page * this.pageSize)
          .map((element, index) => (
            <Box mb={index !== chain.length - 1 ? 1 : 0} key={element.index}>
              <BlockPaper
                index={element.index}
                prevHash={element.previousHash}
                hash={element.hash}
                nonce={element.nonce}
                timestamp={element.timestamp}
                transactions={element.transactions}
              />
            </Box>
          ))}
        <Box mt={2}>
          <Pagination
            count={Math.ceil(chain.length / this.pageSize)}
            defaultPage={1}
            page={page}
            onChange={this.onPaginationChange}
          />
        </Box>
      </Paper>
    );
  }
}

Explorer.propTypes = {
  chain: PropTypes.array.isRequired
};

export default withStyles(styles)(Explorer);
