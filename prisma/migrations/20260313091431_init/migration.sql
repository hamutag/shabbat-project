-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "ReligiousBg" AS ENUM ('SECULAR', 'TRADITIONAL', 'RELIGIOUS', 'RETURNING');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ACTIVIST', 'MENTOR', 'CITY_COORD_MALE', 'CITY_COORD_FEMALE', 'NEIGHBORHOOD_HEAD', 'CITY_HEAD', 'REGION_HEAD', 'NATIONAL_ADMIN', 'RABBI', 'LECTURER', 'DONOR');

-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "Audience" AS ENUM ('MEN', 'WOMEN', 'MIXED', 'FAMILIES', 'YOUTH');

-- CreateEnum
CREATE TYPE "LessonLevel" AS ENUM ('BEGINNER', 'ADVANCED', 'ALL');

-- CreateEnum
CREATE TYPE "MentoringStage" AS ENUM ('CONTACT_MADE', 'CONTENT_SENT', 'INVITED_LESSON', 'ATTENDED_LESSON', 'CHOSE_MITZVA', 'STARTED_TRACK', 'KEPT_ONE_SHABBAT', 'KEPT_TWO_SHABBATOT', 'NEEDS_MORE', 'BECAME_ACTIVIST');

-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('ARTICLE', 'VIDEO', 'PODCAST', 'QUOTE', 'STORY', 'QA', 'INFOGRAPHIC', 'TIP');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('SHABBAT_CHIZUK', 'CHALLAH', 'EMUNAH', 'STUDY_DAY', 'SEMINAR', 'COMMUNITY', 'YOUTH', 'CITY', 'NATIONAL', 'COORDINATOR_CONF');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "passwordHash" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "cityId" TEXT,
    "neighborhood" TEXT,
    "birthYear" INTEGER,
    "religiousBg" "ReligiousBg" NOT NULL DEFAULT 'SECULAR',
    "maritalStatus" "MaritalStatus",
    "language" TEXT NOT NULL DEFAULT 'he',
    "avatarUrl" TEXT,
    "bio" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "onboardingComplete" BOOLEAN NOT NULL DEFAULT false,
    "interests" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "mfaEnabled" BOOLEAN NOT NULL DEFAULT false,
    "lastActive" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Region" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "headUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "regionId" TEXT,
    "headUserId" TEXT,
    "maleCoordId" TEXT,
    "femaleCoordId" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "population" INTEGER,
    "targetMembers" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mitzva" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "shortDescription" TEXT,
    "category" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL DEFAULT 'EASY',
    "genderTarget" "Gender",
    "iconUrl" TEXT,
    "videoUrl" TEXT,
    "steps" JSONB,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mitzva_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMitzva" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mitzvaId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'started',
    "progressLevel" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastProgress" TIMESTAMP(3),
    "notes" TEXT,

    CONSTRAINT "UserMitzva_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "genderTarget" "Gender",
    "difficulty" "Difficulty" NOT NULL DEFAULT 'EASY',
    "durationDays" INTEGER,
    "stepsCount" INTEGER NOT NULL DEFAULT 0,
    "imageUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrackStep" (
    "id" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,
    "stepNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "taskDescription" TEXT,
    "estimatedDays" INTEGER,

    CONSTRAINT "TrackStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTrack" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,
    "currentStep" INTEGER NOT NULL DEFAULT 1,
    "status" TEXT NOT NULL DEFAULT 'active',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "UserTrack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "rabbiName" TEXT NOT NULL,
    "rabbiUserId" TEXT,
    "topic" TEXT NOT NULL,
    "description" TEXT,
    "cityId" TEXT,
    "neighborhood" TEXT,
    "address" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "dayOfWeek" INTEGER,
    "specificDate" TIMESTAMP(3),
    "time" TEXT,
    "endTime" TEXT,
    "audience" "Audience" NOT NULL DEFAULT 'MIXED',
    "level" "LessonLevel" NOT NULL DEFAULT 'ALL',
    "language" TEXT NOT NULL DEFAULT 'he',
    "phone" TEXT,
    "whatsapp" TEXT,
    "notes" TEXT,
    "imageUrl" TEXT,
    "videoUrl" TEXT,
    "isRecurring" BOOLEAN NOT NULL DEFAULT true,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LessonRegistration" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'registered',
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LessonRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mentoring" (
    "id" TEXT NOT NULL,
    "mentorId" TEXT NOT NULL,
    "menteeId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "mitzvaFocus" TEXT,
    "stage" "MentoringStage" NOT NULL DEFAULT 'CONTACT_MADE',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastContact" TIMESTAMP(3),
    "nextFollowup" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mentoring_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MentoringLog" (
    "id" TEXT NOT NULL,
    "mentoringId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "notes" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MentoringLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Referral" (
    "id" TEXT NOT NULL,
    "referrerId" TEXT NOT NULL,
    "referredName" TEXT NOT NULL,
    "referredPhone" TEXT,
    "referredUserId" TEXT,
    "relationship" TEXT,
    "status" TEXT NOT NULL DEFAULT 'new',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Referral_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Content" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "ContentType" NOT NULL,
    "category" TEXT NOT NULL,
    "subcategory" TEXT,
    "body" TEXT,
    "excerpt" TEXT,
    "author" TEXT,
    "imageUrl" TEXT,
    "videoUrl" TEXT,
    "audioUrl" TEXT,
    "genderTarget" "Gender",
    "audienceLevel" "LessonLevel" NOT NULL DEFAULT 'ALL',
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "shareCount" INTEGER NOT NULL DEFAULT 0,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "EventType" NOT NULL,
    "description" TEXT,
    "cityId" TEXT,
    "address" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TEXT,
    "endTime" TEXT,
    "audience" "Audience" NOT NULL DEFAULT 'MIXED',
    "maxCapacity" INTEGER,
    "imageUrl" TEXT,
    "organizerId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventRegistration" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'registered',
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "link" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShabbatTracking" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "shabbatDate" TIMESTAMP(3) NOT NULL,
    "kept" BOOLEAN NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShabbatTracking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFavorite" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "itemType" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserFavorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "iconUrl" TEXT,
    "type" TEXT NOT NULL,
    "criteria" JSONB,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAchievement" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "achievementId" TEXT NOT NULL,
    "earnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAchievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT,
    "entityId" TEXT,
    "details" JSONB,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE INDEX "User_cityId_role_isActive_idx" ON "User"("cityId", "role", "isActive");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_phone_idx" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Region_headUserId_key" ON "Region"("headUserId");

-- CreateIndex
CREATE UNIQUE INDEX "City_headUserId_key" ON "City"("headUserId");

-- CreateIndex
CREATE UNIQUE INDEX "City_maleCoordId_key" ON "City"("maleCoordId");

-- CreateIndex
CREATE UNIQUE INDEX "City_femaleCoordId_key" ON "City"("femaleCoordId");

-- CreateIndex
CREATE UNIQUE INDEX "Mitzva_slug_key" ON "Mitzva"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "UserMitzva_userId_mitzvaId_key" ON "UserMitzva"("userId", "mitzvaId");

-- CreateIndex
CREATE UNIQUE INDEX "Track_slug_key" ON "Track"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "TrackStep_trackId_stepNumber_key" ON "TrackStep"("trackId", "stepNumber");

-- CreateIndex
CREATE UNIQUE INDEX "UserTrack_userId_trackId_key" ON "UserTrack"("userId", "trackId");

-- CreateIndex
CREATE INDEX "Lesson_cityId_dayOfWeek_isActive_idx" ON "Lesson"("cityId", "dayOfWeek", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "LessonRegistration_lessonId_userId_key" ON "LessonRegistration"("lessonId", "userId");

-- CreateIndex
CREATE INDEX "Mentoring_mentorId_status_idx" ON "Mentoring"("mentorId", "status");

-- CreateIndex
CREATE INDEX "Mentoring_menteeId_status_idx" ON "Mentoring"("menteeId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Referral_referredUserId_key" ON "Referral"("referredUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Content_slug_key" ON "Content"("slug");

-- CreateIndex
CREATE INDEX "Content_category_isPublished_publishedAt_idx" ON "Content"("category", "isPublished", "publishedAt");

-- CreateIndex
CREATE UNIQUE INDEX "EventRegistration_eventId_userId_key" ON "EventRegistration"("eventId", "userId");

-- CreateIndex
CREATE INDEX "Notification_userId_isRead_idx" ON "Notification"("userId", "isRead");

-- CreateIndex
CREATE UNIQUE INDEX "ShabbatTracking_userId_shabbatDate_key" ON "ShabbatTracking"("userId", "shabbatDate");

-- CreateIndex
CREATE UNIQUE INDEX "UserFavorite_userId_itemType_itemId_key" ON "UserFavorite"("userId", "itemType", "itemId");

-- CreateIndex
CREATE UNIQUE INDEX "UserAchievement_userId_achievementId_key" ON "UserAchievement"("userId", "achievementId");

-- CreateIndex
CREATE INDEX "AuditLog_userId_createdAt_idx" ON "AuditLog"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Region" ADD CONSTRAINT "Region_headUserId_fkey" FOREIGN KEY ("headUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_headUserId_fkey" FOREIGN KEY ("headUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_maleCoordId_fkey" FOREIGN KEY ("maleCoordId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_femaleCoordId_fkey" FOREIGN KEY ("femaleCoordId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMitzva" ADD CONSTRAINT "UserMitzva_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMitzva" ADD CONSTRAINT "UserMitzva_mitzvaId_fkey" FOREIGN KEY ("mitzvaId") REFERENCES "Mitzva"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackStep" ADD CONSTRAINT "TrackStep_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTrack" ADD CONSTRAINT "UserTrack_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTrack" ADD CONSTRAINT "UserTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_rabbiUserId_fkey" FOREIGN KEY ("rabbiUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonRegistration" ADD CONSTRAINT "LessonRegistration_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonRegistration" ADD CONSTRAINT "LessonRegistration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mentoring" ADD CONSTRAINT "Mentoring_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mentoring" ADD CONSTRAINT "Mentoring_menteeId_fkey" FOREIGN KEY ("menteeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MentoringLog" ADD CONSTRAINT "MentoringLog_mentoringId_fkey" FOREIGN KEY ("mentoringId") REFERENCES "Mentoring"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MentoringLog" ADD CONSTRAINT "MentoringLog_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_referrerId_fkey" FOREIGN KEY ("referrerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_referredUserId_fkey" FOREIGN KEY ("referredUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventRegistration" ADD CONSTRAINT "EventRegistration_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventRegistration" ADD CONSTRAINT "EventRegistration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShabbatTracking" ADD CONSTRAINT "ShabbatTracking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavorite" ADD CONSTRAINT "UserFavorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAchievement" ADD CONSTRAINT "UserAchievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAchievement" ADD CONSTRAINT "UserAchievement_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
