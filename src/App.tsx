import React, { useState, useEffect } from "react";
import "styles/reset.sass";
import { Header } from "./components/Header/index";
import { Login } from "./components/Login/index";
import { Jogs } from "./components/Jogs/index";
import { Redirect, Switch, Route } from "react-router-dom";
import { JogItem, FormattedJogItem } from "types";
import { Info } from "components/Info";
import { ContactUs } from "components/ContactUs";
import { getJogs, setNewJog, updateExistingJog } from "api";
import { formatJogs, getToken, setToken, parceDate } from "helpers";

const App: React.FunctionComponent = () => {
  let token = getToken();

  const [jogs, setJogs] = useState<FormattedJogItem[]>([]);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);

  const addNewJog = (newJog: JogItem) => {
    setNewJog(
      token as string,
      parceDate(newJog.date),
      newJog.time,
      newJog.distance
    ).then((newJog) => setJogs([...jogs, newJog]));
  };

  const putJog = (existingJog: FormattedJogItem) => {
    updateExistingJog(token as string, existingJog).then((updatedJog) => {
      let updatedJogIndex: number = 0;
      jogs.forEach((jog, i) => {
        if (jog.id === updatedJog.id) updatedJogIndex = i;
      });

      const updatedJogs = [...jogs];
      updatedJogs[updatedJogIndex] = updatedJog;

      setJogs(updatedJogs);
    });
  };

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
    updateJogs();
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
          {token ? (
            <Jogs
              jogs={jogs}
              addNewJog={addNewJog}
              isDatePickerOpen={isDatePickerOpen}
              putJog={putJog}
            />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/info">
          {token ? <Info /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/contact-us">
          {token ? <ContactUs /> : <Redirect to="/" />}
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </>
  );
};

export default App;
