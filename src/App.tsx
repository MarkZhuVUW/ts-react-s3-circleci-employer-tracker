import React, { FC } from "react";
import AuthContainer from "./components/auth/AuthContainer";
import { LocalStorageProvider } from "./providers/LocalStorageProvider";
import { ThemeProvider } from "./providers/ThemeProvider";

const App: FC = () => (
  <LocalStorageProvider>
    <ThemeProvider>
      <AuthContainer />
    </ThemeProvider>
  </LocalStorageProvider>
);
export default App;