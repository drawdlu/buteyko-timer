import { useState } from "react";

const TimerForm = ({ phases, breathingSets, onStart }) => {
  const [breatheInTime, setBreatheInTime] = useState(phases.breatheIn);
  const [breatheOutTime, setBreatheOutTime] = useState(phases.breatheOut);
  const [holdTime, setHoldTime] = useState(phases.hold);
  const [breathingSetCount, setBreathingSetCount] = useState(breathingSets);

  const getDuration = (oneSetTotal, setCount) => {
    const totalSeconds = oneSetTotal * setCount;
    const seconds = totalSeconds % 60;
    const minutes = Math.trunc(totalSeconds / 60);

    return { minutes: minutes, seconds: seconds };
  };

  const [duration, setDuration] = useState(
    getDuration(breatheInTime + breatheOutTime + holdTime, breathingSetCount),
  );

  const handleBreatheInChange = (e) => {
    const value = e.target.value;
    const oneSetTime = breatheOutTime + holdTime + value;
    setDuration(getDuration(oneSetTime, breathingSetCount));
    setBreatheInTime(value);
  };

  const handleHoldChange = (e) => {
    const value = e.target.value;
    const oneSetTime = breatheInTime + breatheOutTime + value;
    setDuration(getDuration(oneSetTime, breathingSetCount));
    setHoldTime(value);
  };

  const handleBreatheOutChange = (e) => {
    const value = e.target.value;
    const oneSetTime = breatheInTime + holdTime + value;
    setDuration(getDuration(oneSetTime, breathingSetCount));
    setBreatheOutTime(value);
  };

  const handleBreathingSetChange = (e) => {
    const value = e.target.value;
    const oneSetTime = breatheInTime + breatheOutTime + holdTime;
    setDuration(getDuration(oneSetTime, value));
    setBreathingSetCount(value);
  };

  const handlSubmit = (e) => {
    e.preventDefault();

    onStart({
      breatheInTime: breatheInTime,
      holdTime: holdTime,
      breatheOutTime: breatheOutTime,
      breathingSets: breathingSetCount,
    });
  };

  return (
    <div className="timerForm">
      <form onSubmit={handlSubmit}>
        <div className="submit">
          <button>Start</button>
        </div>
        <div className="timeExplanation">Time is calculated in seconds</div>
        <div className="field">
          <label htmlFor="breatheIn">Breathe In Time: </label>
          <input
            type="number"
            name="breatheIn"
            id="breatheIn"
            min="2"
            value={breatheInTime}
            onChange={handleBreatheInChange}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="breatheOut">Breathe Out Time: </label>
          <input
            type="number"
            name="breatheOut"
            id="breatheOut"
            min="3"
            value={breatheOutTime}
            onChange={handleBreatheOutChange}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="hold">Hold Time: </label>
          <input
            type="number"
            name="hold"
            id="hold"
            min="3"
            value={holdTime}
            onChange={handleHoldChange}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="hold">Breathing Sets: </label>
          <input
            type="number"
            name="duration"
            min="5"
            value={breathingSetCount}
            onChange={handleBreathingSetChange}
            required
          />
          <div className="duration">
            Total Time: {duration.minutes} minutes {duration.seconds} seconds
          </div>
        </div>
      </form>
    </div>
  );
};

export default TimerForm;
