import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const primary = "#b3294e";
const secondary = "#4829B2";

const theme = createMuiTheme({
  palette: {
    primary: { main: primary },
    secondary: { main: secondary },
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2
  },
  typography: {
    useNextVariants: true
  }
});

export default theme;
