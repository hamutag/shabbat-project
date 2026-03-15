import Image from "next/image";

// Map emoji/category to icon file
const ICON_MAP: Record<string, string> = {
  // Shabbat
  "🕯️": "candles",
  "🍷": "kiddush-challah",
  "🍽️": "shabbat-meal-plate",
  "😌": "armchair-book",
  "🌟": "star-glow",
  "🙏": "hands-praying",
  "🔥": "havdalah-set",

  // Mitzvot categories
  "📿": "tefillin",
  "💧": "mikveh",
  "📖": "book-open",
  "🥗": "shabbat-meal-plate",
  "🚪": "door",
  "💰": "tzedakah-box",
  "📚": "torah-reading",
  "🍞": "challah-plate",
  "👕": "wardrobe",
  "🤐": "key",
  "👨‍👩‍👧": "family-prayer",
  "❤️": "chesed-heart",
  "📜": "open-torah",
  "🏥": "hospital-visit",
  "🌊": "mikveh",
  "🔄": "return",
  "✨": "star-glow",
  "💫": "lightbulb",

  // Tracks
  "🌅": "hands-light",
  "🏡": "jewish-home",
  "🌸": "flower",
  "💑": "rings",
  "🎓": "synagogue",
  "🎉": "lantern",
  "👨‍👦": "family-prayer",
  "✍️": "siddur",

  // Navigation/UI
  "🤝": "handshake",
  "👤": "person-glow",
  "📊": "calendar",
  "⚙️": "key",
  "🏠": "jewish-home",
  "📋": "siddur",
  "👥": "group",
  "💛": "heart-gold",
  "🤔": "lightbulb",
  "🛤️": "footsteps",
  "👩": "flower",

  // Women section
  "📿_women": "siddur",
};

interface IconProps {
  name: string; // emoji or icon name
  size?: number;
  className?: string;
  alt?: string;
}

export default function Icon({ name, size = 32, className = "", alt = "" }: IconProps) {
  // Check if it's a mapped emoji
  const iconFile = ICON_MAP[name] || name;

  // If no mapping found, fall back to emoji text
  if (!ICON_MAP[name] && !iconFile.match(/^[a-z-]+$/)) {
    return <span className={className} style={{ fontSize: size * 0.75 }}>{name}</span>;
  }

  return (
    <Image
      src={`/icons/${iconFile}.png`}
      alt={alt || iconFile}
      width={size}
      height={size}
      className={`object-contain ${className}`}
    />
  );
}
