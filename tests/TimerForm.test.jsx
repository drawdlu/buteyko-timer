import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TimerForm from "../src/components/timerform/TimerForm";

describe("TimerForm Component", () => {
  const phases = { breatheIn: 2, hold: 3, breatheOut: 3 };
  const breathingSets = 5;
  const handleStart = vi.fn();

  it("renders the timer form", () => {
    render(
      <TimerForm
        phases={phases}
        breathingSets={breathingSets}
        onStart={handleStart}
      />,
    );

    const breatheInInput = screen.getByLabelText(/breathe in/i);
    const holdInput = screen.getByLabelText(/hold/i);
    const breatheOutInput = screen.getByLabelText(/breathe out/i);
    const breathingSetsInput = screen.getByLabelText(/breathing sets/i);

    expect(breatheInInput).toBeInTheDocument();
    expect(holdInput).toBeInTheDocument();
    expect(breatheOutInput).toBeInTheDocument();
    expect(breathingSetsInput).toBeInTheDocument();
  });

  it("pushes through with default values", async () => {
    const user = userEvent.setup();

    render(
      <TimerForm
        phases={phases}
        breathingSets={breathingSets}
        onStart={handleStart}
      />,
    );

    const button = screen.getByText(/start/i);
    await user.click(button);

    expect(handleStart).toHaveBeenCalled();
  });

  it("doesn't push through when a value is missing", async () => {
    const user = userEvent.setup();

    render(
      <TimerForm
        phases={phases}
        breathingSets={breathingSets}
        onStart={handleStart}
      />,
    );

    const button = screen.getByText(/start/i);
    const holdInput = screen.getByLabelText(/hold/i);
    await user.clear(holdInput);
    await user.click(button);

    expect(handleStart).not.toHaveBeenCalled();
  });
});
