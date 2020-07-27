import React, { useState, useEffect } from "react";
import "styles/reset.sass";
import { Header } from "./components/Header/index";
import { Login } from "./components/Login/index";
import { Jogs } from "./components/Jogs/index";
import { Redirect, Switch, Route } from "react-router-dom";
import { JogItem } from "types";
import { Info } from "components/Info";
import { ContactUs } from "components/ContactUs";
import { logIn, getCurrentUser, getJogs } from "api";

const App: React.FunctionComponent = () => {
  const token = window.localStorage.getItem("token") || null;
  const [jogs, setJogs] = useState<JogItem[]>([]);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const addNewJog = (newJog: JogItem) => setJogs([...jogs, newJog]);

  useEffect(() => {
    if (!token)
      logIn().then((token) => {
        window.localStorage.setItem("token", token);
      });
    // getCurrentUser(token as string);
    getJogs(token as string).then((jogsFromApi) => {
      const formattedJogs: JogItem[] = jogsFromApi.map(
        ({ date, distance, time }) => {
          return {
            date: new Date(date),
            distance,
            speed: +(distance / time).toFixed(2),
            time,
          };
        }
      );
      setJogs([...jogs, ...formattedJogs]);
    });
  }, []);

  return (
    <>
      <Header
        areJogsExist={!!jogs.length}
        isDatePickerOpen={isDatePickerOpen}
        setIsDatePickerOpen={setIsDatePickerOpen}
      />
      <Switch>
        <Route exact path="/">
          <Login />
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
