import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

describe("something truthy and falsy", () => {
  it("true to be true", () => {
    expect(true).toBe(true);
  });

  it("false to be false", () => {
    expect(false).toBe(false);
  });
});

describe("App", () => {
  it("saves values to local", async () => {
    localStorage.clear();
    const user = userEvent.setup();

    render(<App />);

    const startButton = screen.getByRole("button", { name: /start/i });
    const breatheInInput = screen.getByLabelText(/breathe in/i);
    const breatheOutInput = screen.getByLabelText(/breathe out/i);
    const holdInput = screen.getByLabelText(/hold/i);
    const setsInput = screen.getByLabelText(/cycles/i);

    await user.type(breatheInInput, "{backspace}4");
    await user.type(breatheOutInput, "{backspace}4");
    await user.type(holdInput, "{backspace}4");
    await user.type(setsInput, "{backspace}5");
    await user.click(startButton);

    const phases = JSON.parse(localStorage.getItem("phases"));
    const expectedPhases = { breatheIn: 4, breatheOut: 4, hold: 4 };
    const sets = localStorage.getItem("sets");
    const expectedSets = "15";

    expect(phases).toEqual(expectedPhases);
    expect(sets).toEqual(expectedSets);
  });
});
