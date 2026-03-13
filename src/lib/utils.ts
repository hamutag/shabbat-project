import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("he-IL").format(num);
}

export const DAYS_HE = [
  "ראשון",
  "שני",
  "שלישי",
  "רביעי",
  "חמישי",
  "שישי",
  "שבת",
];

export const CATEGORIES = {
  shabbat: "השבת",
  emunah: "אמונה וביטחון",
  tefilla: "תפילה",
  tefillin: "תפילין",
  talit: "טלית קטן",
  netilat: "נטילת ידיים",
  brachot: "ברכות",
  kashrut: "כשרות",
  tahara: "טהרה",
  challah: "הפרשת חלה",
  shalom_bayit: "שלום בית",
  ahavat_israel: "אהבת ישראל",
  teshuva: "תשובה",
  geula: "גאולה ובית המקדש",
  youth: "נוער",
  family: "בית יהודי",
  halacha: "הלכה למעשה",
} as const;
