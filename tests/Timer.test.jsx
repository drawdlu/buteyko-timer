import { beforeEach, afterEach, describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import Timer from "../src/components/timer/Timer";

describe("Timer Component", () => {
  const phases = { breatheIn: 2, hold: 3, breatheOut: 3 };
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders timer correctly at breatheIn", () => {
    render(<Timer phases={phases} duration={10} start={true} />);

    const timeToAdvance = 1;
    for (let i = 0; i < timeToAdvance; ++i) {
      act(() => {
        vi.advanceTimersByTime(1000);
      });
    }

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText(/breathe in/i)).toBeInTheDocument();
  });

  it("renders timer correctly at hold", () => {
    render(<Timer phases={phases} duration={10} start={true} />);

    const timeToAdvance = 2;
    for (let i = 0; i < timeToAdvance; ++i) {
      act(() => {
        vi.advanceTimersByTime(1000);
      });
    }

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText(/hold/i)).toBeInTheDocument();
  });

  it("renders timer correctly at breatheOut", () => {
    render(<Timer phases={phases} duration={10} start={true} />);

    const timeToAdvance = 5;
    for (let i = 0; i < timeToAdvance; ++i) {
      act(() => {
        vi.advanceTimersByTime(1000);
      });
    }

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText(/breathe out/i)).toBeInTheDocument();
  });
});
