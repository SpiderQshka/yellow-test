import React from "react";
import styles from "./styles.module.sass";

export const Info: React.FunctionComponent = () => {
  return (
    <div className={styles.infoContainer}>
      <h1 className={styles.header}>Info</h1>
      <p className={styles.content}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste voluptas
        ratione magnam voluptatibus commodi, odio vel quo aut quae ut suscipit
        provident eius distinctio soluta adipisci nesciunt incidunt saepe
        laudantium consequuntur laboriosam eveniet dolorum repellendus doloribus
        assumenda! Quia, at quisquam?
      </p>
    </div>
  );
};
