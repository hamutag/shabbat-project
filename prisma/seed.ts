import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

function slugify(text: string): string {
  return text
    .replace(/[\s]+/g, "-")
    .replace(/[^\w\u0590-\u05FF-]/g, "")
    .toLowerCase();
}

async function main() {
  console.log("🌱 Starting seed...");

  // Create regions
  const regionNorth = await prisma.region.create({ data: { name: "צפון" } });
  const regionCenter = await prisma.region.create({ data: { name: "מרכז" } });
  const regionSouth = await prisma.region.create({ data: { name: "דרום" } });
  console.log("✅ Regions created");

  // Create cities
  const cities = await Promise.all([
    prisma.city.create({ data: { name: "ירושלים", regionId: regionCenter.id, lat: 31.7683, lng: 35.2137 } }),
    prisma.city.create({ data: { name: "תל אביב", regionId: regionCenter.id, lat: 32.0853, lng: 34.7818 } }),
    prisma.city.create({ data: { name: "חיפה", regionId: regionNorth.id, lat: 32.7940, lng: 34.9896 } }),
    prisma.city.create({ data: { name: "באר שבע", regionId: regionSouth.id, lat: 31.2530, lng: 34.7915 } }),
    prisma.city.create({ data: { name: "נתניה", regionId: regionCenter.id, lat: 32.3215, lng: 34.8532 } }),
    prisma.city.create({ data: { name: "אשדוד", regionId: regionSouth.id, lat: 31.8044, lng: 34.6553 } }),
    prisma.city.create({ data: { name: "פתח תקווה", regionId: regionCenter.id, lat: 32.0841, lng: 34.8878 } }),
    prisma.city.create({ data: { name: "בני ברק", regionId: regionCenter.id, lat: 32.0837, lng: 34.8329 } }),
  ]);
  console.log("✅ 8 Cities created");

  // Create mitzvot
  const mitzvotData = [
    { name: "שמירת שבת", slug: "shmirat-shabbat", description: "לנוח ביום השביעי ולהדליק נרות שבת", category: "שבת", difficulty: "EASY" as const, iconUrl: "🕯️", sortOrder: 1, steps: ["הכן הכל מיום שישי", "הדלק נרות 18 דקות לפני השקיעה", "הכן אוכל חם על הפלטה"] },
    { name: "הדלקת נרות שבת", slug: "hadlakat-nerot", description: "הדלקת נרות שבת ביום שישי", category: "שבת", difficulty: "EASY" as const, iconUrl: "🕯️", sortOrder: 2, steps: ["הדליקי לפחות 2 נרות", "ברכי 'להדליק נר של שבת'", "הדלקה 18 דקות לפני השקיעה"] },
    { name: "קידוש", slug: "kiddush", description: "לעשות קידוש בליל שבת וביום שבת", category: "שבת", difficulty: "EASY" as const, iconUrl: "🍷", sortOrder: 3, steps: ["השתמש ביין או מיץ ענבים", "עמוד בזמן הקידוש", "כוון ליבך לקדושת השבת"] },
    { name: "הנחת תפילין", slug: "tefillin", description: "הנחת תפילין כל יום חול בבוקר", category: "תפילין", difficulty: "EASY" as const, iconUrl: "📿", sortOrder: 4, steps: ["הניח כל בוקר אחרי נטילת ידיים", "לוקח רק 5 דקות", "בקש עזרה בבית הכנסת"] },
    { name: "ברכות", slug: "brachot", description: "לברך על האוכל ועל הנהנין", category: "ברכות", difficulty: "EASY" as const, iconUrl: "🙏", sortOrder: 5, steps: ["התחל מ'המוציא' על לחם", "הדפס טבלת ברכות", "ברך לפני ואחרי"] },
    { name: "נטילת ידיים", slug: "netilat-yadayim", description: "נטילת ידיים בבוקר ולפני הסעודה", category: "ברכות", difficulty: "EASY" as const, iconUrl: "💧", sortOrder: 6, steps: ["שים כוס נטילה ליד המיטה", "נטול 3 פעמים כל יד", "ברך 'על נטילת ידיים'"] },
    { name: "תפילה", slug: "tefilla", description: "להתפלל שחרית / מנחה / ערבית", category: "תפילה", difficulty: "MEDIUM" as const, iconUrl: "📖", sortOrder: 7, steps: ["התחל מתפילה אחת ביום", "השתמש בסידור עם תרגום", "מצא מניין קרוב"] },
    { name: "כשרות", slug: "kashrut", description: "לאכול אוכל כשר", category: "כשרות", difficulty: "MEDIUM" as const, iconUrl: "🥗", sortOrder: 8, steps: ["בדוק הכשר על מוצרים", "הפרד בשר וחלב", "למד על כללי כשרות בסיסיים"] },
    { name: "מזוזה", slug: "mezuza", description: "לקבוע מזוזה בפתח הבית", category: "מזוזות", difficulty: "EASY" as const, iconUrl: "🚪", sortOrder: 9, steps: ["קנה מזוזה כשרה מסופר סת\"ם", "קבע בצד ימין", "ברך 'לקבוע מזוזה'"] },
    { name: "צדקה", slug: "tzedaka", description: "לתת צדקה באופן קבוע", category: "צדקה", difficulty: "EASY" as const, iconUrl: "💰", sortOrder: 10, steps: ["קבע סכום חודשי", "שים קופת צדקה בבית", "תן לפני כניסת שבת"] },
    { name: "לימוד תורה", slug: "limud-torah", description: "ללמוד תורה באופן קבוע", category: "תורה", difficulty: "MEDIUM" as const, iconUrl: "📚", sortOrder: 11, steps: ["התחל מפרשת שבוע", "מצא חברותא", "הקדש 10 דקות ביום"] },
    { name: "הפרשת חלה", slug: "hafrashat-challah", description: "הפרשת חלה מעיסה", category: "שבת", difficulty: "MEDIUM" as const, iconUrl: "🍞", sortOrder: 12, steps: ["הפריש מעיסה של 1.7 ק\"ג קמח ומעלה", "ברך 'להפריש חלה'", "שרפי את החלה"] },
    { name: "טלית קטן/ציצית", slug: "tzitzit", description: "לבישת ציצית/טלית קטן יומיומית", category: "לבוש", difficulty: "EASY" as const, iconUrl: "👕", sortOrder: 13, steps: ["לבש כל בוקר", "בדוק החוטים לפני ברכה", "ברך 'על מצוות ציצית'"] },
    { name: "שמירת הלשון", slug: "shmirat-halashon", description: "להימנע מלשון הרע ורכילות", category: "מידות", difficulty: "HARD" as const, iconUrl: "🤐", sortOrder: 14, steps: ["למד 2 הלכות ביום", "חשוב לפני שמדבר", "דבר רק טוב על אחרים"] },
    { name: "כיבוד הורים", slug: "kibud-horim", description: "לכבד אב ואם", category: "מידות", difficulty: "EASY" as const, iconUrl: "👨‍👩‍👧", sortOrder: 15, steps: ["התקשר להורים כל יום", "עזור בעבודות הבית", "דבר בכבוד ובנחת"] },
    { name: "אהבת ישראל", slug: "ahavat-israel", description: "לאהוב כל יהודי", category: "מידות", difficulty: "MEDIUM" as const, iconUrl: "❤️", sortOrder: 16, steps: ["חייך לכל אדם", "עשה חסד יומי", "דון לכף זכות"] },
    { name: "ברכת המזון", slug: "birkat-hamazon", description: "לברך ברכת המזון אחרי סעודה עם לחם", category: "ברכות", difficulty: "EASY" as const, iconUrl: "🍽️", sortOrder: 17, steps: ["השתמש בבנצ'ר", "ברך בקול", "כוון ליבך"] },
    { name: "קריאת שמע", slug: "kriat-shma", description: "לקרוא קריאת שמע בוקר וערב", category: "תפילה", difficulty: "EASY" as const, iconUrl: "📜", sortOrder: 18, steps: ["קרא לפני השינה", "כסה עיניך ביד ימין", "כוון ב'שמע ישראל'"] },
    { name: "הבדלה", slug: "havdala", description: "לעשות הבדלה במוצאי שבת", category: "שבת", difficulty: "EASY" as const, iconUrl: "🔥", sortOrder: 19, steps: ["השתמש ביין, בשמים, ואש", "חכה עד צאת הכוכבים", "הריח בשמים לנשמה"] },
    { name: "ביקור חולים", slug: "bikur-cholim", description: "לבקר חולים ולעזור לנזקקים", category: "חסד", difficulty: "EASY" as const, iconUrl: "🏥", sortOrder: 20, steps: ["בקר חולים בבית חולים", "הבא אוכל למשפחות", "התנדב בעמותה"] },
    { name: "טהרת המשפחה", slug: "taharat-hamishpacha", description: "שמירת הלכות טהרת המשפחה", category: "משפחה", difficulty: "HARD" as const, iconUrl: "🌊", sortOrder: 21, steps: ["למדו יחד כזוג", "פנו לרבנית לייעוץ", "בנו את הזוגיות"] },
    { name: "תשובה יומית", slug: "teshuva-yomit", description: "חשבון נפש וחזרה בתשובה כל יום", category: "תשובה", difficulty: "MEDIUM" as const, iconUrl: "🔄", sortOrder: 22, steps: ["הקדש 5 דקות בערב", "כתוב יומן רוחני", "קבל קבלה אחת ליום"] },
  ];

  for (const m of mitzvotData) {
    await prisma.mitzva.create({ data: m });
  }
  console.log("✅ 22 Mitzvot created");

  // Create tracks with steps
  const tracksData = [
    { name: "שבת למתחילים", slug: "shabbat-beginners", description: "מסלול 30 יום ללמוד לשמור שבת צעד אחר צעד", durationDays: 30, difficulty: "EASY" as const, imageUrl: "🕯️", sortOrder: 1, stepsCount: 4 },
    { name: "שגרת בוקר יהודית", slug: "morning-routine", description: "תפילין, ברכות השחר, ונטילת ידיים כל בוקר", durationDays: 21, difficulty: "EASY" as const, imageUrl: "🌅", sortOrder: 2, stepsCount: 3 },
    { name: "עולם הברכות", slug: "world-of-brachot", description: "ללמוד את כל הברכות הבסיסיות", durationDays: 14, difficulty: "EASY" as const, imageUrl: "🙏", sortOrder: 3, stepsCount: 3 },
    { name: "בית יהודי", slug: "jewish-home", description: "מזוזה, כשרות בסיסית, ושולחן שבת", durationDays: 45, difficulty: "MEDIUM" as const, imageUrl: "🏡", sortOrder: 4, stepsCount: 4 },
    { name: "יסודות האמונה", slug: "foundations-of-faith", description: "שיעורים יומיים קצרים על אמונה וביטחון", durationDays: 40, difficulty: "EASY" as const, imageUrl: "💫", sortOrder: 5, stepsCount: 3 },
    { name: "מסלול לנשים", slug: "womens-track", description: "נרות שבת, הפרשת חלה, וברכות", durationDays: 30, difficulty: "EASY" as const, imageUrl: "🌸", sortOrder: 6, stepsCount: 3 },
    { name: "מסלול תפילה", slug: "prayer-track", description: "ללמוד להתפלל - משלב מתחיל ועד שלוש תפילות", durationDays: 60, difficulty: "MEDIUM" as const, imageUrl: "📖", sortOrder: 7, stepsCount: 5 },
    { name: "כשרות מעשית", slug: "practical-kashrut", description: "הכשרת מטבח, הפרדת בשר וחלב, תעודות הכשר", durationDays: 21, difficulty: "MEDIUM" as const, imageUrl: "🥗", sortOrder: 8, stepsCount: 3 },
    { name: "מידות טובות", slug: "good-character", description: "עבודה על 7 מידות יסודיות - שבוע לכל מידה", durationDays: 49, difficulty: "MEDIUM" as const, imageUrl: "❤️", sortOrder: 9, stepsCount: 7 },
    { name: "מסלול זוגות", slug: "couples-track", description: "חיזוק הזוגיות דרך שבת ומצוות משותפות", durationDays: 30, difficulty: "EASY" as const, imageUrl: "💑", sortOrder: 10, stepsCount: 4 },
    { name: "מסלול מתקדם", slug: "advanced-track", description: "העמקה בהלכה, מנהגים, ולימוד תורה", durationDays: 90, difficulty: "HARD" as const, imageUrl: "🎓", sortOrder: 11, stepsCount: 6 },
    { name: "מסלול חגים", slug: "holidays-track", description: "הכנה לחג הקרוב - הלכות, מנהגים, ומשמעות", durationDays: 14, difficulty: "EASY" as const, imageUrl: "🎉", sortOrder: 12, stepsCount: 3 },
    { name: "אבות ובנים", slug: "fathers-and-sons", description: "פעילויות יהודיות משותפות להורים וילדים", durationDays: 30, difficulty: "EASY" as const, imageUrl: "👨‍👦", sortOrder: 13, stepsCount: 4 },
    { name: "שבת מלאה", slug: "full-shabbat", description: "מסלול מתקדם - שמירת שבת מלאה מכניסה ועד צאת", durationDays: 45, difficulty: "HARD" as const, imageUrl: "✨", sortOrder: 14, stepsCount: 5 },
  ];

  for (const t of tracksData) {
    const track = await prisma.track.create({ data: t });
    // Create sample steps for each track
    for (let i = 1; i <= t.stepsCount; i++) {
      await prisma.trackStep.create({
        data: {
          trackId: track.id,
          stepNumber: i,
          title: `שלב ${i}`,
          description: `תיאור שלב ${i} במסלול ${t.name}`,
          estimatedDays: Math.ceil(t.durationDays / t.stepsCount),
        },
      });
    }
  }
  console.log("✅ 14 Tracks created with steps");

  // Create sample content
  const contentData = [
    { title: "איך מתחילים לשמור שבת", slug: "how-to-start-shabbat", type: "ARTICLE" as const, category: "שבת", body: "מדריך מלא ופשוט למי שרוצה להתחיל לשמור שבת. צעד אחר צעד, בלי לחץ.", excerpt: "המדריך המלא והפשוט ביותר למי שרוצה להתחיל לשמור שבת.", isPublished: true, viewCount: 2840 },
    { title: "מה זה תפילין ואיך מניחים?", slug: "what-are-tefillin", type: "VIDEO" as const, category: "תפילין", body: "הסבר פשוט ומעשי על מצוות תפילין.", excerpt: "הסבר פשוט ומעשי על מצוות תפילין - מה, למה, ואיך.", isPublished: true, viewCount: 4521 },
    { title: "סיפור התחזקות: מחילוני לשומר שבת", slug: "strengthening-story-1", type: "STORY" as const, category: "סיפורי התחזקות", body: "הסיפור המרגש של יוסי מתל אביב.", excerpt: "הסיפור המרגש של יוסי מתל אביב שהחליט לשמור שבת אחת.", isPublished: true, viewCount: 3210 },
    { title: "10 ברכות שכל יהודי צריך לדעת", slug: "10-blessings", type: "ARTICLE" as const, category: "ברכות", body: "מדריך מעשי לברכות הנהנין הבסיסיות.", excerpt: "מדריך מעשי לברכות הנהנין הבסיסיות - על מה מברכים ואיך.", isPublished: true, viewCount: 1890 },
    { title: "כל ישראל יש להם חלק לעולם הבא", slug: "quote-olam-haba", type: "QUOTE" as const, category: "אמונה", body: "כל ישראל יש להם חלק לעולם הבא", isPublished: true, viewCount: 500 },
    { title: "כל מצווה שלך מאירה את העולם", slug: "quote-light", type: "QUOTE" as const, category: "חיזוק", body: "כל מצווה שלך מוסיפה אור עצום לעולם. אין מעשה קטן בעם ישראל.", isPublished: true, viewCount: 450 },
    { title: "הקב\"ה לא מבקש אלא לפי כוחו של כל אחד", slug: "quote-strength", type: "QUOTE" as const, category: "אמונה", body: "הקב\"ה לא מבקש אלא לפי כוחו של כל אחד ואחד", isPublished: true, viewCount: 600 },
  ];

  for (const c of contentData) {
    await prisma.content.create({ data: c });
  }
  console.log("✅ Content items created");

  // Create sample lessons
  const lessonsData = [
    { title: "פרשת שבוע - עומק הפשט", rabbiName: "הרב ישראל כהן", topic: "פרשת שבוע", cityId: cities[0].id, neighborhood: "רחביה", address: "רחוב עזה 12", dayOfWeek: 2, time: "20:00", audience: "MIXED" as const, level: "ALL" as const, approved: true, isActive: true },
    { title: "אמונה בזמנים מאתגרים", rabbiName: "הרב דוד לוי", topic: "אמונה וביטחון", cityId: cities[1].id, neighborhood: "פלורנטין", address: "רחוב האומנים 8", dayOfWeek: 3, time: "19:30", audience: "MIXED" as const, level: "BEGINNER" as const, approved: true, isActive: true },
    { title: "הלכות שבת למתחילים", rabbiName: "הרב משה דהן", topic: "הלכה", cityId: cities[2].id, neighborhood: "נווה שאנן", address: "רחוב הנביאים 5", dayOfWeek: 1, time: "20:30", audience: "MEN" as const, level: "BEGINNER" as const, approved: true, isActive: true },
    { title: "שיעור לנשים - אור הבית", rabbiName: "הרבנית שרה גולד", topic: "שלום בית", cityId: cities[3].id, neighborhood: "נווה נוי", address: "רחוב ההגנה 22", dayOfWeek: 3, time: "10:00", audience: "WOMEN" as const, level: "ALL" as const, approved: true, isActive: true },
    { title: "גמרא למתחילים", rabbiName: "הרב אהרון שפירא", topic: "גמרא", cityId: cities[0].id, neighborhood: "תלפיות", address: "רחוב הרצל 44", dayOfWeek: 0, time: "21:00", audience: "MEN" as const, level: "BEGINNER" as const, approved: false, isActive: false },
    { title: "חסידות למתחילים", rabbiName: "הרב יצחק פרידמן", topic: "חסידות", cityId: cities[4].id, neighborhood: "מרכז", address: "רחוב הבנים 3", dayOfWeek: 4, time: "20:00", audience: "MIXED" as const, level: "BEGINNER" as const, approved: true, isActive: true },
  ];

  for (const l of lessonsData) {
    await prisma.lesson.create({ data: l });
  }
  console.log("✅ 6 Lessons created");

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 12);
  await prisma.user.create({
    data: {
      firstName: "מנהל",
      lastName: "ראשי",
      phone: "0500000000",
      email: "admin@shabbat-project.co.il",
      passwordHash: adminPassword,
      role: "NATIONAL_ADMIN",
      gender: "MALE",
      cityId: cities[0].id,
      onboardingComplete: true,
    },
  });

  // Create demo user
  const demoPassword = await bcrypt.hash("demo123", 12);
  await prisma.user.create({
    data: {
      firstName: "מאיר",
      lastName: "כהן",
      phone: "0501111111",
      email: "demo@shabbat-project.co.il",
      passwordHash: demoPassword,
      role: "USER",
      gender: "MALE",
      religiousBg: "SECULAR",
      cityId: cities[0].id,
    },
  });

  // Create mentor user
  const mentorPassword = await bcrypt.hash("mentor123", 12);
  await prisma.user.create({
    data: {
      firstName: "יוסי",
      lastName: "כהן",
      phone: "0502222222",
      email: "mentor@shabbat-project.co.il",
      passwordHash: mentorPassword,
      role: "MENTOR",
      gender: "MALE",
      religiousBg: "RELIGIOUS",
      cityId: cities[0].id,
      onboardingComplete: true,
    },
  });

  console.log("✅ Users created:");
  console.log("   Admin:  0500000000 / admin123");
  console.log("   Demo:   0501111111 / demo123");
  console.log("   Mentor: 0502222222 / mentor123");

  console.log("\n🎉 Seed completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
