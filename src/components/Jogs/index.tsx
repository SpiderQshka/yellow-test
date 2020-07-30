import React, { useState, useEffect } from "react";
import styles from "./styles.module.sass";
import sadFace from "static/icons/sadFace.svg";
import jogIcon from "static/icons/jogIcon.svg";
import more from "static/icons/more.svg";
import buttons from "styles/components/buttons.module.sass";
import { parceDate, isDateInRange, formatJogs, findJogIndex } from "helpers";
import { JogItem, FormattedJogItem } from "types";
import { CreateJogModal } from "components/Modals/CreateJogModal";
import { UpdateJogModal } from "components/Modals/UpdateJogModal";
import { getJogs, postJog, putJog } from "api";
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
    ).then((newJog) => setJogs([...jogs, newJog]));

  const updateJogHandler = (existingJog: FormattedJogItem) =>
    token &&
    putJog(token, existingJog).then((updatedJog) => {
      const updatedJogs = [...jogs];
      const updatedJogIndex = findJogIndex(jogs, updatedJog.id);
      updatedJogs[updatedJogIndex] = updatedJog;
      setJogs(updatedJogs);
    });

  const getJogsHandler = () => {
    setIsLoading(true);
    getJogs(token as string).then((jogsFromApi) => {
      const formattedJogs = formatJogs(jogsFromApi);
      setJogs([...formattedJogs]);
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

          <ul
            className={`${styles.jogsList} ${
              (isCreateJogModalOpen || isUpdateJogModalOpen) && styles.hidden
            }`}
          >
            {filteredJogs.length ? (
              filteredJogs.map((jog) => (
                <li key={jog.id} className={`${styles.jogElementContainer}`}>
                  <div
                    title="Edit this jog"
                    className={styles.jogElement}
                    onClick={() => {
                      setIsUpdateJogModalOpen(true);
                      setJogForUpdate(jog);
                    }}
                  >
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
            onClick={() => setIsCreateJogModalOpen(true)}
          >
            <img src={more} alt="Add new jog" />
          </button>
        </>
      )}
    </>
  );
};
