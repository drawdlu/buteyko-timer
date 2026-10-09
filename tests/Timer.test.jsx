import { beforeEach, afterEach, describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import Timer from "../src/components/timer/Timer";

describe("Timer Component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders timer correctly at breatheIn", () => {
    render(<Timer breatheIn={2} breatheOut={3} hold={3} duration={10} />);

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
    render(<Timer breatheIn={2} breatheOut={3} hold={3} duration={10} />);

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
    render(<Timer breatheIn={2} breatheOut={3} hold={3} duration={10} />);

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
