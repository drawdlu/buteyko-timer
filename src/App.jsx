import { useState } from "react";
import "./App.css";
import Timer from "./components/timer/Timer";
import TimerForm from "./components/timerform/TimerForm";

const defaultPhases = { breatheIn: 2, hold: 3, breatheOut: 3 };
const defaultBreathingSets = 5;

function App() {
  const [phases, setPhases] = useState(defaultPhases);
  const [breathingSets, setBreathingSets] = useState(defaultBreathingSets);
  const [start, setStart] = useState(false);

  const duration =
    Object.values(phases).reduce((prev, current) => prev + current) *
    breathingSets;

  const handleStart = (data) => {
    setPhases({
      breatheIn: data.breatheInTime,
      hold: data.holdTime,
      breatheOut: data.breatheOutTime,
    });
    setBreathingSets(data.breathingSets);
    setStart(true);
  };

  const handleRestart = () => {
    setStart(false);
  };

  console.log(Object.values(phases).reduce((prev, current) => prev + current));

  return (
    <main>
      <Timer
        phases={phases}
        duration={duration}
        start={start}
        onRestart={handleRestart}
      />
      {!start && (
        <TimerForm
          phases={phases}
          breathingSets={breathingSets}
          onStart={handleStart}
        />
      )}
    </main>
  );
}

export default App;
