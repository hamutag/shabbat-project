import Link from "next/link";

export function CtaBottom() {
  return (
    <section className="py-20 gradient-shabbat text-white">
      <div className="container-main text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          אם כל אחד מאתנו יוסיף צעד אחד קטן,
          <br />
          כולנו ביחד נאיר את כל העולם
        </h2>
        <p className="text-lg text-[var(--color-gold-light)] mb-8 max-w-xl mx-auto">
          הצטרף עכשיו לתנועה הלאומית לחיזוק עם ישראל.
          <br />
          בחר את הצעד הראשון שלך.
        </p>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 bg-white text-[var(--color-blue-deep)] font-bold text-lg py-3 px-8 rounded-xl hover:bg-[var(--color-gold-light)] transition-colors"
        >
          הצטרף עכשיו
        </Link>
      </div>
    </section>
  );
}
