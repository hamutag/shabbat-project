import { z } from "zod";
import { router, publicProcedure, protectedProcedure, adminProcedure } from "../trpc";
import prisma from "@/lib/db";

export const contentRouter = router({
  list: publicProcedure
    .input(z.object({
      type: z.enum(["ARTICLE", "VIDEO", "PODCAST", "QUOTE", "STORY", "QA", "INFOGRAPHIC", "TIP"]).optional(),
      category: z.string().optional(),
      search: z.string().optional(),
      page: z.number().default(1),
      pageSize: z.number().default(20),
    }))
    .query(async ({ input }) => {
      const { type, category, search, page, pageSize } = input;
      const skip = (page - 1) * pageSize;
      const where: Record<string, unknown> = { isPublished: true };
      if (type) where.type = type;
      if (category) where.category = category;
      if (search) where.OR = [{ title: { contains: search } }, { body: { contains: search } }];
      const [items, total] = await Promise.all([
        prisma.content.findMany({ where, skip, take: pageSize, orderBy: { createdAt: "desc" } }),
        prisma.content.count({ where }),
      ]);
      return { items, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      await prisma.content.update({ where: { id: input.id }, data: { viewCount: { increment: 1 } } });
      return prisma.content.findUnique({ where: { id: input.id } });
    }),

  dailyQuote: publicProcedure.query(async () => {
    const quotes = await prisma.content.findMany({ where: { type: "QUOTE", isPublished: true } });
    if (quotes.length === 0) return { text: "כל ישראל יש להם חלק לעולם הבא", source: "משנה סנהדרין" };
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const quote = quotes[dayOfYear % quotes.length];
    return { text: quote.body || quote.title, source: quote.category || "" };
  }),

  saveToFavorites: protectedProcedure
    .input(z.object({ contentId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = (ctx.session.user as { id: string }).id;
      return prisma.userFavorite.create({
        data: { userId, itemType: "content", itemId: input.contentId },
      });
    }),

  create: adminProcedure
    .input(z.object({
      title: z.string().min(3),
      slug: z.string(),
      body: z.string().optional(),
      excerpt: z.string().optional(),
      type: z.enum(["ARTICLE", "VIDEO", "PODCAST", "QUOTE", "STORY", "QA", "INFOGRAPHIC", "TIP"]),
      category: z.string(),
      isPublished: z.boolean().default(false),
    }))
    .mutation(async ({ ctx, input }) => {
      const createdById = (ctx.session.user as { id: string }).id;
      return prisma.content.create({ data: { ...input, createdById } });
    }),

  update: adminProcedure
    .input(z.object({ id: z.string(), title: z.string().optional(), body: z.string().optional(), isPublished: z.boolean().optional() }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return prisma.content.update({ where: { id }, data });
    }),

  adminList: adminProcedure
    .input(z.object({ page: z.number().default(1), pageSize: z.number().default(20), type: z.string().optional(), isPublished: z.boolean().optional() }))
    .query(async ({ input }) => {
      const { page, pageSize, type, isPublished } = input;
      const where: Record<string, unknown> = {};
      if (type) where.type = type;
      if (isPublished !== undefined) where.isPublished = isPublished;
      const [items, total] = await Promise.all([
        prisma.content.findMany({ where, skip: (page - 1) * pageSize, take: pageSize, orderBy: { createdAt: "desc" } }),
        prisma.content.count({ where }),
      ]);
      return { items, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
    }),
});
