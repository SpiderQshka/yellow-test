import React from "react";
import styles from "./styles.module.sass";
import bearFace from "static/icons/bearFace.svg";
import buttons from "styles/components/buttons.module.sass";
import { useHistory } from "react-router-dom";

export interface LoginProps {}

export const Login: React.FunctionComponent<LoginProps> = () => {
  const history = useHistory();
  const logInHandler = () => {
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
