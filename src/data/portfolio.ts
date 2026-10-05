// All site content lives here. Edit this file to update the portfolio —
// no component changes needed. Search for "TODO" to find placeholders.

export const site = {
  // The public address of this site. Change it here if you move to a custom domain.
  url: "https://sunidhi-portfolio-k5ii.onrender.com",
  // Google Search Console "HTML tag" verification code (the content="..." value only).
  googleVerification: "",
};

export const profile = {
  name: "Sunidhi Thakur",
  role: "Full-Stack Developer",
  tagline:
    "I build production marketplaces, streaming platforms and payment flows — end to end, from React UI to Node APIs and the database underneath.",
  location: "",
  photo: "/profile.jpg",
  email: "sunidhisumbria@gmail.com",
  phone: "+91 70091 45910",
  // TODO: drop resume.pdf into /public and set this to "/resume.pdf"
  resumeUrl: "",
  links: {
    github: "https://github.com/Sunidhisumbria/",
    linkedin: "https://www.linkedin.com/in/sunidhithakurdev",
  },
};

export const about = [
  "I'm a full-stack developer with almost three years of experience shipping real products for real users. My work spans the whole stack: React and Next.js frontends, Node.js REST APIs, and MongoDB or Postgres data layers.",
  "Most of what I've built lives in production: multi-role hiring marketplaces, a subscription music-streaming platform, vendor and service-booking dashboards. I'm comfortable with the parts that tend to be tricky — Stripe subscriptions and webhooks, real-time chat with Socket.IO, auth and role-based access, file uploads to S3, and SEO for public pages.",
  "I use AI tools like Claude and Codex daily to move faster, and I care about clean API contracts, maintainable state management, and interfaces that just work.",
];

export const highlights = [
  { value: "~3 yrs", label: "Professional experience" },
  { value: "5", label: "Production platforms shipped" },
  { value: "Full-stack", label: "Frontend · API · Database" },
];

export const stack: { group: string; items: string[] }[] = [
  {
    group: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Redux Toolkit",
      "TanStack Query",
      "Tailwind CSS",
      "Material UI",
      "Bootstrap",
      "React Router",
      "React Hook Form",
      "Zod",
      "Zustand",
      "Redux Persist",
      "Vite",
      "HTML & CSS",
    ],
  },
  {
    group: "Backend",
    items: ["Node.js", "Express", "Hono", "REST APIs", "Swagger / OpenAPI",  "JWT", "OAuth", "bcrypt", "OTP verification"],
  },
  {
    group: "Data",
    items: ["MongoDB", "Mongoose", "PostgreSQL", "Drizzle ORM"],
  },
  {
    group: "Auth",
    items: ["NextAuth", "JWT", "bcrypt", "OAuth (Google, Apple, Facebook)", "OTP verification", "Role-based access"],
  },
  {
    group: "Integrations",
    items: ["Stripe", "AWS S3", "Firebase", "Twilio", "SendGrid", "Google Maps"],
  },
  {
    group: "Workflow",
    items: ["Git & GitHub", "Postman", "Vercel", "Turborepo", "Technical SEO", "Claude Code", "Codex"],
  },
];

export type Project = {
  name: string;
  category: string;
  // Omit url when there's no public live site to link to
  url?: string;
  domain: string;
  summary: string;
  tech: string[];
  points: string[];
  // Optional screenshot in /public, e.g. "/projects/cfader.png"
  image?: string;
  accent: string;
};

