import React, { useState } from "react";
import styles from "./styles.module.sass";
import sadFace from "static/icons/sadFace.svg";
import jogIcon from "static/icons/jogIcon.svg";
import more from "static/icons/more.svg";
import buttons from "styles/components/buttons.module.sass";
import { parceDate, isDateInRange } from "helpers";
import { JogItem } from "types";
import { Modal } from "components/Modal";

export interface JogsProps {
  jogs: JogItem[];
  addNewJog: (jog: JogItem) => void;
  isDatePickerOpen: boolean;
}

export const Jogs: React.FunctionComponent<JogsProps> = ({
  jogs,
  addNewJog,
  isDatePickerOpen,
}) => {
  const [isAddJogModalOpen, setIsAddJogModalOpen] = useState<boolean>(false);
  const [range, setRange] = useState<{ from: Date | null; to: Date | null }>({
    from: null,
    to: null,
  });

  const filteredJogs = jogs.filter((jog) =>
    isDateInRange(jog.date, range.from, range.to)
  );

  return (
    <>
      <Modal
        addNewJog={addNewJog}
        isModalOpen={isAddJogModalOpen}
        setIsModalOpen={setIsAddJogModalOpen}
      />
      {!jogs.length ? (
        <div className={styles.jogsPlaceholderContainer}>
          <div className={styles.jogsPlaceholder}>
            <div className={styles.iconContainer}>
              <img src={sadFace} alt="Sad face" className={styles.icon} />
              <div className={styles.iconLabel}>Nothing is there</div>
            </div>
            <button
              className={`${buttons.btnSecondary} ${styles.createFirstJogBtn}`}
              onClick={() => setIsAddJogModalOpen(true)}
            >
              Create your first jog
            </button>
          </div>
        </div>
      ) : (
        <>
          {isDatePickerOpen && (
            <div className={styles.datePickerContainer}>
              <div className={styles.datePickerContent}>
                <div className={styles.inputContainer}>
                  <span className={styles.inputText}>Date from</span>
                  <input
                    type="date"
                    max={parceDate()}
                    className={styles.input}
                    onChange={(e) =>
                      setRange({
                        from: e.target.value ? new Date(e.target.value) : null,
                        to: range.to,
                      })
                    }
                  />
                </div>
                <div className={styles.inputContainer}>
                  <span className={styles.inputText}>Date to</span>
                  <input
                    type="date"
                    max={parceDate()}
                    className={styles.input}
                    onChange={(e) =>
                      setRange({
                        from: range.from,
                        to: e.target.value ? new Date(e.target.value) : null,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}
          <ul className={styles.jogsList}>
            {filteredJogs.length ? (
              filteredJogs.map(({ date, distance, speed, time }, i) => (
                <>
                  <li key={i} className={styles.jogElement}>
                    <div className={styles.iconContainer}>
                      <img src={jogIcon} alt="Jogging guy" />
                    </div>
                    <div className={styles.jogInfo}>
                      <p className={styles.date}>
                        {date ? parceDate(date) : "Date not found"}
                      </p>
                      <p className={styles.speed}>
                        <span className={styles.accent}>Speed: </span>
                        {speed ? speed : "Not found"}
                      </p>
                      <p className={styles.distance}>
                        <span className={styles.accent}>Distance: </span>
                        {distance ? `${distance} km` : "Not found"}
                      </p>
                      <p className={styles.time}>
                        <span className={styles.accent}>Time: </span>
                        {time ? `${time} min` : "Not found"}
                      </p>
                    </div>
                  </li>
                  <div className={styles.divide}></div>
                </>
              ))
            ) : (
              <div
                className={`${styles.jogsPlaceholderContainer} ${styles.autoHeight}`}
              >
                <div className={styles.jogsPlaceholder}>
                  <div className={styles.iconContainer}>
                    <img src={sadFace} alt="Sad face" className={styles.icon} />
                    <div className={styles.iconLabel}>
                      You don't have any jogs in this period
                    </div>
                  </div>
                </div>
              </div>
            )}
          </ul>
          <button
            className={`${buttons.btnRounded} ${buttons.btnPrimary} ${styles.addJogBtn}`}
            onClick={() => setIsAddJogModalOpen(true)}
          >
            <img src={more} alt="Add new jog" />
          </button>
        </>
      )}
    </>
  );
};
