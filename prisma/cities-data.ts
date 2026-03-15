// All Israeli cities organized by region
// Regions: North, Haifa, Sharon, Center, Tel Aviv, Shfela, South, Judea & Samaria, Jerusalem

export const REGIONS = [
  "צפון",
  "חיפה והקריות",
  "השרון",
  "מרכז",
  "תל אביב והגוש",
  "שפלה ולכיש",
  "דרום",
  "יהודה ושומרון",
  "ירושלים והסביבה",
] as const;

export type RegionName = (typeof REGIONS)[number];

export interface CityData {
  name: string;
  region: RegionName;
  lat?: number;
  lng?: number;
  population?: number;
}

export const CITIES: CityData[] = [
  // צפון
  { name: "טבריה", region: "צפון", lat: 32.7922, lng: 35.5312, population: 46200 },
  { name: "צפת", region: "צפון", lat: 32.9646, lng: 35.4960, population: 36600 },
  { name: "נצרת עילית (נוף הגליל)", region: "צפון", lat: 32.7018, lng: 35.3135, population: 42500 },
  { name: "עפולה", region: "צפון", lat: 32.6088, lng: 35.2913, population: 57400 },
  { name: "כרמיאל", region: "צפון", lat: 32.9126, lng: 35.3008, population: 48500 },
  { name: "מעלות-תרשיחא", region: "צפון", lat: 33.0162, lng: 35.2680, population: 23900 },
  { name: "קריית שמונה", region: "צפון", lat: 33.2083, lng: 35.5720, population: 24500 },
  { name: "מגדל העמק", region: "צפון", lat: 32.6764, lng: 35.2410, population: 27800 },
  { name: "יקנעם עילית", region: "צפון", lat: 32.6586, lng: 35.1077, population: 22500 },
  { name: "נהריה", region: "צפון", lat: 33.0046, lng: 35.0949, population: 60500 },
  { name: "עכו", region: "צפון", lat: 32.9278, lng: 35.0824, population: 50100 },
  { name: "בית שאן", region: "צפון", lat: 32.5019, lng: 35.4966, population: 19900 },
  { name: "שלומי", region: "צפון", lat: 33.0779, lng: 35.1423, population: 8300 },
  { name: "חצור הגלילית", region: "צפון", lat: 32.9843, lng: 35.5432, population: 10800 },
  { name: "ראש פינה", region: "צפון", lat: 32.9692, lng: 35.5412, population: 3200 },

  // חיפה והקריות
  { name: "חיפה", region: "חיפה והקריות", lat: 32.7940, lng: 34.9896, population: 285700 },
  { name: "קריית אתא", region: "חיפה והקריות", lat: 32.8047, lng: 35.1029, population: 59000 },
  { name: "קריית ביאליק", region: "חיפה והקריות", lat: 32.8302, lng: 35.0880, population: 41300 },
  { name: "קריית ים", region: "חיפה והקריות", lat: 32.8418, lng: 35.0701, population: 40500 },
  { name: "קריית מוצקין", region: "חיפה והקריות", lat: 32.8363, lng: 35.0771, population: 30500 },
  { name: "טירת הכרמל", region: "חיפה והקריות", lat: 32.7583, lng: 34.9771, population: 20700 },
  { name: "נשר", region: "חיפה והקריות", lat: 32.7704, lng: 35.0357, population: 27700 },
  { name: "חדרה", region: "חיפה והקריות", lat: 32.4340, lng: 34.9196, population: 99200 },
  { name: "אור עקיבא", region: "חיפה והקריות", lat: 32.5042, lng: 34.9190, population: 19000 },
  { name: "זכרון יעקב", region: "חיפה והקריות", lat: 32.5706, lng: 34.9490, population: 25800 },
  { name: "פרדס חנה-כרכור", region: "חיפה והקריות", lat: 32.4741, lng: 34.9681, population: 39900 },
  { name: "בנימינה-גבעת עדה", region: "חיפה והקריות", lat: 32.5198, lng: 34.9481, population: 16100 },

  // השרון
  { name: "נתניה", region: "השרון", lat: 32.3215, lng: 34.8532, population: 228300 },
  { name: "הרצליה", region: "השרון", lat: 32.1628, lng: 34.7931, population: 103000 },
  { name: "רעננה", region: "השרון", lat: 32.1838, lng: 34.8708, population: 77700 },
  { name: "כפר סבא", region: "השרון", lat: 32.1713, lng: 34.9065, population: 106900 },
  { name: "הוד השרון", region: "השרון", lat: 32.1588, lng: 34.8888, population: 61400 },
  { name: "רמת השרון", region: "השרון", lat: 32.1462, lng: 34.8361, population: 48300 },
  { name: "כפר יונה", region: "השרון", lat: 32.3174, lng: 34.9361, population: 22300 },
  { name: "אבן יהודה", region: "השרון", lat: 32.2745, lng: 34.8868, population: 15800 },
  { name: "קדימה-צורן", region: "השרון", lat: 32.2758, lng: 34.8545, population: 23900 },

  // מרכז
  { name: "פתח תקווה", region: "מרכז", lat: 32.0841, lng: 34.8878, population: 247900 },
  { name: "ראשון לציון", region: "מרכז", lat: 31.9514, lng: 34.8024, population: 254200 },
  { name: "רחובות", region: "מרכז", lat: 31.8928, lng: 34.8113, population: 146100 },
  { name: "נס ציונה", region: "מרכז", lat: 31.9293, lng: 34.7971, population: 50300 },
  { name: "לוד", region: "מרכז", lat: 31.9500, lng: 34.8953, population: 82200 },
  { name: "רמלה", region: "מרכז", lat: 31.9269, lng: 34.8620, population: 79600 },
  { name: "ראש העין", region: "מרכז", lat: 32.0953, lng: 34.9566, population: 58800 },
  { name: "שוהם", region: "מרכז", lat: 31.9992, lng: 34.9466, population: 25300 },
  { name: "יהוד-מונוסון", region: "מרכז", lat: 32.0324, lng: 34.8897, population: 30600 },
  { name: "אור יהודה", region: "מרכז", lat: 32.0289, lng: 34.8566, population: 37400 },
  { name: "כפר קאסם", region: "מרכז", lat: 32.1138, lng: 34.9783, population: 24500 },
  { name: "אלעד", region: "מרכז", lat: 32.0517, lng: 34.9516, population: 51800 },
  { name: "מודיעין-מכבים-רעות", region: "מרכז", lat: 31.8989, lng: 35.0104, population: 95900 },

  // תל אביב והגוש
  { name: "תל אביב-יפו", region: "תל אביב והגוש", lat: 32.0853, lng: 34.7818, population: 460613 },
  { name: "בני ברק", region: "תל אביב והגוש", lat: 32.0837, lng: 34.8329, population: 204600 },
  { name: "רמת גן", region: "תל אביב והגוש", lat: 32.0682, lng: 34.8242, population: 163480 },
  { name: "גבעתיים", region: "תל אביב והגוש", lat: 32.0716, lng: 34.8108, population: 60300 },
  { name: "חולון", region: "תל אביב והגוש", lat: 32.0117, lng: 34.7748, population: 198400 },
  { name: "בת ים", region: "תל אביב והגוש", lat: 32.0171, lng: 34.7515, population: 129300 },

  // שפלה ולכיש
  { name: "אשדוד", region: "שפלה ולכיש", lat: 31.8044, lng: 34.6553, population: 225900 },
  { name: "אשקלון", region: "שפלה ולכיש", lat: 31.6688, lng: 34.5743, population: 144200 },
  { name: "קריית גת", region: "שפלה ולכיש", lat: 31.6100, lng: 34.7642, population: 56400 },
  { name: "קריית מלאכי", region: "שפלה ולכיש", lat: 31.7284, lng: 34.7436, population: 24300 },
  { name: "גדרה", region: "שפלה ולכיש", lat: 31.8143, lng: 34.7764, population: 30900 },
  { name: "יבנה", region: "שפלה ולכיש", lat: 31.8788, lng: 34.7388, population: 50800 },
  { name: "שדרות", region: "שפלה ולכיש", lat: 31.5254, lng: 34.5953, population: 27800 },
  { name: "נתיבות", region: "שפלה ולכיש", lat: 31.4205, lng: 34.5880, population: 36100 },
  { name: "אופקים", region: "שפלה ולכיש", lat: 31.3170, lng: 34.6214, population: 30300 },
  { name: "בית שמש", region: "שפלה ולכיש", lat: 31.7468, lng: 34.9868, population: 131400 },

  // דרום
  { name: "באר שבע", region: "דרום", lat: 31.2530, lng: 34.7915, population: 209000 },
  { name: "אילת", region: "דרום", lat: 29.5569, lng: 34.9517, population: 52600 },
  { name: "ערד", region: "דרום", lat: 31.2553, lng: 35.2130, population: 26500 },
  { name: "דימונה", region: "דרום", lat: 31.0663, lng: 35.0340, population: 34200 },
  { name: "ירוחם", region: "דרום", lat: 30.9895, lng: 34.9290, population: 11300 },
  { name: "מצפה רמון", region: "דרום", lat: 30.6115, lng: 34.8010, population: 5700 },

  // יהודה ושומרון
  { name: "מעלה אדומים", region: "יהודה ושומרון", lat: 31.7787, lng: 35.3106, population: 40200 },
  { name: "אריאל", region: "יהודה ושומרון", lat: 32.1060, lng: 35.1790, population: 20400 },
  { name: "ביתר עילית", region: "יהודה ושומרון", lat: 31.6970, lng: 35.1195, population: 62700 },
  { name: "גבעת זאב", region: "יהודה ושומרון", lat: 31.8571, lng: 35.1711, population: 19300 },
  { name: "אפרת", region: "יהודה ושומרון", lat: 31.6584, lng: 35.1494, population: 10800 },
  { name: "קרני שומרון", region: "יהודה ושומרון", lat: 32.1746, lng: 35.0940, population: 8200 },
  { name: "עמנואל", region: "יהודה ושומרון", lat: 32.1552, lng: 35.1488, population: 4400 },
  { name: "קדומים", region: "יהודה ושומרון", lat: 32.1917, lng: 35.1600, population: 4700 },
  { name: "אלקנה", region: "יהודה ושומרון", lat: 32.1095, lng: 35.0324, population: 4400 },
  { name: "מודיעין עילית", region: "יהודה ושומרון", lat: 31.9336, lng: 35.0432, population: 81200 },

  // ירושלים והסביבה
  { name: "ירושלים", region: "ירושלים והסביבה", lat: 31.7683, lng: 35.2137, population: 936400 },
  { name: "מבשרת ציון", region: "ירושלים והסביבה", lat: 31.7988, lng: 35.1483, population: 27400 },
  { name: "קריית יערים (טלזסטון)", region: "ירושלים והסביבה", lat: 31.7959, lng: 35.1088, population: 5100 },
  { name: "אבו גוש", region: "ירושלים והסביבה", lat: 31.7967, lng: 35.1148, population: 7300 },
];
