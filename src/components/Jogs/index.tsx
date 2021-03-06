import React, { useState, useEffect } from "react";
import styles from "./styles.module.sass";
import sadFace from "static/icons/sadFace.svg";
import jogIcon from "static/icons/jogIcon.svg";
import more from "static/icons/more.svg";
import buttons from "styles/components/buttons.module.sass";
import { parceDate, isDateInRange, findJogIndex } from "scripts/helpers";
import { JogItem, FormattedJogItem } from "types";
import { CreateJogModal } from "components/Modals/CreateJogModal";
import { UpdateJogModal } from "components/Modals/UpdateJogModal";
import { getJogs, postJog, putJog } from "scripts/api";
import { useAuth } from "context/auth";
import { Loader } from "components/Loader";

export interface JogsProps {
  isDatePickerOpen: boolean;
}

export const Jogs: React.FunctionComponent<JogsProps> = ({
  isDatePickerOpen,
}) => {
  const [jogs, setJogs] = useState<FormattedJogItem[]>([]);
  const [jogForUpdate, setJogForUpdate] = useState<FormattedJogItem | null>(
    null
  );

  const [range, setRange] = useState<{ from: Date | null; to: Date | null }>({
    from: null,
    to: null,
  });

  const [isCreateJogModalOpen, setIsCreateJogModalOpen] = useState<boolean>(
    false
  );
  const [isUpdateJogModalOpen, setIsUpdateJogModalOpen] = useState<boolean>(
    false
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { token } = useAuth();

  const filteredJogs = jogs.filter((jog) =>
    isDateInRange(jog.date, range.from, range.to)
  );

  const addJogHandler = (newJog: JogItem) =>
    token &&
    postJog(
      token,
      parceDate(newJog.date),
      newJog.time,
      newJog.distance
    ).then((newJog) => setJogs([newJog, ...jogs]));

  const updateJogHandler = (existingJog: FormattedJogItem) => {
    setIsLoading(true);
    token &&
      putJog(token, existingJog).then((updatedJog) => {
        const updatedJogs = [...jogs];
        const updatedJogIndex = findJogIndex(jogs, updatedJog.id);
        updatedJogs[updatedJogIndex] = updatedJog;
        setJogs(updatedJogs);
        setIsLoading(false);
      });
  };

  const getJogsHandler = () => {
    setIsLoading(true);
    getJogs(token as string).then((jogsFromApi) => {
      setJogs([...jogsFromApi.reverse()]);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getJogsHandler();
  }, []);

  return (
    <>
      <CreateJogModal
        addJog={addJogHandler}
        isModalOpen={isCreateJogModalOpen}
        setIsModalOpen={setIsCreateJogModalOpen}
      />
      <UpdateJogModal
        updateJog={updateJogHandler}
        isModalOpen={isUpdateJogModalOpen}
        setIsModalOpen={setIsUpdateJogModalOpen}
        jogForUpdate={jogForUpdate}
      />
      {!jogs.length ? (
        <div className={styles.jogsPlaceholderContainer}>
          {isLoading ? (
            <Loader />
          ) : (
            <div className={styles.jogsPlaceholder}>
              <div className={styles.iconContainer}>
                <img src={sadFace} alt="Sad face" className={styles.icon} />
                <div className={styles.iconLabel}>Nothing is there</div>
              </div>
              <button
                className={`${buttons.btnSecondary} ${styles.createFirstJogBtn}`}
                onClick={() => setIsCreateJogModalOpen(true)}
              >
                Create your first jog
              </button>
            </div>
          )}
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
          {filteredJogs.length ? (
            <div
              className={`${styles.jogListContainer} ${
                isDatePickerOpen && styles.openDatePicker
              }`}
            >
              <ul className={styles.jogsList}>
                {filteredJogs.map((jog) => (
                  <li
                    key={jog.id}
                    className={styles.jogElementContainer}
                    title="Edit this jog"
                    onClick={() => {
                      setJogForUpdate(jog);
                      setIsUpdateJogModalOpen(true);
                    }}
                  >
                    <div className={styles.jogElement}>
                      <div className={styles.iconContainer}>
                        <img src={jogIcon} alt="Jogging guy" />
                      </div>
                      <div className={styles.jogInfo}>
                        <p className={styles.date}>
                          {jog.date ? parceDate(jog.date) : "Date not found"}
                        </p>
                        <p className={styles.speed}>
                          <span className={styles.accent}>Speed: </span>
                          {jog.speed ? jog.speed : "Not found"}
                        </p>
                        <p className={styles.distance}>
                          <span className={styles.accent}>Distance: </span>
                          {jog.distance ? `${jog.distance} km` : "Not found"}
                        </p>
                        <p className={styles.time}>
                          <span className={styles.accent}>Time: </span>
                          {jog.time ? `${jog.time} min` : "Not found"}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div
              className={`${styles.jogsPlaceholderContainer} ${styles.autoHeight}`}
            >
              <div className={styles.jogsPlaceholder}>
                <div className={styles.iconContainer}>
                  <img src={sadFace} alt="Sad face" className={styles.icon} />
                  <p className={styles.iconLabel}>
                    You don't have any jogs in this period
                  </p>
                </div>
              </div>
            </div>
          )}

          <button
            className={`${buttons.btnRounded} ${buttons.btnPrimary} ${styles.addJogBtn}`}
            onClick={() => setIsCreateJogModalOpen(true)}
            title="Add new jog"
          >
            <img src={more} alt="Add new jog" />
          </button>
        </>
      )}
    </>
  );
};
