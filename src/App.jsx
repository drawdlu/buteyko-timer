import { useState } from "react";
import "./App.css";
import Timer from "./components/timer/Timer";
import TimerForm from "./components/timerform/TimerForm";

const defaultPhases = { breatheIn: 2, hold: 3, breatheOut: 3 };
const defaultBreathingSets = 10;

function App() {
  const getPhases = () => {
    const localPhases = JSON.parse(localStorage.getItem("phases"));

    return localPhases ? localPhases : defaultPhases;
  };

  const getSets = () => {
    const localSets = localStorage.getItem("sets");

    return localSets ? localSets : defaultBreathingSets;
  };

  const [phases, setPhases] = useState(getPhases());
  const [breathingSets, setBreathingSets] = useState(getSets());
  const [start, setStart] = useState(false);

  const duration =
    Object.values(phases).reduce((prev, current) => prev + current) *
    breathingSets;

  const handleStart = (data) => {
    const dataPhases = {
      breatheIn: data.breatheInTime,
      hold: data.holdTime,
      breatheOut: data.breatheOutTime,
    };
    setPhases(dataPhases);
    setBreathingSets(data.breathingSets);
    setStart(true);

    saveToLocal(dataPhases, data.breathingSets);
  };

  const saveToLocal = (dataPhases, dataSets) => {
    localStorage.setItem("phases", JSON.stringify(dataPhases));
    localStorage.setItem("sets", dataSets);
  };

  const handleRestart = () => {
    setStart(false);
  };

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
