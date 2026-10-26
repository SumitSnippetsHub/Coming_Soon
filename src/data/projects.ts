import type { Project } from "@/lib/types";

import { projectStills } from "@/data/images";

export const workIntro = {
  eyebrow: "Work",
  title: "Selected work.",
  description:
    "Websites I have built independently, and products I have contributed to as part of a professional team.",
  pageLeadBefore: "Independent websites and professional product work, built with",
  pageLeadAfter: "close to every brief.",
  stages: ["The product", "What it does", "My role", "Capabilities"],
  featureHeading: "Inside the project",
  roleHeading: "How it was built",
  capabilitiesHeading: "What went into it",
  productNote: "Selected project",
  projectButton: "Discuss a project like this",
  contactTitle: "Have a project like this in mind?",
  contactButton: "Discuss your project",
  upcomingTitle: "More recent work.",
  lead: "Independent websites and professional product work.",
  headingTop: "Selected",
  headingBottom: "work",
};

/**
 * Attribution groups (not shown as card categories):
 * - freelance: built independently as freelance work
 * - employment-solo: built independently during employment
 * - employment-team: contributed during employment; not sole ownership
 */
export const projects: Project[] = [
  {
    id: "01",
    title: "SeatsBrokers",
    category: "B2B ticketing platform",
    tagline: "Public website for a B2B ticketing operations platform.",
    summary:
      "Marketing site for SeatsBrokers, a B2B platform that connects ticket inventory, distribution, pricing, orders, delivery and payments. Developed as part of my professional role — not as sole owner of the product.",
    description:
      "Public website for a B2B ticketing platform: one inventory layer across channels, with distribution, pricing, orders, fulfilment and payments described as a connected workflow. Built as part of a professional team.",
    preview: projectStills.seatsBrokers,
    does: [
      "Explains the broker desk workflow from connect through settle",
      "Presents product modules without exposing internal systems",
      "Separates broker and B2B partner paths on the public site",
      "Points professional enquiries to the correct sales contacts",
    ],
    role: [
      "Contributed to development during employment at SeatsGroup",
      "Did not independently create the entire platform",
    ],
    capabilities: ["Marketing site", "Product storytelling", "B2B positioning"],
    url: "https://seatsbrokers.com/",
  },
  {
    id: "02",
    title: "SeatsConnect",
    category: "B2B distribution platform",
    tagline: "Public website for B2B ticket and hospitality distribution.",
    summary:
      "Marketing site for SeatsConnect, which connects event supply with approved B2B demand for tickets, hospitality and lifestyle. Developed as part of my professional role — not as sole owner of the product.",
    description:
      "Public website for a B2B distribution platform: supply connects once, partners search, quote, book and fulfil through approved channels. Built as part of a professional team.",
    preview: projectStills.seatsConnect,
    does: [
      "Describes search, quote, book and fulfil for approved partners",
      "Positions supply (venues, promoters, hospitality) separately from demand",
      "Outlines platform, API and managed connection options at a public level",
      "Keeps sourcing requests inside the described partner workflow",
    ],
    role: [
      "Contributed to development during employment at SeatsGroup",
      "Did not independently create the entire platform",
    ],
    capabilities: ["Marketing site", "B2B distribution story", "Partner journeys"],
    url: "https://seatsconnect.com/",
  },
  {
    id: "03",
    title: "The Silver Stitch",
    category: "Fashion e-commerce",
    tagline: "Handcrafted designer blouse brand with an online collection.",
    summary:
      "Website for The Silver Stitch, a designer blouse brand with collection pages, product listings and prices, studio story and enquiry routes. Independently developed during employment. I do not own the brand.",
    description:
      "Fashion brand site with collection and product listings, custom-blouse positioning, studio story and contact. Independently developed during employment.",
    preview: projectStills.silverStitch,
    does: [
      "Collection and product listing with prices",
      "Brand and studio story, including custom consultation cues",
      "Customer reviews and contact details",
      "Responsive layouts for browsing the catalogue",
    ],
    role: [
      "Independently developed the website during employment",
      "Do not own the brand or the product",
    ],
    capabilities: ["Brand website", "Product catalogue", "Enquiry journeys"],
    url: "https://www.thesilverstich.com/",
  },
  {
    id: "04",
    title: "Tyag Raj Law Firm",
    category: "Law firm website",
    tagline: "Practice website for a Ghaziabad litigation chamber.",
    summary:
      "Independent freelance website for Tyag Raj Law Firm: advocates, practice areas, court coverage, offices and a WhatsApp consultation request. Built by me; I do not represent the firm.",
    description:
      "Law firm website covering advocates, practice areas, court coverage, two Ghaziabad offices and a consultation request that opens WhatsApp. Independently developed as freelance work.",
    preview: projectStills.tyagRaj,
    does: [
      "Advocate and team profiles",
      "Practice and court coverage presented in plain language",
      "Chamber locations, hours and contact details",
      "Consultation request that composes a WhatsApp message",
    ],
    role: ["Independently developed as freelance work"],
    capabilities: ["Practice website", "Responsive UI", "Consultation journey"],
    url: "https://tyagrajlawfirm.com/",
  },
  {
    id: "05",
    title: "Tyagi & Associates",
    category: "Law firm website",
    tagline: "Practice website for advocates serving Delhi NCR.",
    summary:
      "Independent freelance website for Tyagi & Associates: practice areas, process, reviews, chamber details and consultation booking. Built by me; I do not represent the firm.",
    description:
      "Law firm website with practice areas, a six-step process, client reviews, chamber details and consultation contact. Independently developed as freelance work.",
    preview: projectStills.tyagiAssociates,
    does: [
      "Practice-area pages spanning civil, criminal, family and property work",
      "Consultation path by form, phone and WhatsApp",
      "Chamber address, hours and service locations",
      "FAQ and review sections for first-time clients",
    ],
    role: ["Independently developed as freelance work"],
    capabilities: ["Practice website", "Information architecture", "Consultation journey"],
    url: "https://tyagiandassociates.in/",
  },
  {
    id: "06",
    title: "Zenmen",
    category: "Bespoke menswear website",
    tagline: "Brand site for a New Delhi bespoke tailoring atelier.",
    summary:
      "Website for ZENmen, a Lajpat Nagar bespoke tailoring house: silhouettes, featured garments, atelier process and appointment contact. Independently developed during employment. I do not own the brand.",
    description:
      "Bespoke menswear site with featured garments, atelier process, studio films and appointment contact for a New Delhi tailoring house. Independently developed during employment.",
    preview: projectStills.zenmen,
    does: [
      "Featured product presentation with view-product links",
      "Four-step consultation, measurement, craft and delivery story",
      "Atelier location, hours and appointment contact",
      "Reviews and studio films from the public site",
    ],
    role: [
      "Independently developed the website during employment",
      "Do not own the brand or the product",
    ],
    capabilities: ["Brand website", "Product showcase", "Appointment journey"],
    url: "https://zenmen.in/",
  },
  {
    id: "07",
    title: "Blessing Mens",
    category: "Groomswear e-commerce",
    tagline: "Boutique site for bespoke sherwanis, bandhgalas and wedding suits.",
    summary:
      "Website for Blessing Mens, a Delhi groomswear boutique with category and occasion shopping, priced garments and consultation or delivery messaging. Independently developed during employment. I do not own the brand.",
    description:
      "Groomswear boutique site with sherwani, bandhgala and Indo-Western categories, priced pieces and consultation or worldwide-delivery messaging. Independently developed during employment.",
    preview: projectStills.blessingMens,
    does: [
      "Category and occasion browsing for groomswear",
      "Priced product listings on the public catalogue",
      "Consultation and delivery messaging for distant clients",
      "Brand story around atelier craft",
    ],
    role: [
      "Independently developed the website during employment",
      "Do not own the brand or the product",
    ],
    capabilities: ["Boutique website", "Product catalogue", "Enquiry journeys"],
    url: "https://www.blessingmens.com/",
  },
  {
    id: "08",
    title: "Anuraag Kaushik",
    category: "Personal brand website",
    tagline: "Site for a bridal and occasion makeup artist.",
    summary:
      "Personal website for makeup artist Anuraag Kaushik: signature style, service packages, lookbook and booking contact. Independently developed during employment. I do not represent the artist.",
    description:
      "Personal brand site for a bridal makeup artist — services and packages, lookbook, process and booking contact. Independently developed during employment.",
    preview: projectStills.anuraagKaushik,
    does: [
      "Service packages for bridal, engagement and reception work",
      "Lookbook and reel presentation",
      "Client-journey copy for studio and destination bookings",
      "Contact details for enquiries",
    ],
    role: [
      "Independently developed the website during employment",
      "Do not represent the artist or the studio",
    ],
    capabilities: ["Personal brand site", "Service presentation", "Booking contact"],
    url: "https://anuraagkaushik.in/",
  },
  {
    id: "09",
    title: "SeatsGroup",
    category: "Corporate group website",
    tagline: "Group site for a ticketing and live-experiences technology company.",
    summary:
      "Corporate website for SeatsGroup, the parent technology and distribution group behind connected ticketing, hospitality and live-events products. Developed as part of my professional role — not as sole owner of the group site or the products it lists.",
    description:
      "Group website positioning SeatsGroup as connected infrastructure for ticketing and live experiences, with public overviews of sister products. Built as part of a professional team.",
    preview: projectStills.seatsGroup,
    does: [
      "Introduces the group and its public product family",
      "Distinguishes group branding from individual platform sites",
      "Provides partnership and supplier enquiry contacts",
      "States that a fuller digital experience is still in development",
    ],
    role: [
      "Contributed to development during employment at SeatsGroup",
      "Did not independently create the entire group website or product suite",
    ],
    capabilities: ["Corporate website", "Group positioning", "Enquiry contacts"],
    url: "https://seatsgroup.com/",
  },
  {
    id: "10",
    title: "Zynovate",
    category: "Software studio website",
    tagline: "Company site for a Noida technology studio.",
    summary:
      "Website for Zynovate, a technology and software company: services, product types, process, contact and a featured case. Independently developed as freelance work. I do not own the company.",
    description:
      "Studio website for a software company — services from web and mobile to SaaS and automation, a public process, Noida contact, and a featured product case. Independently developed as freelance work.",
    preview: projectStills.zynovate,
    does: [
      "Presents web, mobile, SaaS, custom software and automation services",
      "Walks through a public idea-to-launch process",
      "Features Amrut.ai as a built product case",
      "Routes enquiries by form, email and phone",
    ],
    role: ["Independently developed as freelance work", "Do not own the company"],
    capabilities: ["Studio website", "Service architecture", "Enquiry journeys"],
    url: "https://www.zynovate.in/",
  },
];
