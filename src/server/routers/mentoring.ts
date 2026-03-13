import { z } from "zod";
import { router, protectedProcedure, adminProcedure } from "../trpc";
import prisma from "@/lib/db";

export const mentoringRouter = router({
  myMentor: protectedProcedure.query(async ({ ctx }) => {
    const userId = (ctx.session.user as { id: string }).id;
    return prisma.mentoring.findFirst({
      where: { menteeId: userId, status: "active" },
      include: { mentor: { select: { id: true, firstName: true, lastName: true, phone: true, email: true } } },
    });
  }),

  myMentees: protectedProcedure.query(async ({ ctx }) => {
    const userId = (ctx.session.user as { id: string }).id;
    return prisma.mentoring.findMany({
      where: { mentorId: userId, status: "active" },
      include: { mentee: { select: { id: true, firstName: true, lastName: true, phone: true, religiousBg: true } } },
      orderBy: { lastContact: "desc" },
    });
  }),

  logContact: protectedProcedure
    .input(z.object({ mentoringId: z.string(), action: z.string(), notes: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      const createdById = (ctx.session.user as { id: string }).id;
      await prisma.mentoringLog.create({
        data: { mentoringId: input.mentoringId, action: input.action, notes: input.notes, createdById },
      });
      return prisma.mentoring.update({
        where: { id: input.mentoringId },
        data: { lastContact: new Date() },
      });
    }),

  advanceStage: protectedProcedure
    .input(z.object({
      mentoringId: z.string(),
      stage: z.enum(["CONTACT_MADE", "CONTENT_SENT", "INVITED_LESSON", "ATTENDED_LESSON", "CHOSE_MITZVA", "STARTED_TRACK", "KEPT_ONE_SHABBAT", "KEPT_TWO_SHABBATOT", "NEEDS_MORE", "BECAME_ACTIVIST"]),
    }))
    .mutation(async ({ input }) => prisma.mentoring.update({
      where: { id: input.mentoringId },
      data: { stage: input.stage },
    })),

  assign: adminProcedure
    .input(z.object({ mentorId: z.string(), menteeId: z.string() }))
    .mutation(async ({ input }) => prisma.mentoring.create({
      data: { mentorId: input.mentorId, menteeId: input.menteeId, stage: "CONTACT_MADE", status: "active" },
    })),

  funnel: adminProcedure.query(async () => {
    const stages = ["CONTACT_MADE", "CONTENT_SENT", "INVITED_LESSON", "ATTENDED_LESSON", "CHOSE_MITZVA", "STARTED_TRACK", "KEPT_ONE_SHABBAT", "KEPT_TWO_SHABBATOT", "BECAME_ACTIVIST"] as const;
    const labels: Record<string, string> = {
      CONTACT_MADE: "יצירת קשר", CONTENT_SENT: "נשלח תוכן", INVITED_LESSON: "הוזמן לשיעור",
      ATTENDED_LESSON: "השתתף בשיעור", CHOSE_MITZVA: "בחר מצווה", STARTED_TRACK: "התחיל מסלול",
      KEPT_ONE_SHABBAT: "שמר שבת אחת", KEPT_TWO_SHABBATOT: "שמר שתי שבתות", BECAME_ACTIVIST: "הפך לפעיל",
    };
    const total = await prisma.mentoring.count({ where: { status: "active" } });
    const results = await Promise.all(stages.map(async (stage) => {
      const count = await prisma.mentoring.count({ where: { status: "active", stage } });
      return { stage, label: labels[stage], count, percentage: total > 0 ? Math.round((count / total) * 100) : 0 };
    }));
    return results;
  }),
});
