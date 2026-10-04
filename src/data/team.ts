import type { TeamMember } from "@/lib/types";

export const leadershipIntro = {
  eyebrow: "Leadership",
  title: "The people behind ZYNOVATE.",
  description:
    "Built on a shared belief that technology should be purposeful, our leadership brings together vision and execution to turn ideas into lasting digital products.",
};

export const team: TeamMember[] = [
  {
    name: "Rockey Raj",
    role: "Founder",
    email: "rockey@zynovate.in",
    image: {
      src: "/team/rockey-raj.jpg",
      alt: "Rockey Raj — Founder of ZYNOVATE",
      width: 1024,
      height: 1024,
    },
  },
  {
    name: "Ankita Singh",
    role: "Director",
    email: "ankita@zynovate.in",
    image: {
      src: "/team/ankita-singh.jpg",
      alt: "Ankita Singh — Director of ZYNOVATE",
      width: 774,
      height: 1032,
    },
  },
];
