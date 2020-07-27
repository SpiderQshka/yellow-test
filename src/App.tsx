import React, { useState, useEffect } from "react";
import "styles/reset.sass";
import { Header } from "./components/Header/index";
import { Login } from "./components/Login/index";
import { Jogs } from "./components/Jogs/index";
import { Redirect, Switch, Route } from "react-router-dom";
import { JogItem } from "types";
import { Info } from "components/Info";
import { ContactUs } from "components/ContactUs";
import { getJogs } from "api";
import { formatJogs, getToken, setToken } from "helpers";

const App: React.FunctionComponent = () => {
  let token = getToken();
  const [jogs, setJogs] = useState<JogItem[]>([]);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const addNewJog = (newJog: JogItem) => setJogs([...jogs, newJog]);
  const setTokenHandler = (tokenFromApi: string) => {
    setToken(tokenFromApi);
    token = getToken();
    updateJogs();
  };
  const updateJogs = () =>
    getJogs(token as string).then((jogsFromApi) => {
      const formattedJogs = formatJogs(jogsFromApi);
      setJogs([...jogs, ...formattedJogs]);
    });
  useEffect(() => {
    if (token) updateJogs();
  }, [token]);

  return (
    <>
      <Header
        isDatePickerOpen={isDatePickerOpen}
        setIsDatePickerOpen={setIsDatePickerOpen}
      />
      <Switch>
        <Route exact path="/">
          <Login token={token} setTokenHandler={setTokenHandler} />
        </Route>
        <Route exact path="/jogs">
          <Jogs
            jogs={jogs}
            addNewJog={addNewJog}
            isDatePickerOpen={isDatePickerOpen}
          />
        </Route>
        <Route exact path="/info">
          <Info />
        </Route>
        <Route exact path="/contact-us">
          <ContactUs />
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </>
  );
};

export default App;
