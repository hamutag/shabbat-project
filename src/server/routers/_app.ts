import { router } from "../trpc";
import { userRouter } from "./user";
import { mitzvaRouter } from "./mitzva";
import { lessonRouter } from "./lesson";
import { trackRouter } from "./track";
import { contentRouter } from "./content";
import { shabbatRouter } from "./shabbat";
import { mentoringRouter } from "./mentoring";
import { cityRouter } from "./city";

export const appRouter = router({
  user: userRouter,
  mitzva: mitzvaRouter,
  lesson: lessonRouter,
  track: trackRouter,
  content: contentRouter,
  shabbat: shabbatRouter,
  mentoring: mentoringRouter,
  city: cityRouter,
});

export type AppRouter = typeof appRouter;
