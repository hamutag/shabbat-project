import { z } from "zod";
import { router, protectedProcedure, adminProcedure } from "../trpc";
import prisma from "@/lib/db";

export const userRouter = router({
  me: protectedProcedure.query(async ({ ctx }) => {
    const userId = (ctx.session.user as { id: string }).id;
    return prisma.user.findUnique({ where: { id: userId }, include: { city: true } });
  }),

  updateProfile: protectedProcedure
    .input(z.object({
      firstName: z.string().min(2).optional(),
      lastName: z.string().min(2).optional(),
      email: z.string().email().optional(),
      neighborhood: z.string().optional(),
      religiousBg: z.enum(["SECULAR", "TRADITIONAL", "RETURNING", "RELIGIOUS"]).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const userId = (ctx.session.user as { id: string }).id;
      return prisma.user.update({ where: { id: userId }, data: input });
    }),

  getStats: protectedProcedure.query(async ({ ctx }) => {
    const userId = (ctx.session.user as { id: string }).id;
    const [mitzvotCount, shabbatCount, lessonsCount] = await Promise.all([
      prisma.userMitzva.count({ where: { userId } }),
      prisma.shabbatTracking.count({ where: { userId, kept: true } }),
      prisma.lessonRegistration.count({ where: { userId } }),
    ]);
    return { totalMitzvot: mitzvotCount, shabbatCount, lessonsAttended: lessonsCount };
  }),

  list: adminProcedure
    .input(z.object({
      page: z.number().default(1),
      pageSize: z.number().default(20),
      search: z.string().optional(),
      role: z.string().optional(),
      cityId: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const { page, pageSize, search, role, cityId } = input;
      const where: Record<string, unknown> = {};
      if (search) where.OR = [{ firstName: { contains: search } }, { lastName: { contains: search } }, { phone: { contains: search } }];
      if (role) where.role = role;
      if (cityId) where.cityId = cityId;
      const [users, total] = await Promise.all([
        prisma.user.findMany({ where, include: { city: true }, skip: (page - 1) * pageSize, take: pageSize, orderBy: { createdAt: "desc" } }),
        prisma.user.count({ where }),
      ]);
      return { items: users, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
    }),

  updateRole: adminProcedure
    .input(z.object({
      userId: z.string(),
      role: z.enum(["USER", "ACTIVIST", "MENTOR", "CITY_COORD_MALE", "CITY_COORD_FEMALE", "NEIGHBORHOOD_HEAD", "CITY_HEAD", "REGION_HEAD", "NATIONAL_ADMIN", "RABBI", "LECTURER", "DONOR"]),
    }))
    .mutation(async ({ input }) => prisma.user.update({ where: { id: input.userId }, data: { role: input.role } })),
});
