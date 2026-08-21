import React, { useEffect } from "react";
import { BrowserRouter } from "react-router";
import { AppRouter } from "./app.routes";
import { AuthContextProvider } from "../features/auth/auth.context";
import { useAuth } from "../features/auth/hooks/useAuth";

const App = () => {

  const {handleGetMe} = useAuth();
  useEffect(() => {
    handleGetMe();
  }, []);
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
