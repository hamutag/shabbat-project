import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(2, "שם פרטי חייב להכיל לפחות 2 תווים"),
  lastName: z.string().min(2, "שם משפחה חייב להכיל לפחות 2 תווים"),
  phone: z
    .string()
    .regex(/^0\d{1,2}-?\d{7}$/, "מספר טלפון לא תקין"),
  email: z.string().email("כתובת אימייל לא תקינה").optional().or(z.literal("")),
  gender: z.enum(["MALE", "FEMALE"], { message: "יש לבחור מגדר" }),
  city: z.string().min(1, "יש לבחור עיר"),
  password: z.string().min(6, "סיסמה חייבת להכיל לפחות 6 תווים"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "הסיסמאות לא תואמות",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  identifier: z.string().min(1, "יש להזין טלפון או אימייל"),
  password: z.string().min(1, "יש להזין סיסמה"),
});

export const contactSchema = z.object({
  name: z.string().min(2, "יש להזין שם מלא"),
  email: z.string().email("כתובת אימייל לא תקינה"),
  phone: z.string().optional(),
  subject: z.string().min(3, "יש להזין נושא"),
  message: z.string().min(10, "ההודעה חייבת להכיל לפחות 10 תווים"),
});

export const profileSchema = z.object({
  firstName: z.string().min(2, "שם פרטי חייב להכיל לפחות 2 תווים"),
  lastName: z.string().min(2, "שם משפחה חייב להכיל לפחות 2 תווים"),
  email: z.string().email("אימייל לא תקין").optional().or(z.literal("")),
  neighborhood: z.string().optional(),
});

export const lessonSchema = z.object({
  title: z.string().min(3, "כותרת חייבת להכיל לפחות 3 תווים"),
  description: z.string().optional(),
  rabbi: z.string().min(2, "שם הרב/מרצה חייב להכיל לפחות 2 תווים"),
  dayOfWeek: z.string().min(1, "יש לבחור יום"),
  time: z.string().min(1, "יש לבחור שעה"),
  address: z.string().min(3, "יש להזין כתובת"),
  audience: z.enum(["MEN", "WOMEN", "MIXED", "YOUTH"]),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED", "ALL"]),
  topic: z.string().optional(),
  maxParticipants: z.number().optional(),
});

export const contentSchema = z.object({
  title: z.string().min(3, "כותרת חייבת להכיל לפחות 3 תווים"),
  body: z.string().optional(),
  summary: z.string().optional(),
  type: z.enum(["ARTICLE", "VIDEO", "AUDIO", "STORY", "QUOTE", "INFOGRAPHIC", "QA"]),
  category: z.string().min(1, "יש לבחור קטגוריה"),
  imageUrl: z.string().url().optional().or(z.literal("")),
  videoUrl: z.string().url().optional().or(z.literal("")),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type LessonInput = z.infer<typeof lessonSchema>;
export type ContentInput = z.infer<typeof contentSchema>;
