import Image from "next/image";

const VALUES = [
  {
    icon: "candles",
    title: "בחר מצווה אחת",
    desc: "בחר צעד רוחני שמתאים לך",
  },
  {
    icon: "handshake",
    title: "קבל ליווי אישי",
    desc: "מלווה שילווה אותך באהבה",
  },
  {
    icon: "book-open",
    title: "מצא שיעור קרוב",
    desc: "שיעורי תורה בכל הארץ",
  },
  {
    icon: "footsteps",
    title: "התקדם בקצב שלך",
    desc: "ללא לחץ, ללא כפייה",
  },
];

export function ValueBar() {
  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="container-main">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {VALUES.map((item) => (
            <div key={item.title} className="text-center">
              <div className="flex justify-center mb-2">
                <Image src={`/icons/${item.icon}.png`} alt={item.title} width={48} height={48} className="w-12 h-12 object-contain" />
              </div>
              <h3 className="font-bold text-[var(--color-blue-deep)] mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--color-warm-gray)]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