export const projects: Project[] = [
  {
    name: "DayFlex",
    category: "Multi-role hiring & job marketplace",
    url: "https://www.dayflex.co.uk",
    domain: "dayflex.co.uk",
    image: "/projects/dayflex.jpg",
    summary:
      "A UK marketplace connecting businesses and individuals with contractors — from posting a job to discovery, messaging, payment and completion.",
    tech: [
      "React 18",
      "Vite",
      "Redux Toolkit",
      "TanStack Query",
      "Material UI",
      "Tailwind",
      "Socket.IO",
      "Stripe",
      "Firebase",
      "Google Maps",
    ],
    points: [
      "Built marketplace workflows for business, individual and contractor users: job creation, contractor discovery, interest submission and job lifecycle tracking.",
      "Set up the React 18 / Vite frontend architecture — Redux Toolkit + TanStack Query, centralized Axios layer, token auth, protected routes and session-expiry handling.",
      "Built rich contractor profiles (skills, certifications, availability, portfolios, verification documents) with messaging, ratings and OTP account recovery.",
      "Integrated Socket.IO real-time chat, Firebase notifications, Stripe payments & subscriptions, Google Maps location search and multilingual support.",
      "Implemented SEO-focused public and city-specific pages with reusable metadata, structured data and indexing controls.",
    ],
    accent: "#5eead4",
  },
  {
    name: "Cross Fader",
    category: "Music streaming platform",
    url: "https://cfader.com",
    domain: "cfader.com",
    image: "/projects/cfader.jpg",
    summary:
      "An online radio and music-streaming platform with free and premium tiers, built across a React web app, a Node.js API and an admin portal.",
    tech: [
      "React 18",
      "Redux Toolkit",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
      "Stripe",
      "AWS S3",
      "Twilio",
      "SendGrid",
      "Swagger",
    ],
    points: [
      "Worked across all three layers: React frontend, Node.js/Express REST API and an EJS admin portal.",
      "Built the global audio player — shared playback state, continuous radio streaming, playlists, and timed ads that pause and resume the stream for free-tier listeners.",
      "Developed REST APIs for users, songs, playlists, mixes, events, reviews, ads, promo codes and subscriptions with validation and middleware layers.",
      "Integrated Stripe Elements and subscription webhooks for checkout, upgrades and cancellations — including App Store and Play Store subscription events.",
      "Secured the platform with JWT + bcrypt and role-based access; added S3 uploads, Twilio SMS, SendGrid email, Swagger docs and Winston logging.",
    ],
    accent: "#f9a8d4",
  },
  {
    name: "DUN",
    category: "Service hiring platform",
    url: "https://dunservices.com",
    domain: "dunservices.com",
    image: "/projects/dun.jpg",
    summary:
      "A service marketplace where customers request quotes, book businesses, pay and leave reviews — with live tracking along the way.",
    tech: ["React", "TypeScript", "Express", "Stripe", "React Hook Form", "REST APIs", "OAuth"],
    points: [
      "Built customer and business dashboards for quotation management, booking workflows, reviews and marketplace features.",
      "Implemented real-time chat, live location tracking, push notifications and Stripe payments with offline-payment support.",
      "Added Google, Apple and Facebook sign-in, and defined REST API contracts together with the backend team.",
    ],
    accent: "#fcd34d",
  },
  {
    name: "Our Review",
    category: "Vendor & customer marketplace",
    url: "https://our-review.com",
    domain: "our-review.com",
    image: "/projects/ourreview.jpg",
    summary:
      "A marketplace connecting vendors and customers — product listings, orders, delivery and payments, built around trusted two-way reviews.",
    tech: ["React", "Redux", "React Hook Form", "Zod", "Stripe", "Google Maps", "REST APIs"],
    points: [
      "Built vendor and customer marketplace workflows: dashboards, product uploads, order tracking, delivery management, ratings and reviews.",
      "Implemented authentication, reusable validated forms (React Hook Form + Zod), shared Redux state and Stripe payment integration.",
    ],
    accent: "#a5b4fc",
  },
  {
    name: "Primo Offers",
    category: "Local offers & deals marketplace",
    domain: "primooffers.com",
    summary:
      "A local deals marketplace where users discover offers nearby, save favourites, check out and earn through referrals.",
    tech: ["React", "TypeScript", "Tailwind CSS", "REST APIs", "Google Maps"],
    points: [
      "Built responsive offer-discovery workflows: search, filtering, favorites, offer details, checkout, order history, wallet, referrals and OTP-based authentication.",
      "Turned Figma designs into reusable React components and responsive Tailwind CSS layouts in collaboration with the design team.",
    ],
    accent: "#86efac",
  },
];

export const sideProjects = [
  {
    name: "Webhook Retry Engine",
    description:
      "A reliable webhook delivery service with retry logic, built with Hono, TypeScript and Postgres.",
    tech: ["Hono", "TypeScript", "PostgreSQL"],
    url: "https://github.com/Sunidhisumbria/product-engineer-ps",
  },
  {
    name: "Care on Deck",
    description:
      "A healthcare marketplace and practice-management platform: patients find and book care, clinics run scheduling and operations. One Next.js codebase with 89 API endpoints, multi-tenant row-level security and shared TypeScript types.",
    tech: ["Next.js 15", "TypeScript", "PostgreSQL", "Drizzle", "Typesense", "Firebase Auth", "Stripe", "AWS S3"],
    url: "https://github.com/Sunidhisumbria/Care-on-Deck",
  },
];

export const education = {
  degree: "B.Tech, Computer Science & Engineering",
  school: "Sri Sai Group of Institutes",
};

export const achievements = [
  "Best Student award — ISTE (Indian Society for Technical Education)",
  "Runner-up, Hackathon",
];
