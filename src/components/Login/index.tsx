import React from "react";
import styles from "./styles.module.sass";
import bearFace from "static/icons/bearFace.svg";
import buttons from "styles/components/buttons.module.sass";
import { useHistory, Redirect } from "react-router-dom";
import { logIn } from "api";
import { useAuth } from "context/auth";

export const Login: React.FunctionComponent = () => {
  const auth = useAuth();
  const history = useHistory();

  if (auth?.token) return <Redirect to="/jogs" />;
  const logInHandler = () => {
    logIn().then((token) => auth?.setToken(token));
    history.push("/jogs");
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginContent}>
        <div className={styles.iconContainer}>
          <img src={bearFace} alt="Bear face" className={styles.icon} />
        </div>
        <button
          className={`${buttons.btnSecondary} ${styles.logInBtn}`}
          onClick={() => logInHandler()}
        >
          Let me in
        </button>
      </div>
    </div>
  );
};
