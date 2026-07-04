import { useCallback, useEffect, useState } from "react";
import {
  ageUp,
  acceptWorkStudy,
  appealAid,
  applyToJob,
  chooseIBCourses,
  createCharacter,
  doActivity,
  doAssignments,
  enrollCollege,
  fileFafsa,
  joinExtracurricular,
  quitJob,
  resolveEventChoice,
  takeExam,
} from "../game/engine";
import type { IBPick } from "../game/courses";
import type { ExamKind } from "../game/engine";
import type { JobDef } from "../game/data";
import { clearSave, loadGame, saveGame } from "../game/storage";
import type { AidLetter, Character, GameEvent, Gender } from "../game/types";

export function useGame() {
  const [character, setCharacter] = useState<Character | null>(null);
  const [pendingEvent, setPendingEvent] = useState<GameEvent | null>(null);
  const [result, setResult] = useState<{ text: string; tone: string } | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = loadGame();
    if (saved) setCharacter(saved);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (character) saveGame(character);
  }, [character]);

  // Action results are shown in a popup the player dismisses, matching the
  // life-event popup style (no auto-dismissing toast).
  const flash = useCallback((text: string, tone = "neutral") => {
    setResult({ text, tone });
  }, []);

  const dismissResult = useCallback(() => setResult(null), []);

  const start = useCallback((input: { name?: string; gender?: Gender; country?: string }) => {
    const c = createCharacter(input);
    setCharacter(c);
    setPendingEvent(null);
  }, []);

  const restart = useCallback(() => {
    clearSave();
    setCharacter(null);
    setPendingEvent(null);
    setResult(null);
  }, []);

  const advance = useCallback(() => {
    setCharacter((prev) => {
      if (!prev || !prev.alive) return prev;
      const { character: next, event } = ageUp(prev);
      setPendingEvent(event);
      return next;
    });
  }, []);

  const chooseEvent = useCallback(
    (index: number) => {
      setCharacter((prev) => {
        if (!prev || !pendingEvent) return prev;
        return resolveEventChoice(prev, pendingEvent, index);
      });
      setPendingEvent(null);
    },
    [pendingEvent],
  );

  const activity = useCallback(
    (id: string) => {
      setCharacter((prev) => {
        if (!prev) return prev;
        const res = doActivity(prev, id);
        flash(res.message, res.tone);
        return res.character;
      });
    },
    [flash],
  );

  const apply = useCallback(
    (def: JobDef) => {
      setCharacter((prev) => {
        if (!prev) return prev;
        const res = applyToJob(prev, def);
        flash(res.message, res.tone);
        return res.character;
      });
    },
    [flash],
  );

  const resign = useCallback(() => {
    setCharacter((prev) => {
      if (!prev) return prev;
      const res = quitJob(prev);
      flash(res.message, res.tone);
      return res.character;
    });
  }, [flash]);

  const enroll = useCallback(
    (letter: AidLetter) => {
      setCharacter((prev) => {
        if (!prev) return prev;
        const res = enrollCollege(prev, letter);
        flash(res.message, res.tone);
        return res.character;
      });
    },
    [flash],
  );

  const fafsa = useCallback(() => {
    setCharacter((prev) => {
      if (!prev) return prev;
      const res = fileFafsa(prev);
      flash(res.message, res.tone);
      return res.character;
    });
  }, [flash]);

  const appeal = useCallback(() => {
    setCharacter((prev) => {
      if (!prev) return prev;
      const res = appealAid(prev);
      flash(res.message, res.tone);
      return res.character;
    });
  }, [flash]);

  const workStudy = useCallback(
    (role: string) => {
      setCharacter((prev) => {
        if (!prev) return prev;
        const res = acceptWorkStudy(prev, role);
        flash(res.message, res.tone);
        return res.character;
      });
    },
    [flash],
  );

  const exam = useCallback(
    (kind: ExamKind, correctRatio?: number) => {
      setCharacter((prev) => {
        if (!prev) return prev;
        const res = takeExam(prev, kind, correctRatio);
        flash(res.message, res.tone);
        return res.character;
      });
    },
    [flash],
  );

  const assignments = useCallback(
    (correctRatio: number) => {
      setCharacter((prev) => {
        if (!prev) return prev;
        const res = doAssignments(prev, correctRatio);
        flash(res.message, res.tone);
        return res.character;
      });
    },
    [flash],
  );

  const joinActivity = useCallback(
    (kind: "club" | "sport", name: string) => {
      setCharacter((prev) => {
        if (!prev) return prev;
        const res = joinExtracurricular(prev, kind, name);
        flash(res.message, res.tone);
        return res.character;
      });
    },
    [flash],
  );

  const chooseCourses = useCallback(
    (picks: IBPick[]) => {
      setCharacter((prev) => {
        if (!prev) return prev;
        const res = chooseIBCourses(prev, picks);
        flash(res.message, res.tone);
        return res.character;
      });
    },
    [flash],
  );

  return {
    character,
    pendingEvent,
    result,
    dismissResult,
    loaded,
    start,
    restart,
    advance,
    chooseEvent,
    activity,
    apply,
    resign,
    enroll,
    exam,
    joinActivity,
    assignments,
    fafsa,
    appeal,
    workStudy,
    chooseCourses,
  };
}
