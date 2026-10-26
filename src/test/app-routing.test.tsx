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
    expect(container.querySelector("#work")?.textContent).toContain("SeatsBrokers");
    expect(container.querySelector("#work")?.textContent).toContain("Zynovate");
    expect(container.querySelector("#why")?.textContent).toContain("You write to Sumit directly.");
    expect(container.querySelector("#technologies")).not.toBeNull();
    expect(container.querySelector("#technologies")?.textContent).toContain("Tools behind");
    expect(container.querySelector("#technologies")?.textContent).toContain("the work");
    expect(container.querySelector("#technologies")?.textContent).toContain("UX Centric Strategy");
    expect(container.querySelector("#technologies")?.textContent).toContain("Platform flexibility");
    expect(container.querySelector("#technologies")?.textContent).toContain("Next.js");
    expect(container.querySelector("#technologies")?.textContent).toContain("PostgreSQL");
    expect(container.querySelector("#technologies")?.textContent).toContain("Shopify");
    expect(container.querySelector("#technologies")?.textContent).toContain("Supabase");
    expect(container.querySelectorAll("#products")).toHaveLength(1);
    expect(container.querySelector("#products")?.textContent).toContain("Built around your goals");
    expect(container.querySelector("#products")?.textContent).toContain("Projects tailored to you");
    expect(container.querySelector("#products")?.textContent).toContain("A solution built around your idea");
    expect(container.querySelector("#products")?.textContent).toContain("Deployment and handover");
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
