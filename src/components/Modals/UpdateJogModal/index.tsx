import React, { FormEvent, useState } from "react";
import styles from "../styles.module.sass";
import buttons from "styles/components/buttons.module.sass";
import close from "static/icons/close.svg";
import { FormattedJogItem } from "types";
import { parceDate } from "scripts/helpers";
import error from "static/icons/error.svg";

export interface UpdateJogModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  updateJog: (jog: FormattedJogItem) => void;
  jogForUpdate: FormattedJogItem | null;
}

export const UpdateJogModal: React.FunctionComponent<UpdateJogModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  updateJog,
  jogForUpdate,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
      updateJog(newJog);
    }
  };

  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const elements = form.elements as any;

    if (
      !elements.distance.value.match(/\D/) ||
      !elements.time.value.match(/\D/)
    )
      setErrorMessage("The form fields are filled in with errors");
    else setErrorMessage(null);

    putJogHandler(
      elements.distance.value as number,
      elements.time.value as number,
      new Date(elements.date.value) as Date
    );
    setIsModalOpen(false);
  };

  return isModalOpen ? (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <button
          className={`${buttons.btnFab} ${styles.closeModalBtn}`}
          onClick={() => setIsModalOpen(false)}
        >
          <img src={close} alt="Close" />
        </button>
        <form className={styles.form} onSubmit={formSubmitHandler}>
          <div className={styles.inputContainer}>
            <p className={styles.inputLabel}>Distance</p>
            <input
              type="number"
              min={1}
              defaultValue={jogForUpdate?.distance}
              className={styles.input}
              name="distance"
              required
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
              required
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
              required
            />
          </div>
          {errorMessage && (
            <div className={styles.errorContainer}>
              <img src={error} alt="Error!" className={styles.errorIcon} />
              <p className={styles.errorMessage}>{errorMessage}</p>
            </div>
          )}
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
