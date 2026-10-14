import { useState } from "react";

const TimerForm = ({ phases, duration, onStart }) => {
  const [breatheInTime, setBreatheInTime] = useState(phases.breatheIn);
  const [breatheOutTime, setBreatheOutTime] = useState(phases.breatheOut);
  const [holdTime, setHoldTime] = useState(phases.hold);
  const [durationTime, setDurationTime] = useState(duration);

  const handleBreatheInChange = (e) => {
    setBreatheInTime(e.target.value);
  };

  const handleHoldChange = (e) => {
    setHoldTime(e.target.value);
  };

  const handleBreatheOutChange = (e) => {
    setBreatheOutTime(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDurationTime(e.target.value);
  };

  const handlSubmit = (e) => {
    e.preventDefault();

    onStart({
      breatheInTime: breatheInTime,
      holdTime: holdTime,
      breatheOutTime: breatheOutTime,
      duration: durationTime,
    });
  };

  return (
    <div className="timerForm">
      <form onSubmit={handlSubmit}>
        <div className="submit">
          <button>Start</button>
        </div>
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
          <label htmlFor="hold">Duration: </label>
          <input
            type="number"
            name="duration"
            min="60"
            value={durationTime}
            onChange={handleDurationChange}
            required
          />
        </div>
      </form>
    </div>
  );
};

export default TimerForm;
