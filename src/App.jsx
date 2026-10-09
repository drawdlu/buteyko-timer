import { useState } from "react";
import "./App.css";
import Timer from "./components/timer/Timer";

function App() {
  const [breatheInTime, setBreatheInTime] = useState(2);
  const [breatheOutTime, setBreatheOutTime] = useState(3);
  const [holdTime, setHoldTime] = useState(3);
  const [duration, setDuration] = useState(0);

  return (
    <main>
      <Timer
        breatheIn={breatheInTime}
        breatheOut={breatheOutTime}
        hold={holdTime}
        duration={duration}
      />
    </main>
  );
}

export default App;
