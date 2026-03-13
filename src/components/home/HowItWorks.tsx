const STEPS = [
  {
    number: "01",
    title: "הירשם ובחר את הצעד הראשון שלך",
    desc: "הרשמה פשוטה ומהירה. בחר מצווה אחת או מסלול התחזקות שמתאים בדיוק למצב שלך.",
  },
  {
    number: "02",
    title: "קבל תוכן, ליווי ושיעורים מתאימים",
    desc: "המערכת תמליץ לך על תכנים, שיעורי תורה קרובים ומלווה אישי שילווה אותך בדרך.",
  },
  {
    number: "03",
    title: "התחזק והפוך לחלק מתנועה לאומית",
    desc: "התקדם בקצב שלך, עקוב אחרי ההתקדמות שלך, ועזור גם לאחרים להתחזק.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 gradient-light">
      <div className="container-main">
        <h2 className="section-title">איך זה עובד?</h2>
        <p className="section-subtitle">
          שלושה צעדים פשוטים שמשנים הכל
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {STEPS.map((step, i) => (
            <div key={step.number} className="text-center relative">
              {/* Step number */}
              <div className="w-16 h-16 rounded-full gradient-gold flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                {step.number}
              </div>

              {/* Connector line (not on last) */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-8 right-0 w-full h-[2px] bg-[var(--color-gold-light)] -z-10" />
              )}

              <h3 className="text-lg font-bold text-[var(--color-blue-deep)] mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-[var(--color-warm-gray)] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
