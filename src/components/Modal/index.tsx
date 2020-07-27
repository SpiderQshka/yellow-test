import React, { FormEvent } from "react";
import styles from "./styles.module.sass";
import buttons from "styles/components/buttons.module.sass";
import close from "static/icons/close.svg";
import { JogItem } from "types";
import { parceDate } from "helpers";

export interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  addNewJog: (newJog: JogItem) => void;
}

export const Modal: React.FunctionComponent<ModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  addNewJog,
}) => {
  const addJogHandler = (
    distance: number = 0,
    time: number = 0,
    date: Date = new Date()
  ) => {
    const newJog: JogItem = {
      date,
      time,
      distance,
      speed: +(distance / time).toFixed(2),
    };
    addNewJog(newJog);
  };

  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const elements = form.elements as any;
    addJogHandler(
      elements.distance.value as number,
      elements.time.value as number,
      elements.date.value as Date
    );
    setIsModalOpen(false);
  };

  return isModalOpen ? (
    <div className={styles.addJogModalContainer}>
      <div className={styles.addJogModal}>
        <button
          className={`${buttons.btnFab} ${styles.closeModalBtn}`}
          onClick={() => setIsModalOpen(false)}
        >
          <img src={close} alt="Close" />
        </button>
        <form className={styles.addJogForm} onSubmit={formSubmitHandler}>
          <div className={styles.inputContainer}>
            <p className={styles.inputLabel}>Distance</p>
            <input
              type="number"
              min={1}
              className={styles.input}
              name="distance"
            />
          </div>
          <div className={styles.inputContainer}>
            <p className={styles.inputLabel}>Time</p>
            <input type="number" min={1} className={styles.input} name="time" />
          </div>
          <div className={styles.inputContainer}>
            <p className={styles.inputLabel}>Date</p>
            <input
              type="date"
              defaultValue={Date.now()}
              max={parceDate()}
              className={styles.input}
              name="date"
            />
          </div>
          <button
            type="submit"
            className={`${buttons.btnNeutral} ${buttons.btnFullWidth}`}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  ) : null;
};
