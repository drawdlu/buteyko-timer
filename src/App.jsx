import { useState } from "react";
import "./App.css";
import Timer from "./components/timer/Timer";
import TimerForm from "./components/timerform/TimerForm";

const defaultPhases = { breatheIn: 2, hold: 3, breatheOut: 3 };

function App() {
  const [phases, setPhases] = useState(defaultPhases);
  const [duration, setDuration] = useState(60);
  const [start, setStart] = useState(false);

  const handleStart = (data) => {
    setPhases({
      breatheIn: data.breatheInTime,
      hold: data.holdTime,
      breatheOut: data.breatheOutTime,
    });
    setDuration(data.duration);
    setStart(true);
  };

  return (
    <main>
      <Timer phases={phases} duration={duration} start={start} />
      <TimerForm phases={phases} duration={duration} onStart={handleStart} />
    </main>
  );
}

export default App;
