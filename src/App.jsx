import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";

import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  base: () => ({
    background: {
      default: "#6374ae",
    },
  }),
});

const theme = createTheme({
  typography: {
    fontFamily: ['Poppins, sans-serif'].join(","),
  },
})

function App() {
  const [count, setCount] = useState(0);

  return (
    <div {...stylex.props(styles.base())}>

    <ThemeProvider theme={theme}>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      Hello world
      HELLO WORLD
      <Button variant="contained">
        hello world
      </Button>
    </ThemeProvider>
    </div>
  );
}

export default App;
