import { useState } from "react";
import {
  Activity,
  Briefcase,
  Dumbbell,
  GraduationCap,
  HeartPulse,
  Smartphone,
  SmilePlus,
  Trophy,
  DoorOpen,
  Users,
  BookOpen,
} from "lucide-react";
import type { JobDef } from "../../game/data";
import { ACTIONS_PER_YEAR, eligibleJobDefs } from "../../game/engine";
import { inSchool } from "../../game/education";
import type { AidLetter, Character } from "../../game/types";
import { formatMoney } from "../../game/util";
import { CollegeAdmissions } from "./CollegeAdmissions";

type Tab = "activities" | "career" | "education" | "people";

interface ActivityDef {
  id: string;
  label: string;
  icon: typeof Activity;
  hint: string;
  minAge: number;
  maxAge?: number;
  schoolOnly?: boolean;
}

const ACTIVITIES: ActivityDef[] = [
  { id: "read", label: "Read", icon: BookOpen, hint: "+Smarts", minAge: 3 },
  { id: "study", label: "Study", icon: GraduationCap, hint: "+Smarts +GPA", minAge: 5 },
  { id: "sports", label: "Play Sports", icon: Trophy, hint: "+Health +Fitness", minAge: 5 },
  { id: "friends", label: "Make Friends", icon: SmilePlus, hint: "+Happiness", minAge: 5 },
  {
    id: "skipclass",
    label: "Skip Class",
    icon: DoorOpen,
    hint: "+Fun −GPA",
    minAge: 6,
    schoolOnly: true,
  },
  { id: "meditate", label: "Meditate", icon: Activity, hint: "+Mental Health", minAge: 10 },
  { id: "gym", label: "Gym", icon: Dumbbell, hint: "+Health +Looks", minAge: 13 },
  { id: "social", label: "Socialize", icon: Users, hint: "+Happiness", minAge: 13 },
  { id: "socialmedia", label: "Social Media", icon: Smartphone, hint: "±Happiness", minAge: 13 },
  { id: "doctor", label: "Doctor", icon: HeartPulse, hint: "+Health", minAge: 0 },
];

