import { useState, useEffect } from "react";

const Timer = ({ phases, duration, start }) => {
  const [index, setIndex] = useState(0);
  const [durationCount, setDurationCount] = useState(0);
  const [count, setCount] = useState(1);
  const [finished, setFinished] = useState(false);

  const phaseNames = ["Breathe In", "Hold", "Breathe Out"];

  useEffect(() => {
    if (durationCount >= duration || !start) return;
    const phase = [phases.breatheIn, phases.hold, phases.breatheOut];

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
  }, [index, count, durationCount, duration, phases, start]);

  if (!start) {
    return (
      <div className="counter">
        <div className="beforeStart">Breathe</div>
      </div>
    );
  }

  if (durationCount >= duration && !finished) {
    setFinished(true);
  }

  let content;

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

  return <div className="counter">{content}</div>;
};

export default Timer;
