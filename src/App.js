import CssBaseline from '@mui/material/CssBaseline'
import Contacts from "./pages/Contacts";
import {createTheme} from "@mui/material";
import {ThemeProvider} from "@mui/material";

export const theme = createTheme()

const App = () => (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Contacts/>
    </ThemeProvider>
);

export default App;
