import { useState, useEffect } from "react";
import styles from "./Timer.module.css";

const Timer = ({ phases, duration, start, onRestart }) => {
  const [index, setIndex] = useState(0);
  const [durationCount, setDurationCount] = useState(0);
  const [count, setCount] = useState(1);
  const [pause, setPause] = useState(false);

  const phaseNames = ["Breathe In", "Breathe Out", "Hold"];
  const phaseClasses = ["breatheIn", "breatheOut", "hold"];
  const phaseClass = phaseClasses[index];
  const phase = [phases.breatheIn, phases.breatheOut, phases.hold];
  const isPaused = pause ? "isPaused" : "";

  const isFinished = durationCount >= duration;

  useEffect(() => {
    if (isFinished || !start || pause) return;
    const phase = [phases.breatheIn, phases.breatheOut, phases.hold];

    const timer = setTimeout(() => {
      setDurationCount((prev) => prev + 1);

      if (count >= phase[index]) {
        setIndex((prev) => (prev + 1) % phase.length);
        setCount(1);
      } else {
        setCount((prev) => prev + 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [index, count, durationCount, isFinished, phases, start, pause]);

  if (!start) {
    return (
      <div className={styles.componentContainer}>
        <div className={styles.container}>
          <div className={styles.breathingCircle}>
            <div className={styles.breathingText}>
              <span className={styles.staticText}>Breathe</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  let content;

  const pauseTimer = () => {
    resetToBreatheIn();
    setPause(true);
  };

  const resetToBreatheIn = () => {
    const roundElapsedSeconds = getResetDurationNumber();
    setDurationCount((prev) => prev - roundElapsedSeconds);
    setCount(1);
    setIndex(0);
  };

  const getResetDurationNumber = () => {
    let value;
    switch (index) {
      case 0:
        value = count - 1;
        break;
      case 1:
        value = count - 1 + phases.breatheIn;
        break;
      default:
        value = count - 1 + phases.breatheIn + phases.breatheOut;
        break;
    }

    return value;
  };

  const continueTimer = () => {
    setPause(false);
  };

  const handleRestart = () => {
    setIndex(0);
    setDurationCount(0);
    setCount(1);
    setPause(false);
    onRestart();
  };

  if (isFinished) {
    content = (
      <div className={styles.container}>
        <div className={`${styles.breathingCircle} ${styles[phaseClass]}`}>
          <div className={styles.breathingText}>
            <span className={styles.staticText}>Done</span>
          </div>
        </div>
        <div className={styles.restartButton}>
          <button onClick={handleRestart}>↻</button>
        </div>
      </div>
    );
  } else {
    content = (
      <div className={styles.container}>
        <div
          key={pause ? "reset" : phaseClass}
          className={`${styles.breathingCircle} ${styles[phaseClass]} ${styles[isPaused]}`}
          style={{ "--breathing-duration": `${phase[index]}s` }}
        >
          <div
            key={styles[phaseClass]}
            className={`${styles.breathingText} ${styles[phaseClass]} ${styles[isPaused]}`}
          >
            <div className={styles.count}>{count}</div>
            <div className={`${styles.phaseName} ${styles[phaseClass]}`}>
              {phaseNames[index]}
            </div>
          </div>
        </div>
        <div className={styles.pauseButton}>
          {pause ? (
            <button onClick={continueTimer}>CONTINUE</button>
          ) : (
            <button onClick={pauseTimer}>PAUSE</button>
          )}
        </div>
        <div className={styles.restartButton}>
          <button onClick={handleRestart}>↻</button>
        </div>
      </div>
    );
  }

  return <div className={styles.componentContainer}>{content}</div>;
};

export default Timer;
