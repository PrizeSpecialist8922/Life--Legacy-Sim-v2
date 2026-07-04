import type { GameEvent } from "./types";
import { clamp } from "./util";
import { chargeExpense } from "./economy";

export const EVENTS: GameEvent[] = [
  {
    id: "found_money",
    title: "Lucky Find",
    description: "You found a wallet stuffed with cash on the sidewalk. Nobody is around.",
    minAge: 8,
    maxAge: 90,
    weight: 3,
    choices: [
      {
        label: "Keep the cash",
        apply: (c) => {
          c.money += 400;
          c.stats.happiness = clamp(c.stats.happiness + 6);
          return { text: "You pocketed $400. Guilt? Never heard of her.", tone: "good" };
        },
      },
      {
        label: "Turn it in",
        apply: (c) => {
          c.stats.happiness = clamp(c.stats.happiness + 10);
          return { text: "The owner rewarded your honesty. You feel great.", tone: "good" };
        },
      },
    ],
  },
  {
    id: "bully",
    title: "The Schoolyard Bully",
    description: "A bully is picking on a smaller kid during recess.",
    minAge: 7,
    maxAge: 15,
    weight: 3,
    choices: [
      {
        label: "Stand up to them",
        apply: (c) => {
          const win = Math.random() > 0.4;
          if (win) {
            c.stats.happiness = clamp(c.stats.happiness + 8);
            c.stats.looks = clamp(c.stats.looks + 2);
            return { text: "You backed the bully down. You're a legend now.", tone: "good" };
          }
          c.stats.health = clamp(c.stats.health - 8);
          return { text: "It ended in a scuffle. You got a black eye.", tone: "bad" };
        },
      },
      {
        label: "Walk away",
        apply: (c) => {
          c.stats.happiness = clamp(c.stats.happiness - 4);
          return { text: "You avoided trouble, but felt uneasy.", tone: "neutral" };
        },
      },
    ],
  },
  {
    id: "party_invite",
    title: "House Party",
    description: "You're invited to the biggest party of the year the night before a big exam.",
    minAge: 15,
    maxAge: 24,
    weight: 3,
    choices: [
      {
        label: "Go party",
        apply: (c) => {
          c.stats.happiness = clamp(c.stats.happiness + 12);
          c.stats.smarts = clamp(c.stats.smarts - 4);
          return { text: "Unforgettable night. The exam? Less so.", tone: "neutral" };
        },
      },
      {
        label: "Study instead",
        apply: (c) => {
          c.stats.smarts = clamp(c.stats.smarts + 6);
          c.stats.happiness = clamp(c.stats.happiness - 5);
          return { text: "You aced the exam and felt slightly like a hermit.", tone: "good" };
        },
      },
    ],
  },
  {
    id: "stock_tip",
    title: "Hot Stock Tip",
    description: "A friend swears a tiny company is about to explode. Want in?",
    minAge: 20,
    maxAge: 90,
    weight: 2,
    condition: (c) => c.money > 2000,
    choices: [
      {
        label: "Invest $2,000",
        apply: (c) => {
          c.money -= 2000;
          const win = Math.random() > 0.5;
          if (win) {
            const gain = 2000 + Math.floor(Math.random() * 8000);
            c.money += 2000 + gain;
            return { text: `The stock soared! You made $${gain.toLocaleString()}.`, tone: "good" };
          }
          return { text: "The company tanked. Your $2,000 is gone.", tone: "bad" };
        },
      },
      {
        label: "Pass",
        apply: () => ({ text: "You kept your money safe.", tone: "neutral" }),
      },
    ],
  },
  {
    id: "promotion_offer",
    title: "Extra Responsibility",
    description: "Your boss offers you a demanding project that could fast-track your career.",
    minAge: 22,
    maxAge: 65,
    weight: 3,
    condition: (c) => !!c.job,
    choices: [
      {
        label: "Take it on",
        apply: (c) => {
          if (c.job) c.job.performance = clamp(c.job.performance + 15);
          c.stats.happiness = clamp(c.stats.happiness - 6);
          c.stats.health = clamp(c.stats.health - 4);
          return { text: "You impressed leadership, but you're exhausted.", tone: "good" };
        },
      },
      {
        label: "Decline politely",
        apply: (c) => {
          if (c.job) c.job.performance = clamp(c.job.performance - 5);
          return { text: "You protected your evenings, but got overlooked.", tone: "neutral" };
        },
      },
    ],
  },
  {
    id: "illness",
    title: "Feeling Unwell",
    description: "You've been coughing for weeks and feeling drained.",
    minAge: 5,
    maxAge: 95,
    weight: 2,
    choices: [
      {
        label: "See a doctor ($300)",
        apply: (c) => {
          const res = chargeExpense(c, 300, { label: "medical bill" });
          c.stats.health = clamp(c.stats.health + 12);
          return {
            text: `${res.message} The doctor sorted you out — back to full strength.`,
            tone: res.paidBy === "family-debt" ? "neutral" : "good",
          };
        },
      },
      {
        label: "Tough it out",
        apply: (c) => {
          const bad = Math.random() > 0.5;
          c.stats.health = clamp(c.stats.health - (bad ? 15 : 4));
          return {
            text: bad
              ? "It got worse. You should have gone in."
              : "You slowly recovered on your own.",
            tone: bad ? "bad" : "neutral",
          };
        },
      },
    ],
  },
  {
    id: "crush",
    title: "Someone Caught Your Eye",
    description: "There's someone you can't stop thinking about. Make a move?",
    minAge: 16,
    maxAge: 70,
    weight: 3,
    condition: (c) => !c.relationships.some((r) => r.type === "partner" && r.alive),
    choices: [
      {
        label: "Ask them out",
        apply: (c) => {
          const yes = Math.random() < (c.stats.looks + c.stats.happiness) / 220 + 0.25;
          if (yes) {
            c.stats.happiness = clamp(c.stats.happiness + 15);
            return { text: "They said yes! A new relationship begins.", tone: "milestone" };
          }
          c.stats.happiness = clamp(c.stats.happiness - 8);
          return { text: "They turned you down. Ouch.", tone: "bad" };
        },
      },
      {
        label: "Keep it to yourself",
        apply: (c) => {
          c.stats.happiness = clamp(c.stats.happiness - 3);
          return { text: "The moment passed.", tone: "neutral" };
        },
      },
    ],
  },
  {
    id: "inheritance",
    title: "A Letter from a Lawyer",
    description: "A distant relative has passed and left you something in their will.",
    minAge: 25,
    maxAge: 90,
    weight: 1,
    choices: [
      {
        label: "Open the letter",
        apply: (c) => {
          const amount = 5000 + Math.floor(Math.random() * 45000);
          c.money += amount;
          return { text: `You inherited $${amount.toLocaleString()}!`, tone: "good" };
        },
      },
    ],
  },
  {
    id: "gym_dare",
    title: "Fitness Challenge",
    description: "A friend dares you to commit to a brutal 6-month training plan.",
    minAge: 16,
    maxAge: 60,
    weight: 2,
    choices: [
      {
        label: "Accept the challenge",
        apply: (c) => {
          c.stats.health = clamp(c.stats.health + 12);
          c.stats.looks = clamp(c.stats.looks + 8);
          c.stats.happiness = clamp(c.stats.happiness - 3);
          return { text: "You're in the best shape of your life.", tone: "good" };
        },
      },
      {
        label: "Nah, order pizza",
        apply: (c) => {
          c.stats.happiness = clamp(c.stats.happiness + 4);
          c.stats.health = clamp(c.stats.health - 3);
          return { text: "Pizza won. It was delicious.", tone: "neutral" };
        },
      },
    ],
  },
  {
    id: "shoplift",
    title: "Five-Finger Discount?",
    description: "You're broke and staring at something you really want in a store.",
    minAge: 13,
    maxAge: 40,
    weight: 1,
    choices: [
      {
        label: "Steal it",
        apply: (c) => {
          const caught = Math.random() > 0.6;
          if (caught) {
            c.criminalRecord += 1;
            c.stats.happiness = clamp(c.stats.happiness - 12);
            c.money -= 250;
            return { text: "You got caught and fined $250. Criminal record started.", tone: "bad" };
          }
          c.stats.happiness = clamp(c.stats.happiness + 4);
          return { text: "You got away with it this time.", tone: "neutral" };
        },
      },
      {
        label: "Walk out empty-handed",
        apply: () => ({ text: "You did the right thing.", tone: "neutral" }),
      },
    ],
  },
];
