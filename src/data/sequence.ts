export type SequenceTone = "lavender" | "peach" | "mint" | "pink";

export const sequenceIntro = {
  titleTop: "From the first thought",
  titleBottom: "to the next step",
  lines: ["We will stay in touch.", "Personal, direct and on equal terms."],
};

export interface SequenceStep {
  number: string;
  title: string;
  description: string;
  tone: SequenceTone;
}

export const sequence: SequenceStep[] = [
  {
    number: "01",
    title: "Understanding the project",
    description:
      "We clarify goals, target group, functions, budget and timeline. And together we determine if we are the right fit for you.",
    tone: "lavender",
  },
  {
    number: "02",
    title: "Direction & Fixed Price",
    description:
      "For suitable projects, we'll show you an initial visual direction and define the scope. Afterwards, you'll receive a transparent fixed-price quote.",
    tone: "peach",
  },
  {
    number: "03",
    title: "Design & Development",
    description:
      "We design and develop your solution individually. You can see the current status every day and give direct feedback.",
    tone: "mint",
  },
  {
    number: "04",
    title: "Launch & Support",
    description:
      "We test, publish and hand everything over personally. If you like, we stay on for maintenance and further development.",
    tone: "pink",
  },
];
