import React, { FormEvent } from "react";
import styles from "./styles.module.sass";
import buttons from "styles/components/buttons.module.sass";
import close from "static/icons/close.svg";
import { FormattedJogItem } from "types";
import { parceDate } from "helpers";

export interface UpdateJogModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  putJog: (jog: FormattedJogItem) => void;
  jogForUpdate: FormattedJogItem | null;
}

export const UpdateJogModal: React.FunctionComponent<UpdateJogModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  putJog,
  jogForUpdate,
}) => {
  const putJogHandler = (
    distance: number = 0,
    time: number = 0,
    date: Date = new Date()
  ) => {
    if (jogForUpdate) {
      const newJog: FormattedJogItem = {
        ...jogForUpdate,
        date: date ? date : jogForUpdate.date,
        time: time ? time : jogForUpdate.time,
        distance: distance ? distance : jogForUpdate.distance,
      };
      putJog(newJog);
    }
  };

  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const elements = form.elements as any;

    putJogHandler(
      elements.distance.value as number,
      elements.time.value as number,
      new Date(elements.date.value) as Date
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
              defaultValue={jogForUpdate?.distance}
              className={styles.input}
              name="distance"
            />
          </div>
          <div className={styles.inputContainer}>
            <p className={styles.inputLabel}>Time</p>
            <input
              type="number"
              min={1}
              className={styles.input}
              name="time"
              defaultValue={jogForUpdate?.time}
            />
          </div>
          <div className={styles.inputContainer}>
            <p className={styles.inputLabel}>Date</p>
            <input
              type="date"
              defaultValue={parceDate(jogForUpdate?.date)}
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
