import type { Character } from "./types";
import { inSchool } from "./education";

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number; // index into options
}

export type QuizCategory =
  "elementary" | "middle" | "high" | "college" | "sat" | "act" | "lsat" | "gmat" | "mcat" | "bar";

const BANK: Record<QuizCategory, QuizQuestion[]> = {
  elementary: [
    { q: "What is 7 + 8?", options: ["13", "14", "15", "16"], answer: 2 },
    { q: "What is 6 x 4?", options: ["18", "24", "28", "30"], answer: 1 },
    { q: "Which word is a noun?", options: ["Run", "Happy", "Dog", "Quickly"], answer: 2 },
    { q: "How many continents are there?", options: ["5", "6", "7", "8"], answer: 2 },
    { q: "What planet do we live on?", options: ["Mars", "Earth", "Venus", "Jupiter"], answer: 1 },
    { q: "What is 20 - 9?", options: ["9", "10", "11", "12"], answer: 2 },
    { q: "Which is a mammal?", options: ["Shark", "Frog", "Whale", "Eagle"], answer: 2 },
    {
      q: "Blue and yellow mixed make?",
      options: ["Purple", "Green", "Orange", "Brown"],
      answer: 1,
    },
  ],
  middle: [
    { q: "Solve: 3x = 21. x = ?", options: ["6", "7", "8", "9"], answer: 1 },
    {
      q: "The powerhouse of the cell is the?",
      options: ["Nucleus", "Ribosome", "Mitochondria", "Membrane"],
      answer: 2,
    },
    {
      q: "Who was the first U.S. President?",
      options: ["Lincoln", "Jefferson", "Washington", "Adams"],
      answer: 2,
    },
    { q: "What is a synonym of 'rapid'?", options: ["Slow", "Quiet", "Fast", "Heavy"], answer: 2 },
    { q: "What is 12 squared?", options: ["124", "132", "144", "154"], answer: 2 },
    {
      q: "Water is made of hydrogen and?",
      options: ["Nitrogen", "Oxygen", "Carbon", "Helium"],
      answer: 1,
    },
    { q: "Which is a prime number?", options: ["9", "15", "17", "21"], answer: 2 },
    { q: "A triangle's angles add up to?", options: ["90", "180", "270", "360"], answer: 1 },
  ],
  high: [
    {
      q: "In a democracy, ultimate power rests with the?",
      options: ["Military", "People", "Courts", "President"],
      answer: 1,
    },
    {
      q: "Supply rises and demand falls. Price will?",
      options: ["Rise", "Fall", "Stay flat", "Double"],
      answer: 1,
    },
    {
      q: "Area of a circle is?",
      options: ["2 pi r", "pi r squared", "pi d", "r squared"],
      answer: 1,
    },
    {
      q: "Who wrote 'Romeo and Juliet'?",
      options: ["Dickens", "Shakespeare", "Twain", "Poe"],
      answer: 1,
    },
    { q: "The chemical symbol for gold is?", options: ["Go", "Gd", "Au", "Ag"], answer: 2 },
    {
      q: "A recession is defined by falling?",
      options: ["Inflation", "GDP", "Interest", "Taxes"],
      answer: 1,
    },
    { q: "Solve: x squared = 49. x = ?", options: ["6", "7", "8", "9"], answer: 1 },
    {
      q: "U.S. branches: legislative, judicial, and?",
      options: ["Federal", "Military", "Executive", "State"],
      answer: 2,
    },
  ],
  college: [
    {
      q: "A valid argument with true premises is?",
      options: ["Invalid", "Sound", "Biased", "Circular"],
      answer: 1,
    },
    {
      q: "Compound interest beats simple interest because it?",
      options: ["Ignores time", "Earns on interest", "Lowers principal", "Is untaxed"],
      answer: 1,
    },
    {
      q: "A thesis statement should be?",
      options: ["Vague", "A question", "Arguable", "A quote"],
      answer: 2,
    },
    {
      q: "Correlation does not imply?",
      options: ["Data", "Causation", "Sampling", "Variance"],
      answer: 1,
    },
    {
      q: "Opportunity cost is the value of the?",
      options: ["Cheapest option", "Next best alternative", "Total budget", "Sunk cost"],
      answer: 1,
    },
    {
      q: "A hypothesis must be?",
      options: ["Proven", "Testable", "Popular", "Complex"],
      answer: 1,
    },
    {
      q: "Which strengthens an argument?",
      options: ["Repetition", "A relevant statistic", "Longer sentences", "Bold text"],
      answer: 1,
    },
    {
      q: "Diversification reduces which risk?",
      options: ["Market", "Unsystematic", "Inflation", "Currency"],
      answer: 1,
    },
  ],
  sat: [
    { q: "If 2x + 5 = 17, x = ?", options: ["5", "6", "7", "8"], answer: 1 },
    {
      q: "Best synonym for 'meticulous':",
      options: ["Careless", "Careful", "Loud", "Brief"],
      answer: 1,
    },
    { q: "15% of 200 is?", options: ["25", "30", "35", "40"], answer: 1 },
    {
      q: "Which is grammatically correct?",
      options: ["Their going home", "There going home", "They're going home", "Theyre going home"],
      answer: 2,
    },
    {
      q: "A passage's main idea is its?",
      options: ["Tone", "Central claim", "Diction", "Rhyme"],
      answer: 1,
    },
    {
      q: "A shirt costs $40 after 20% off. Original price?",
      options: ["$48", "$50", "$52", "$60"],
      answer: 1,
    },
    { q: "Antonym of 'expand':", options: ["Grow", "Widen", "Contract", "Extend"], answer: 2 },
    { q: "Slope of y = 3x - 2 is?", options: ["-2", "2", "3", "1"], answer: 2 },
  ],
  act: [
    {
      q: "A car goes 150 miles in 3 hours. Speed?",
      options: ["40 mph", "45 mph", "50 mph", "55 mph"],
      answer: 2,
    },
    {
      q: "Best transition to add contrast:",
      options: ["Therefore", "However", "Moreover", "Thus"],
      answer: 1,
    },
    {
      q: "A control group is used to?",
      options: ["Add variables", "Compare results", "Speed testing", "Reduce cost"],
      answer: 1,
    },
    {
      q: "Which is punctuated correctly?",
      options: ["Its cold out.", "It's cold out.", "Its' cold out.", "It cold's out."],
      answer: 1,
    },
    {
      q: "A line rising left to right shows a trend that is?",
      options: ["Negative", "Flat", "Positive", "None"],
      answer: 2,
    },
    { q: "Square root of 81 = ?", options: ["7", "8", "9", "11"], answer: 2 },
    {
      q: "A reliable experiment must be?",
      options: ["Expensive", "Repeatable", "Long", "Secret"],
      answer: 1,
    },
    {
      q: "Concise revision of 'due to the fact that':",
      options: ["because", "since due", "owing that", "as of"],
      answer: 0,
    },
  ],
  lsat: [
    {
      q: "All roses are flowers. This tulip is a flower. So it's a rose. This is?",
      options: ["Valid", "A fallacy", "Sound", "Certain"],
      answer: 1,
    },
    {
      q: "If it rains, the game is cancelled. It was NOT cancelled. So?",
      options: ["It rained", "It did not rain", "Unknown", "It snowed"],
      answer: 1,
    },
    {
      q: "Which weakens 'Coffee causes productivity'?",
      options: [
        "Coffee tastes good",
        "Productive people drink it for other reasons",
        "Coffee is popular",
        "Coffee is warm",
      ],
      answer: 1,
    },
    {
      q: "A necessary condition for X is one X?",
      options: ["Guarantees", "Cannot occur without", "Prevents", "Follows"],
      answer: 1,
    },
    {
      q: "Only members may vote. Sam voted. So Sam?",
      options: ["Is not a member", "Is a member", "Might be a member", "Is an officer"],
      answer: 1,
    },
    {
      q: "Assumption in 'Ban ads; they lower sales'?",
      options: ["Ads are cheap", "Lower sales are undesirable", "Sales are high", "Ads are common"],
      answer: 1,
    },
    { q: "Sequence: 2, 4, 8, 16, ?", options: ["24", "30", "32", "20"], answer: 2 },
    {
      q: "If some A are B, it must be true that?",
      options: ["All A are B", "Some B are A", "No A are B", "All B are A"],
      answer: 1,
    },
  ],
  gmat: [
    {
      q: "Revenue $500k, costs $350k. Profit margin?",
      options: ["20%", "30%", "35%", "40%"],
      answer: 1,
    },
    { q: "If x/4 = 9, x = ?", options: ["27", "32", "36", "40"], answer: 2 },
    {
      q: "Which strengthens 'raise prices to boost profit'?",
      options: [
        "Demand is inelastic",
        "Competitors are cheaper",
        "Costs rose",
        "Customers are price-sensitive",
      ],
      answer: 0,
    },
    {
      q: "Sales doubling yearly is growth that is?",
      options: ["Linear", "Exponential", "Flat", "Negative"],
      answer: 1,
    },
    { q: "20 is what percent of 80?", options: ["20%", "25%", "30%", "40%"], answer: 1 },
    {
      q: "To find a square's area you need?",
      options: ["Its color", "One side length", "Two sides", "The diagonal only"],
      answer: 1,
    },
    {
      q: "Rising costs with flat revenue means profit?",
      options: ["Rises", "Falls", "Flat", "Doubles"],
      answer: 1,
    },
    { q: "Average of 10, 20, 30 is?", options: ["15", "20", "25", "30"], answer: 1 },
  ],
  mcat: [
    {
      q: "DNA is composed of units called?",
      options: ["Amino acids", "Nucleotides", "Lipids", "Sugars"],
      answer: 1,
    },
    { q: "The pH of a neutral solution is?", options: ["0", "7", "10", "14"], answer: 1 },
    {
      q: "Which organ produces insulin?",
      options: ["Liver", "Kidney", "Pancreas", "Spleen"],
      answer: 2,
    },
    {
      q: "Enzymes are primarily made of?",
      options: ["Carbohydrates", "Proteins", "Fats", "Minerals"],
      answer: 1,
    },
    {
      q: "An acid donates?",
      options: ["Electrons", "Protons (H+)", "Neutrons", "Oxygen"],
      answer: 1,
    },
    {
      q: "The variable a scientist changes is the?",
      options: ["Dependent variable", "Independent variable", "Control", "Constant"],
      answer: 1,
    },
    {
      q: "Red blood cells carry oxygen using?",
      options: ["Insulin", "Hemoglobin", "Collagen", "Keratin"],
      answer: 1,
    },
    {
      q: "Cellular respiration mainly produces?",
      options: ["DNA", "ATP", "Glucose", "Oxygen"],
      answer: 1,
    },
  ],
  bar: [
    {
      q: "A contract requires offer, acceptance, and?",
      options: ["Notary", "Consideration", "Witnesses", "Payment"],
      answer: 1,
    },
    {
      q: "Burden of proof in a criminal case is?",
      options: ["Preponderance", "Beyond reasonable doubt", "Probable cause", "Clear intent"],
      answer: 1,
    },
    {
      q: "Which amendment protects against self-incrimination?",
      options: ["First", "Fourth", "Fifth", "Tenth"],
      answer: 2,
    },
    {
      q: "Confidentiality is owed to the?",
      options: ["Court", "Client", "Public", "Opposing counsel"],
      answer: 1,
    },
    {
      q: "Judicial review was established in?",
      options: ["Roe v. Wade", "Marbury v. Madison", "Brown v. Board", "Miranda v. Arizona"],
      answer: 1,
    },
    {
      q: "A tort is a?",
      options: ["Criminal charge", "Civil wrong", "Contract term", "Tax form"],
      answer: 1,
    },
    {
      q: "A lawyer must avoid a conflict of?",
      options: ["Schedule", "Interest", "Opinion", "Venue"],
      answer: 1,
    },
    {
      q: "Due process is in the 5th and which amendment?",
      options: ["10th", "14th", "2nd", "8th"],
      answer: 1,
    },
  ],
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Build a randomized quiz of `count` questions from a category. */
export function buildQuiz(category: QuizCategory, count: number): QuizQuestion[] {
  return shuffle(BANK[category]).slice(0, Math.min(count, BANK[category].length));
}

/** The assignment category appropriate for the player's current stage. */
export function assignmentCategory(c: Character): QuizCategory {
  if (!inSchool(c)) return "high";
  if (c.education === "college") return "college";
  if (c.education === "high") return "high";
  if (c.education === "middle") return "middle";
  return "elementary";
}
