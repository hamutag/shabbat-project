import { z } from "zod";
import { router, publicProcedure, protectedProcedure, adminProcedure } from "../trpc";
import prisma from "@/lib/db";

export const lessonRouter = router({
  search: publicProcedure
    .input(z.object({
      search: z.string().optional(),
      cityId: z.string().optional(),
      dayOfWeek: z.number().optional(),
      audience: z.enum(["MEN", "WOMEN", "MIXED", "FAMILIES", "YOUTH"]).optional(),
      level: z.enum(["BEGINNER", "ADVANCED", "ALL"]).optional(),
      page: z.number().default(1),
      pageSize: z.number().default(20),
    }))
    .query(async ({ input }) => {
      const { search, cityId, dayOfWeek, audience, level, page, pageSize } = input;
      const skip = (page - 1) * pageSize;
      const where: Record<string, unknown> = { isActive: true, approved: true };
      if (search) where.OR = [{ title: { contains: search } }, { rabbiName: { contains: search } }];
      if (cityId) where.cityId = cityId;
      if (dayOfWeek !== undefined) where.dayOfWeek = dayOfWeek;
      if (audience) where.audience = audience;
      if (level) where.level = level;
      const [lessons, total] = await Promise.all([
        prisma.lesson.findMany({ where, include: { city: true }, skip, take: pageSize, orderBy: { createdAt: "desc" } }),
        prisma.lesson.count({ where }),
      ]);
      return { items: lessons, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => prisma.lesson.findUnique({ where: { id: input.id }, include: { city: true } })),

  register: protectedProcedure
    .input(z.object({ lessonId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = (ctx.session.user as { id: string }).id;
      return prisma.lessonRegistration.create({ data: { userId, lessonId: input.lessonId } });
    }),

  myLessons: protectedProcedure.query(async ({ ctx }) => {
    const userId = (ctx.session.user as { id: string }).id;
    return prisma.lessonRegistration.findMany({
      where: { userId },
      include: { lesson: { include: { city: true } } },
      orderBy: { registeredAt: "desc" },
    });
  }),

  unregister: protectedProcedure
    .input(z.object({ registrationId: z.string() }))
    .mutation(async ({ input }) => prisma.lessonRegistration.delete({ where: { id: input.registrationId } })),

  approve: adminProcedure
    .input(z.object({ lessonId: z.string() }))
    .mutation(async ({ input }) => prisma.lesson.update({ where: { id: input.lessonId }, data: { approved: true } })),

  adminList: adminProcedure
    .input(z.object({ page: z.number().default(1), pageSize: z.number().default(20), approved: z.boolean().optional() }))
    .query(async ({ input }) => {
      const { page, pageSize, approved } = input;
      const where: Record<string, unknown> = {};
      if (approved !== undefined) where.approved = approved;
      const [lessons, total] = await Promise.all([
        prisma.lesson.findMany({ where, include: { city: true, _count: { select: { registrations: true } } }, skip: (page - 1) * pageSize, take: pageSize, orderBy: { createdAt: "desc" } }),
        prisma.lesson.count({ where }),
      ]);
      return { items: lessons, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
    }),
});
