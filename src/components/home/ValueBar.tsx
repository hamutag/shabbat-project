const VALUES = [
  {
    icon: "🕯️",
    title: "בחר מצווה אחת",
    desc: "בחר צעד רוחני שמתאים לך",
  },
  {
    icon: "🤝",
    title: "קבל ליווי אישי",
    desc: "מלווה שילווה אותך באהבה",
  },
  {
    icon: "📖",
    title: "מצא שיעור קרוב",
    desc: "שיעורי תורה בכל הארץ",
  },
  {
    icon: "🚶",
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
              <div className="text-3xl mb-2">{item.icon}</div>
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
