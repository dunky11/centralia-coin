import React from "react";
import PropTypes from "prop-types";
import Route from "react-router-dom/Route";

/**
 * Helper function to use react-router with props
 * taken from https://github.com/ReactTraining/react-router/issues/4105
 */
const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return React.createElement(component, finalProps);
};

/**
 * Function to use react-router with props
 * taken from https://github.com/ReactTraining/react-router/issues/4105
 */
const propsRoute = ({ component, ...rest }) => (
  <Route
    {...rest}
    render={routeProps => renderMergedProps(component, routeProps, rest)}
  />
);

propsRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.array
  ])
};

export default propsRoute;