export function ActionTabs({
  character,
  onActivity,
  onApply,
  onResign,
  onEnroll,
  onFafsa,
  onAppeal,
}: {
  character: Character;
  onActivity: (id: string) => void;
  onApply: (def: JobDef) => void;
  onResign: () => void;
  onEnroll: (letter: AidLetter) => void;
  onFafsa: () => void;
  onAppeal: () => void;
}) {
  const [tab, setTab] = useState<Tab>("activities");
  const energyLeft = ACTIONS_PER_YEAR - character.yearActionsUsed;

  const tabs: { id: Tab; label: string; icon: typeof Activity }[] = [
    { id: "activities", label: "Activities", icon: Activity },
    { id: "career", label: "Career", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "people", label: "People", icon: Users },
  ];

  return (
    <div className="glass rounded-2xl p-4">
      <div className="no-scrollbar mb-4 flex gap-1 overflow-x-auto rounded-xl bg-white/5 p-1">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition ${
                tab === t.id
                  ? "bg-primary/20 text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-3.5 w-3.5" /> {t.label}
            </button>
          );
        })}
      </div>

      {tab === "activities" && (
        <div>
          <p className="mb-3 text-xs text-muted-foreground">
            Energy this year: <span className="font-bold text-primary">{energyLeft}</span> /{" "}
            {ACTIONS_PER_YEAR}
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {ACTIVITIES.filter(
              (a) =>
                character.age >= a.minAge &&
                (a.maxAge === undefined || character.age <= a.maxAge) &&
                (!a.schoolOnly || inSchool(character)),
            ).map((a) => {
              const Icon = a.icon;
              const disabled = energyLeft <= 0;
              return (
                <button
                  key={a.id}
                  disabled={disabled}
                  onClick={() => onActivity(a.id)}
                  className="flex flex-col items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-center transition hover:border-primary/50 hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="text-xs font-semibold">{a.label}</span>
                  <span className="text-[10px] text-muted-foreground">{a.hint}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {tab === "career" && (
        <CareerTab
          character={character}
          onApply={onApply}
          onResign={onResign}
          energyLeft={energyLeft}
        />
      )}
      {tab === "education" && (
        <EducationTab
          character={character}
          onEnroll={onEnroll}
          onFafsa={onFafsa}
          onAppeal={onAppeal}
        />
      )}
      {tab === "people" && <PeopleTab character={character} />}
    </div>
  );
}

function CareerTab({
  character,
  onApply,
  onResign,
  energyLeft,
}: {
  character: Character;
  onApply: (def: JobDef) => void;
  onResign: () => void;
  energyLeft: number;
}) {
  const jobs = eligibleJobDefs(character);
  if (character.age < 16) {
    return (
      <p className="text-sm text-muted-foreground">
        You're too young to work. Focus on school for now.
      </p>
    );
  }
  return (
    <div className="space-y-3">
      {character.job && (
        <div className="rounded-xl border border-primary/30 bg-primary/10 p-3">
          <p className="text-xs text-muted-foreground">Current job</p>
          <p className="font-semibold">{character.job.title}</p>
          <p className="text-xs text-muted-foreground">{character.job.company}</p>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span>Salary {formatMoney(character.job.salary)}/yr</span>
            <span>Performance {character.job.performance}%</span>
          </div>
          <button
            onClick={onResign}
            className="mt-3 w-full rounded-lg border border-white/10 bg-white/5 py-2 text-xs font-medium text-muted-foreground transition hover:text-foreground"
          >
            Quit job
          </button>
        </div>
      )}
      <p className="text-xs text-muted-foreground">
        Job market {energyLeft <= 0 ? "(no energy left this year)" : ""}
      </p>
      <div className="space-y-2">
        {jobs.map((j) => (
          <button
            key={j.id}
            disabled={energyLeft <= 0}
            onClick={() => onApply(j)}
            className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-left transition hover:border-primary/50 hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <div>
              <p className="text-sm font-semibold">{j.title}</p>
              <p className="text-xs text-muted-foreground">
                {j.company} · {j.field}
              </p>
            </div>
            <span className="text-xs font-bold text-primary">{formatMoney(j.baseSalary)}</span>
          </button>
        ))}
        {jobs.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No jobs match your qualifications yet. Get smarter or earn a degree.
          </p>
        )}
      </div>
    </div>
  );
}

function EducationTab({
  character,
  onEnroll,
  onFafsa,
  onAppeal,
}: {
  character: Character;
  onEnroll: (letter: AidLetter) => void;
  onFafsa: () => void;
  onAppeal: () => void;
}) {
  if (character.education === "graduated") {
    return (
      <p className="text-sm text-muted-foreground">
        You graduated from {character.university} with a degree in {character.major}. 🎓
      </p>
    );
  }
  if (character.education === "college") {
    return (
      <p className="text-sm text-muted-foreground">
        You're studying {character.major} at {character.university}. Keep aging up to graduate.
        Manage work-study, budget and loans in the Education tab.
      </p>
    );
  }
  if (character.age < 18) {
    return (
      <p className="text-sm text-muted-foreground">
        You're currently in school. Study to raise your smarts and GPA — it determines which
        colleges will accept you at 18.
      </p>
    );
  }

  return (
    <CollegeAdmissions
      character={character}
      onEnroll={onEnroll}
      onFafsa={onFafsa}
      onAppeal={onAppeal}
    />
  );
}

function PeopleTab({ character }: { character: Character }) {
  return (
    <div className="space-y-2">
      {character.relationships.map((r) => (
        <div
          key={r.id}
          className={`flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 ${
            r.alive ? "" : "opacity-50"
          }`}
        >
          <div>
            <p className="text-sm font-semibold">
              {r.name}{" "}
              {!r.alive && <span className="text-xs text-muted-foreground">(deceased)</span>}
            </p>
            <p className="text-xs capitalize text-muted-foreground">
              {r.type} · age {r.age}
            </p>
          </div>
          <div className="w-24">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full"
                style={{ width: `${r.relationship}%`, backgroundColor: "var(--success)" }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
