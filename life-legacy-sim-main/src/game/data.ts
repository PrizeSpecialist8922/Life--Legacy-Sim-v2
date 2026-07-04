import type { Character, WealthTier } from "./types";

export const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "Brazil",
  "Nigeria",
  "India",
];

export const CITIES = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Austin",
  "Seattle",
  "Boston",
  "Denver",
  "Miami",
  "Atlanta",
  "Portland",
];

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const OCCUPATIONS: Record<WealthTier, string[]> = {
  poor: ["Unemployed", "Dishwasher", "Cashier", "Warehouse Worker", "Day Laborer"],
  working: ["Truck Driver", "Mechanic", "Nurse Aide", "Electrician", "Retail Supervisor"],
  middle: ["Teacher", "Accountant", "Software Developer", "Registered Nurse", "Sales Manager"],
  affluent: ["Physician", "Attorney", "Engineering Director", "Finance VP", "Business Owner"],
  wealthy: [
    "Surgeon",
    "Corporate Executive",
    "Investment Banker",
    "Real Estate Mogul",
    "Tech Founder",
  ],
};

export const CLUBS = [
  "Debate Team",
  "Chess Club",
  "Robotics",
  "Drama Club",
  "Student Council",
  "Science Olympiad",
  "Band",
  "Art Club",
  "Coding Club",
  "Model UN",
];

export const SPORTS = [
  "Soccer",
  "Basketball",
  "Track & Field",
  "Swimming",
  "Tennis",
  "Baseball",
  "Volleyball",
  "Football",
  "Wrestling",
  "Cross Country",
];

export const MALE_NAMES = [
  "James",
  "Liam",
  "Noah",
  "Ethan",
  "Marcus",
  "Julian",
  "Theo",
  "Andre",
  "Kai",
  "Leo",
  "Dominic",
  "Elias",
  "Ravi",
  "Chen",
  "Mateo",
  "Oscar",
];
export const FEMALE_NAMES = [
  "Ava",
  "Sofia",
  "Maya",
  "Isabel",
  "Nora",
  "Zoe",
  "Elena",
  "Aria",
  "Priya",
  "Ling",
  "Amara",
  "Camila",
  "Hana",
  "Freya",
  "Naomi",
  "Ivy",
];
export const LAST_NAMES = [
  "Reyes",
  "Carter",
  "Nguyen",
  "Kim",
  "Patel",
  "Okafor",
  "Rossi",
  "Novak",
  "Silva",
  "Bauer",
  "Ahmed",
  "Ford",
  "Vance",
  "Sterling",
  "Cross",
  "Hale",
];

export interface UniversityDef {
  name: string;
  prestige: number; // required smarts/gpa gate
  cost: number;
}

export const UNIVERSITIES: UniversityDef[] = [
  { name: "Harvard University", prestige: 95, cost: 62000 },
  { name: "Stanford University", prestige: 94, cost: 60000 },
  { name: "MIT", prestige: 93, cost: 59000 },
  { name: "Princeton University", prestige: 92, cost: 58000 },
  { name: "Columbia University", prestige: 88, cost: 55000 },
  { name: "Duke University", prestige: 85, cost: 52000 },
  { name: "University of Michigan", prestige: 78, cost: 34000 },
  { name: "UCLA", prestige: 76, cost: 30000 },
  { name: "State University", prestige: 55, cost: 18000 },
  { name: "City Community College", prestige: 30, cost: 6000 },
];

export const MAJORS = [
  "Finance",
  "Economics",
  "Computer Science",
  "Political Science",
  "Biology",
  "Chemistry",
  "Engineering",
  "Psychology",
  "Business",
  "Accounting",
  "Marketing",
  "Mathematics",
  "English",
];

export interface JobDef {
  id: string;
  title: string;
  company: string;
  field: string;
  baseSalary: number;
  requiresDegree: boolean;
  minSmarts: number;
  minAge: number;
  ladder: string[]; // promotion titles
}

export const JOBS: JobDef[] = [
  {
    id: "retail",
    title: "Retail Associate",
    company: "MegaMart",
    field: "Retail",
    baseSalary: 26000,
    requiresDegree: false,
    minSmarts: 0,
    minAge: 16,
    ladder: ["Retail Associate", "Shift Lead", "Store Manager", "Regional Manager"],
  },
  {
    id: "barista",
    title: "Barista",
    company: "Brew & Co.",
    field: "Hospitality",
    baseSalary: 24000,
    requiresDegree: false,
    minSmarts: 0,
    minAge: 16,
    ladder: ["Barista", "Head Barista", "Café Manager", "Franchise Owner"],
  },
  {
    id: "swe",
    title: "Junior Software Engineer",
    company: "Nexus Labs",
    field: "Technology",
    baseSalary: 95000,
    requiresDegree: true,
    minSmarts: 65,
    minAge: 21,
    ladder: [
      "Junior Software Engineer",
      "Software Engineer",
      "Senior Engineer",
      "Staff Engineer",
      "VP of Engineering",
    ],
  },
  {
    id: "analyst",
    title: "Investment Banking Analyst",
    company: "Goldman Sterling",
    field: "Finance",
    baseSalary: 110000,
    requiresDegree: true,
    minSmarts: 72,
    minAge: 21,
    ladder: ["IB Analyst", "Associate", "Vice President", "Managing Director", "Partner"],
  },
  {
    id: "consultant",
    title: "Business Analyst",
    company: "McKinley & Co.",
    field: "Consulting",
    baseSalary: 100000,
    requiresDegree: true,
    minSmarts: 70,
    minAge: 21,
    ladder: ["Business Analyst", "Consultant", "Engagement Manager", "Partner"],
  },
  {
    id: "nurse",
    title: "Registered Nurse",
    company: "St. Grace Hospital",
    field: "Healthcare",
    baseSalary: 68000,
    requiresDegree: true,
    minSmarts: 55,
    minAge: 21,
    ladder: ["Registered Nurse", "Charge Nurse", "Nurse Manager", "Director of Nursing"],
  },
  {
    id: "teacher",
    title: "Teacher",
    company: "Public School District",
    field: "Education",
    baseSalary: 48000,
    requiresDegree: true,
    minSmarts: 45,
    minAge: 21,
    ladder: ["Teacher", "Department Head", "Vice Principal", "Principal"],
  },
  {
    id: "marketer",
    title: "Marketing Coordinator",
    company: "Bright Media",
    field: "Marketing",
    baseSalary: 52000,
    requiresDegree: true,
    minSmarts: 40,
    minAge: 21,
    ladder: ["Marketing Coordinator", "Marketing Manager", "Director", "CMO"],
  },
];

export function eligibleJobs(c: Character): JobDef[] {
  const hasDegree = c.education === "graduated";
  return JOBS.filter(
    (j) => c.age >= j.minAge && c.stats.smarts >= j.minSmarts && (!j.requiresDegree || hasDegree),
  );
}
