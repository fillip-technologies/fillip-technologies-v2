/**
 * Internship programme content.
 * All page copy lives here so text, tracks, fee and FAQs can be changed in
 * one place without touching the components.
 */

export const INTERNSHIP_PATH = "/internship";

export const REGISTRATION_FEE = "₹500";

/**
 * Fired by the hero form and "Apply for this track" to prefill the registration
 * form. Detail: a partial of { name, phone, email, domain, mode }.
 */
export const PREFILL_EVENT = "internship:prefill";

export type PrefillDetail = Partial<Record<"name" | "phone" | "email" | "domain" | "mode", string>>;

/** Phrases for the running highlight strip under the hero. */
export const OFFER_HIGHLIGHTS = [
  "Admissions open for the new batch",
  "Registration at just ₹500",
  "Online & classroom batches",
  "Training + Internship certificates",
  "Learn on the Engineers Clinic platform",
  "Guided mentorship & practical projects",
] as const;

/** Company facts already published on the site (Our Story / home stats). */
export const TRUST_STATS = [
  { value: "Since 2013", label: "building digital products" },
  { value: "150+", label: "projects completed" },
  { value: "55+", label: "in-house experts" },
] as const;

export const ENGINEERS_CLINIC = {
  name: "Engineers Clinic",
  url: "https://engineersclinic.com",
  logo: "/images/Engineers-clinic-logo-black.png",
} as const;

export type TrackIconKey = "marketing" | "fullstack" | "ai" | "data";

export type Track = {
  id: string;
  /** Short display name for chips and tabs. */
  name: string;
  /** Also the value saved as "Domain of interest" in the registration form. */
  title: string;
  short: string;
  icon: TrackIconKey;
  overview: string;
  learn: readonly string[];
  tools: readonly string[];
  idealFor: string;
};

export const TRACKS: readonly Track[] = [
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    title: "Digital Marketing",
    short: "SEO, social media & ads",
    icon: "marketing",
    overview:
      "Work on practical tasks like social media planning, SEO, content ideas and campaign tracking, and learn how brands actually grow online.",
    learn: [
      "Social media planning and content ideas",
      "SEO and keyword research",
      "Running ads and tracking campaigns",
      "Analysing performance to improve brand visibility",
    ],
    tools: ["Google Ads", "Meta Ads", "Google Analytics", "Search Console", "Canva"],
    idealFor: "Students who enjoy combining creativity with data.",
  },
  {
    id: "full-stack",
    name: "Full Stack",
    title: "Full Stack Development",
    short: "Front-end, back-end & APIs",
    icon: "fullstack",
    overview:
      "Learn both front-end and back-end development. Build web pages, connect them through APIs and see how real websites work from design to deployment.",
    learn: [
      "Front-end development: layouts, components and responsive pages",
      "Back-end basics: servers, databases and APIs",
      "Connecting the front-end and back-end through APIs",
      "Taking a small project from design to deployment",
    ],
    tools: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Git"],
    idealFor: "Students who love programming and want to understand complete website development.",
  },
  {
    id: "ai-ml",
    name: "AI / ML",
    title: "Artificial Intelligence & Machine Learning (AI/ML)",
    short: "Models, algorithms & AI basics",
    icon: "ai",
    overview:
      "Get a practical introduction to machine learning: work with small datasets, learn core algorithm concepts and see how AI supports modern businesses.",
    learn: [
      "Core machine learning algorithm concepts",
      "Preparing data for machine learning",
      "Building and evaluating basic ML models",
      "How AI is used in real business products",
    ],
    tools: ["Python", "NumPy", "Pandas", "scikit-learn", "Jupyter"],
    idealFor: "Learners who want to move into AI and machine learning roles.",
  },
  {
    id: "data-science",
    name: "Data Science / Analytics",
    title: "Data Science / Data Analytics",
    short: "Analysis, dashboards & insights",
    icon: "data",
    overview:
      "Learn to collect, clean and analyse data, build dashboards and turn numbers into insights that support business decisions.",
    learn: [
      "Collecting, cleaning and organising data",
      "Exploratory data analysis and statistics basics",
      "Data visualisation and dashboards",
      "Turning analysis into business insights and reports",
    ],
    tools: ["Excel", "SQL", "Python", "Pandas", "Power BI"],
    idealFor: "Students who enjoy numbers, patterns and solving problems with data.",
  },
];

/** Short labels for the hero "at a glance" bar. */
export const KEY_FACTS = [
  { label: "Tracks", value: `${TRACKS.length} domains` },
  { label: "Mode", value: "Online or classroom" },
  { label: "Certificates", value: "Training + Internship" },
  { label: "Attendance", value: "Minimum 75%" },
  { label: "Registration", value: REGISTRATION_FEE },
] as const;

