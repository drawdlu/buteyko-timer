import { useState, useEffect } from "react";

const Timer = ({ breatheIn, breatheOut, hold, duration }) => {
  const [index, setIndex] = useState(0);
  const [durationCount, setDurationCount] = useState(0);
  const [count, setCount] = useState(1);
  const [finished, setFinished] = useState(false);

  const phaseNames = ["Breathe In", "Hold", "Breathe Out"];

  useEffect(() => {
    if (durationCount >= duration) return;
    const phases = [breatheIn, hold, breatheOut];

    const timer = setTimeout(() => {
      setDurationCount((prev) => prev + 1);

      if (count >= phases[index]) {
        setIndex((prev) => (prev + 1) % phases.length);
        setCount(1);
      } else {
        setCount((prev) => prev + 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [index, count, durationCount, duration, breatheIn, breatheOut, hold]);

  if (durationCount >= duration && !finished) {
    setFinished(true);
  }

  let content;

  if (duration) {
    if (finished) {
      content = <div className="finished"> "Done" </div>;
    } else {
      content = (
        <>
          <div className="currentCount">{count}</div>
          <div className="phaseName">{phaseNames[index]}</div>
        </>
      );
    }
  } else {
    content = <div className="beforeStart">Breathe</div>;
  }

  return <div className="counter">{content}</div>;
};

export default Timer;
