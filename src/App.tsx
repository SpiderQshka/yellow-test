import React, { useState } from "react";
import "styles/reset.sass";
import { Header } from "./components/Header/index";
import { Login } from "./components/Login/index";
import { Jogs } from "./components/Jogs/index";
import { Redirect, Switch, Route } from "react-router-dom";
import { Info } from "components/Info";
import { AuthContext } from "context/auth";
import { ContactUs } from "components/ContactUs";
import {
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
} from "scripts/helpers";
import { PrivateRoute } from "components/PrivateRoute";

const App: React.FunctionComponent = () => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [token, setTokenToState] = useState<string | null>(
    getTokenFromLocalStorage()
  );

  const setTokenHandler = (tokenFromApi: string) => {
    setTokenToLocalStorage(tokenFromApi);
    setTokenToState(tokenFromApi);
  };

  return (
    <AuthContext.Provider value={{ setToken: setTokenHandler, token }}>
      <Header
        isDatePickerOpen={isDatePickerOpen}
        setIsDatePickerOpen={setIsDatePickerOpen}
      />
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <PrivateRoute exact path="/jogs">
          <Jogs isDatePickerOpen={isDatePickerOpen} />
        </PrivateRoute>
        <PrivateRoute exact path="/info">
          <Info />
        </PrivateRoute>
        <PrivateRoute exact path="/contact-us">
          <ContactUs />
        </PrivateRoute>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </AuthContext.Provider>
  );
};

export default App;
