export type Gender = "male" | "female";

export type Stat = "happiness" | "health" | "smarts" | "looks";

export interface Stats {
  happiness: number;
  health: number;
  smarts: number;
  looks: number;
}

export type AcademicPathway = "regular" | "honors" | "ib";

export type CourseLevel = "HL" | "SL";

export interface SelectedCourse {
  id: string;
  name: string;
  group: string; // subject group / program label
  level?: CourseLevel; // HL/SL for IB courses; undefined for fixed loads
}

export type EducationStage = "none" | "elementary" | "middle" | "high" | "college" | "graduated";

export type WealthTier = "poor" | "working" | "middle" | "affluent" | "wealthy";

export interface Family {
  tier: WealthTier;
  income: number; // household annual income
  netWorth: number;
  savings: number;
  debt: number;
  creditScore: number;
  ownsHome: boolean;
  investments: number;
  motherOccupation: string;
  fatherOccupation: string;
  householdSize: number;
  financialPlanning: number; // 0-100 planning habits
  savingsPlanType: "529" | "savings" | "none";
  collegeSavings: number; // balance earmarked for education
  collegeSavingsUsed: number;
}

export interface TestScores {
  sat?: number; // 400-1600
  act?: number; // 1-36
  lsat?: number; // 120-180
  gmat?: number; // 200-800
  mcat?: number; // 472-528
  bar?: "passed" | "failed";
}

export interface GradeYear {
  age: number;
  stage: string;
  grade: string; // letter grade
  yearGpa: number;
  cumGpa?: number; // cumulative GPA after this year
  cumDelta?: number; // change in cumulative GPA vs previous year
}

export interface Scholarship {
  name: string;
  amount: number;
  kind?: "merit" | "athletic" | "leadership" | "debate" | "need";
  reason?: string;
  renewable?: boolean;
  minGpa?: number;
  status?: "active" | "reduced" | "revoked";
}

export type LivingArrangement = "dorm" | "apartment" | "parents" | "greek";

export interface StudentLoan {
  principal: number;
  balance: number;
  rate: number; // annual interest rate (e.g. 0.055)
  monthlyPayment: number;
  totalRepayment: number;
  termYears: number;
  repaying: boolean;
}

export interface FafsaResult {
  filed: boolean;
  householdIncome: number;
  parentAssets: number;
  householdSize: number;
  efc: number; // expected family contribution (per year)
  grantEligible: number; // annual need-based grant
  loanEligible: number; // annual federal loan cap
}

export interface CollegeBudgetYear {
  age: number;
  year: number;
  tuition: number;
  housing: number;
  books: number;
  fees: number;
  totalCost: number;
  parents: number;
  savings: number;
  scholarships: number;
  grants: number;
  workStudy: number;
  jobIncome: number;
  loans: number;
  remaining: number;
}

export interface CollegeFinance {
  university: string;
  major: string;
  living: LivingArrangement;
  prestige: number;
  yearsPlanned: number;
  yearsFunded: number;
  // Per-year figures from the accepted package
  tuition: number;
  housing: number;
  books: number;
  fees: number;
  parentContribution: number;
  parentDecision: string;
  workStudyRole?: string;
  workStudyIncome: number;
  // Cumulative totals across enrolled years
  totalScholarships: number;
  totalGrants: number;
  totalParent: number;
  totalSavings: number;
  totalWorkStudy: number;
  totalLoans: number;
  budget: CollegeBudgetYear[];
  appealed: boolean;
}

export interface AidLetter {
  university: string;
  major: string;
  prestige: number;
  living: LivingArrangement;
  tuition: number;
  housing: number;
  books: number;
  fees: number;
  totalCost: number;
  parentContribution: number;
  parentDecision: string;
  collegeSavings: number;
  scholarships: Scholarship[];
  scholarshipsTotal: number;
  grants: number;
  workStudyRole?: string;
  workStudyIncome: number;
  loans: number;
  netCost: number;
}

export interface EducationRecord {
  school: string;
  schoolPrestige?: number; // 1-100
  attendance: number; // 0-100
  homework: number; // 0-100 completion
  disciplineIncidents: number;
  studyHours: number; // accumulated this year
  skips: number; // accumulated this year
  assignmentAvg?: number; // 0-100 average score on assignments this year
  assignmentsThisYear?: number; // count done this year
  classRank: number;
  classSize: number;
  pathway?: AcademicPathway; // chosen entering Grade 11
  courses?: SelectedCourse[]; // current course load
  needsCourseSelection?: boolean; // IB pathway chosen, courses not yet picked
  clubs: string[];
  sports: string[];
  awards: string[];
  scholarships: Scholarship[];
  degrees: string[];
  history: GradeYear[];
}

export type RelationType = "mother" | "father" | "sibling" | "friend" | "partner" | "child";

export interface Relationship {
  id: string;
  name: string;
  type: RelationType;
  relationship: number; // 0-100
  age: number;
  alive: boolean;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  salary: number;
  performance: number; // 0-100
  level: number;
  field: string;
}

export interface Asset {
  id: string;
  name: string;
  kind: "property" | "vehicle" | "luxury" | "investment";
  value: number;
}

export type LogTone = "neutral" | "good" | "bad" | "milestone";

export interface LogEntry {
  age: number;
  text: string;
  tone: LogTone;
}

export interface Character {
  name: string;
  gender: Gender;
  country: string;
  city: string;
  citizenship: string;
  birthday: string;
  age: number;
  alive: boolean;
  causeOfDeath?: string;
  stats: Stats;
  mentalHealth: number;
  fitness: number;
  illnesses: string[];
  insurance: boolean;
  money: number;
  education: EducationStage;
  gpa: number; // 0-4
  major?: string;
  university?: string;
  job?: Job;
  relationships: Relationship[];
  assets: Asset[];
  family: Family;
  edu: EducationRecord;
  scores: TestScores;
  criminalRecord: number;
  fame: number;
  politicalInfluence: number;
  businessReputation: number;
  emancipated: boolean;
  independent: boolean;
  homeless: boolean;
  livingArrangement?: LivingArrangement;
  fafsa?: FafsaResult;
  studentLoans: StudentLoan[];
  collegeFinance?: CollegeFinance;
  netWorthHistory: { age: number; value: number }[];
  log: LogEntry[];
  yearActionsUsed: number;
  createdAt: number;
}

export interface GameChoice {
  label: string;
  apply: (c: Character) => { text: string; tone: LogTone } | void;
}

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  minAge: number;
  maxAge: number;
  weight: number;
  condition?: (c: Character) => boolean;
  choices: GameChoice[];
}
