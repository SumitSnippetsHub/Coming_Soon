import { cleanup, render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { HomePage } from "@/components/home/HomePage";

afterEach(() => {
  cleanup();
});

describe("App", () => {
  it("renders the home page", async () => {
    const { container } = render(<HomePage />);

    await waitFor(() => expect(container.firstChild).not.toBeNull());
    expect(container.querySelector("#top")).not.toBeNull();
    expect(container.querySelector("#about")).not.toBeNull();
    expect(container.querySelectorAll("#services")).toHaveLength(1);
    expect(container.querySelectorAll("#work")).toHaveLength(1);
    expect(container.querySelectorAll("#why")).toHaveLength(1);
    expect(container.querySelector("#work")?.textContent).toContain("Antique Vehrs");
    expect(container.querySelector("#why")?.textContent).toContain("You write to Sumit directly.");
    expect(container.querySelector("#technologies")).not.toBeNull();
    expect(container.querySelectorAll("#products")).toHaveLength(1);
    expect(container.querySelector("#products")?.textContent).toContain("from €5,900");
    expect(container.querySelector("#products")?.textContent).toContain("Individual concept");
    expect(container.querySelector("#products")?.textContent).toContain("Personal handover & briefing");
    expect(container.querySelectorAll("#process")).toHaveLength(1);
    expect(container.querySelector("#process")?.textContent).toContain("From the first thought");
    expect(container.querySelector("#process")?.textContent).toContain("Direction & Fixed Price");
    expect(container.querySelector("#process")?.textContent).toContain("Launch & Support");
    expect(container.querySelectorAll("#testimonials")).toHaveLength(1);
    expect(container.querySelector("#testimonials")?.textContent).toContain("Larisa");
    expect(container.querySelector("#testimonials")?.textContent).toContain("5 out of 5 stars");
    expect(container.querySelectorAll("#faq")).toHaveLength(1);
    expect(container.querySelector("#faq")?.textContent).toContain("Which digital services does grow2gether offer?");
  });
});