/** The three notes students must read before applying. */
export const IMPORTANT_NOTES = [
  {
    title: "Fully paid programme",
    description:
      "This internship is fully paid. Students pay for the training, the learning platform (Engineers Clinic, engineersclinic.com) and the internship.",
  },
  {
    title: "Two certificates",
    description:
      "Interns receive a Training Certificate and an Internship Certificate from Fillip Technologies Pvt. Ltd.",
  },
  {
    title: "75% attendance is mandatory",
    description:
      "A minimum of 75% attendance in the online or classroom programme is required to receive any certificate.",
  },
] as const;

export const ELIGIBILITY = [
  "College or university students currently pursuing a course such as BCA, BBA or B.Tech",
  "Students from any academic year or batch",
  `A genuine interest in one of the ${TRACKS.length} internship tracks`,
  "Able to attend an online batch or our classroom batch in Patna",
  "Ready to commit to a minimum of 75% attendance",
] as const;

/** Application journey, in order. */
export const PROCESS_STEPS = [
  { title: "Apply & accept terms", description: "Read the programme notes and accept the terms & conditions." },
  { title: "Fill the form", description: "Share your personal, college and internship details." },
  { title: "Registration & payment", description: `Complete registration by paying the ${REGISTRATION_FEE} registration fee.` },
  { title: "Batch allotment", description: "Get placed in a classroom batch or an online batch." },
  { title: "Routine & receipt", description: "Receive your class routine and payment receipt." },
  { title: "Engineers Clinic login", description: "Get your login details for the Engineers Clinic learning platform." },
] as const;

export const FAQS = [
  {
    question: "Is this a paid internship?",
    answer: `Yes. This is a fully paid programme: students pay for the training, the Engineers Clinic learning platform and the internship. Registration starts at ${REGISTRATION_FEE}, and our team shares the complete fee details with you.`,
  },
  {
    question: "Which internship tracks can I choose?",
    answer: `You can choose from ${TRACKS.length} tracks: ${TRACKS.map((t) => t.title).join(", ")}.`,
  },
  {
    question: "Can I do the internship online?",
    answer: "Yes. You can join an online batch or an offline classroom batch at our office in Patna. You choose your preferred mode in the registration form.",
  },
  {
    question: "Who can apply?",
    answer: "College and university students who are currently pursuing a course such as BCA, BBA or B.Tech can apply, from any academic year or batch.",
  },
  {
    question: "What certificates will I receive?",
    answer: "You receive a Training Certificate and an Internship Certificate from Fillip Technologies Pvt. Ltd., along with a performance transcript, subject to completing the programme requirements.",
  },
  {
    question: "Is attendance mandatory?",
    answer: "Yes. A minimum of 75% attendance in the online or classroom programme is required to be eligible for any certificate.",
  },
  {
    question: "What is Engineers Clinic?",
    answer: "Engineers Clinic (engineersclinic.com) is the learning platform used for the training. You receive your login details once your registration and payment are confirmed.",
  },
  {
    question: "How long is the programme and when are classes held?",
    answer: "The programme schedule and batch timings are shared by Fillip Technologies after registration, along with your class routine.",
  },
  {
    question: "What happens after I register?",
    answer: "Our team verifies your payment, allots you to an online or classroom batch, and shares your class routine, payment receipt and Engineers Clinic login details.",
  },
  {
    question: "Does the internship guarantee a job?",
    answer: "No. Internship participation does not guarantee job placement or employment. It is designed to help you build practical skills and work you can show.",
  },
  {
    question: "What is the refund policy?",
    answer: "Withdrawal and refund requests are handled as per the refund policy communicated by Fillip Technologies at the time of registration.",
  },
] as const;

export const TERMS = [
  "This is a paid programme. Fees cover the training, access to the Engineers Clinic learning platform and the internship.",
  "Registration is subject to submission of the form and verification of the registration payment.",
  "A minimum of 75% attendance (online or classroom) is mandatory to be eligible for any certificate.",
  "The Training Certificate, Internship Certificate and performance transcript are issued subject to successful completion of programme requirements.",
  "The programme schedule and batch timings will be communicated by Fillip Technologies.",
  "Students must attend sessions regularly and take part in assigned learning activities.",
  "Students must maintain professional conduct and keep confidential company information and learning materials private.",
  "Internship participation does not guarantee job placement or employment.",
  "Withdrawal and refund requests will be handled as per the refund policy communicated by Fillip Technologies at registration.",
  "All terms and conditions are subject to applicable law.",
] as const;

export const ACADEMIC_BATCHES = ["2023–2026", "2024–2027", "2025–2028", "2026–2029", "2027–2030", "Other"] as const;
export const GENDERS = ["Female", "Male", "Prefer not to say", "Other"] as const;
export const MODES = ["Online", "Offline (Classroom)"] as const;

export const OFFICE = {
  name: "Fillip Technologies",
  address:
    "Ground Floor, A3, Kankarbagh Main Road, beside Kalyan Jewellers, near Chandan Hero, Patna, Bihar – 800020",
  website: "www.filliptechnologies.com",
} as const;
