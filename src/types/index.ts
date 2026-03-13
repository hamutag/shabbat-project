// ============================================
// Type definitions for the Shabbat Project
// ============================================

// User roles hierarchy
export type UserRole =
  | "USER"
  | "ACTIVIST"
  | "MENTOR"
  | "CITY_COORD_MALE"
  | "CITY_COORD_FEMALE"
  | "NEIGHBORHOOD_HEAD"
  | "CITY_HEAD"
  | "REGION_HEAD"
  | "NATIONAL_ADMIN"
  | "RABBI"
  | "LECTURER"
  | "DONOR";

export type Gender = "MALE" | "FEMALE";
export type ReligiousBg = "SECULAR" | "TRADITIONAL" | "RETURNING" | "RELIGIOUS" | "ULTRA_ORTHODOX";
export type MaritalStatus = "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED";
export type Difficulty = "EASY" | "MEDIUM" | "HARD";
export type Audience = "MEN" | "WOMEN" | "MIXED" | "YOUTH";
export type LessonLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "ALL";
export type MentoringStage =
  | "INITIAL_CONTACT"
  | "CONTENT_SENT"
  | "INVITED_TO_LESSON"
  | "ATTENDED_LESSON"
  | "CHOSE_MITZVA"
  | "STARTED_TRACK"
  | "KEEPING_SHABBAT"
  | "BECAME_ACTIVIST";
export type ContentType =
  | "ARTICLE"
  | "VIDEO"
  | "AUDIO"
  | "STORY"
  | "QUOTE"
  | "INFOGRAPHIC"
  | "QA";
export type EventType =
  | "SHABBAT_DINNER"
  | "CHALLAH_BAKING"
  | "SEMINAR"
  | "WORKSHOP"
  | "LECTURE"
  | "CELEBRATION"
  | "OTHER";

// ============================================
// API Response types
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ============================================
// User types
// ============================================

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string | null;
  gender?: Gender | null;
  city?: string | null;
  neighborhood?: string | null;
  religiousBg?: ReligiousBg | null;
  role: UserRole;
  avatarUrl?: string | null;
  createdAt: string;
}

export interface UserStats {
  totalMitzvot: number;
  activeMitzvot: number;
  shabbatCount: number;
  shabbatStreak: number;
  lessonsAttended: number;
  daysActive: number;
}

// ============================================
// Mitzva types
// ============================================

export interface Mitzva {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: Difficulty;
  icon?: string | null;
  tips: string[];
  order: number;
}

export interface UserMitzva {
  id: string;
  mitzva: Mitzva;
  progress: number;
  streak: number;
  totalKept: number;
  startedAt: string;
  lastKeptAt?: string | null;
  isActive: boolean;
}

// ============================================
// Track types
// ============================================

export interface Track {
  id: string;
  name: string;
  description: string;
  duration: string;
  icon?: string | null;
  difficulty: Difficulty;
  stepsCount: number;
}

export interface TrackStep {
  id: string;
  title: string;
  description: string;
  order: number;
  content?: string | null;
}

export interface UserTrack {
  id: string;
  track: Track;
  currentStep: number;
  startedAt: string;
  completedAt?: string | null;
  isActive: boolean;
}

// ============================================
// Lesson types
// ============================================

export interface Lesson {
  id: string;
  title: string;
  description?: string | null;
  rabbi: string;
  city: string;
  neighborhood?: string | null;
  address?: string | null;
  dayOfWeek: string;
  time: string;
  audience: Audience;
  level: LessonLevel;
  topic?: string | null;
  maxParticipants?: number | null;
  registeredCount: number;
  isActive: boolean;
  isApproved: boolean;
}

export interface LessonRegistration {
  id: string;
  lesson: Lesson;
  registeredAt: string;
  attendanceCount: number;
}

// ============================================
// Content types
// ============================================

export interface Content {
  id: string;
  title: string;
  body?: string | null;
  summary?: string | null;
  type: ContentType;
  category: string;
  imageUrl?: string | null;
  videoUrl?: string | null;
  isPublished: boolean;
  viewCount: number;
  shareCount: number;
  createdAt: string;
}

// ============================================
// Mentoring types
// ============================================

export interface MentoringRelation {
  id: string;
  mentor: Pick<UserProfile, "id" | "firstName" | "lastName" | "phone">;
  mentee: Pick<UserProfile, "id" | "firstName" | "lastName" | "phone">;
  stage: MentoringStage;
  startedAt: string;
  lastContactAt?: string | null;
  notes?: string | null;
}

// ============================================
// Event types
// ============================================

export interface Event {
  id: string;
  title: string;
  description?: string | null;
  type: EventType;
  date: string;
  time: string;
  location: string;
  maxParticipants?: number | null;
  registeredCount: number;
  isActive: boolean;
}

// ============================================
// Achievement types
// ============================================

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: string;
}

export interface UserAchievement {
  id: string;
  achievement: Achievement;
  earnedAt: string;
}

// ============================================
// Dashboard types
// ============================================

export interface DashboardData {
  user: UserProfile;
  stats: UserStats;
  mitzvot: UserMitzva[];
  upcomingLessons: LessonRegistration[];
  dailyQuote: { text: string; source: string };
  mentor?: Pick<UserProfile, "id" | "firstName" | "lastName" | "phone"> | null;
}

export interface AdminDashboardData {
  city: string;
  region: string;
  kpis: {
    totalUsers: number;
    activeUsers: number;
    newThisWeek: number;
    activists: number;
    mentors: number;
    activeLessons: number;
    shabbatKeepers: number;
    conversionRate: number;
  };
  recentSignups: UserProfile[];
  pendingTasks: AdminTask[];
  topActivists: ActivistStats[];
  funnel: FunnelStep[];
}

export interface AdminTask {
  id: string;
  task: string;
  priority: "high" | "medium" | "low";
  due: string;
  completed: boolean;
}

export interface ActivistStats {
  user: Pick<UserProfile, "id" | "firstName" | "lastName">;
  menteeCount: number;
  activeCount: number;
  shabbatRate: number;
}

export interface FunnelStep {
  stage: MentoringStage;
  label: string;
  count: number;
  percentage: number;
}

// ============================================
// Notification types
// ============================================

export interface Notification {
  id: string;
  type: "SHABBAT_REMINDER" | "LESSON_REMINDER" | "MENTOR_MESSAGE" | "ACHIEVEMENT" | "CONTENT" | "SYSTEM";
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string | null;
}

// ============================================
// Form types
// ============================================

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  gender: Gender;
  city: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormData {
  identifier: string; // phone or email
  password: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}
