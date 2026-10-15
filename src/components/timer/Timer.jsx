import { useState, useEffect } from "react";

const Timer = ({ phases, duration, start, onRestart }) => {
  const [index, setIndex] = useState(0);
  const [durationCount, setDurationCount] = useState(0);
  const [count, setCount] = useState(1);
  const [pause, setPause] = useState(false);

  const phaseNames = ["Breathe In", "Breathe Out", "Hold"];
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
      <div className="counter">
        <div className="beforeStart">Breathe</div>
      </div>
    );
  }

  let content;

  const pauseTimer = () => {
    setPause(true);
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
      <>
        <div className="finished"> "Done" </div>{" "}
        <div className="restart">
          <button onClick={handleRestart}>Restart Symbol</button>
        </div>
      </>
    );
  } else {
    content = (
      <>
        <div className="currentCount">{count}</div>
        <div className="phaseName">{phaseNames[index]}</div>
        {pause ? (
          <button onClick={continueTimer}>Continue</button>
        ) : (
          <button onClick={pauseTimer}>Pause</button>
        )}
        <div className="restart">
          <button onClick={handleRestart}>Restart Symbol</button>
        </div>
      </>
    );
  }

  return <div className="counter">{content}</div>;
};

export default Timer;
