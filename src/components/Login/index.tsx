import React from "react";
import styles from "./styles.module.sass";
import bearFace from "static/icons/bearFace.svg";
import buttons from "styles/components/buttons.module.sass";
import { useHistory, Redirect } from "react-router-dom";
import { logIn } from "api";

export interface LoginProps {
  token: string | null;
  setTokenHandler: (token: string) => void;
}

export const Login: React.FunctionComponent<LoginProps> = ({
  setTokenHandler,
  token,
}) => {
  const history = useHistory();
  if (token) return <Redirect to="/jogs" />;
  const logInHandler = () => {
    logIn().then((token) => setTokenHandler(token));
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
