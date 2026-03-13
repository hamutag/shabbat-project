import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "צור קשר",
  description: "צור קשר עם צוות פרויקט השבת",
};

export default function ContactPage() {
  return (
    <div className="gradient-light min-h-screen">
      <section className="py-20">
        <div className="container-main max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-[var(--color-blue-deep)] mb-4">
              צור קשר
            </h1>
            <p className="text-xl text-[var(--color-warm-gray)]">
              נשמח לשמוע ממך. כל שאלה, הצעה או רעיון — אנחנו כאן
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <ContactForm />

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="card p-8">
                <h2 className="text-xl font-bold text-[var(--color-blue-deep)] mb-6">
                  פרטי התקשרות
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-blue-light)] flex items-center justify-center">
                      👤
                    </div>
                    <div>
                      <p className="font-medium">ארנון דהאן</p>
                      <p className="text-sm text-[var(--color-warm-gray)]">מייסד פרויקט השבת</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-blue-light)] flex items-center justify-center">
                      📞
                    </div>
                    <div>
                      <p className="font-medium" dir="ltr">058-7267726</p>
                      <p className="text-sm text-[var(--color-warm-gray)]">טלפון</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-blue-light)] flex items-center justify-center">
                      ✉️
                    </div>
                    <div>
                      <p className="font-medium" dir="ltr">dahanarnon@gmail.com</p>
                      <p className="text-sm text-[var(--color-warm-gray)]">אימייל</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-8 bg-[var(--color-blue-deep)] text-white">
                <h3 className="text-lg font-bold text-[var(--color-gold)] mb-3">
                  רוצה להיות חלק מהצוות?
                </h3>
                <p className="text-sm text-gray-300 mb-4">
                  אנחנו מחפשים רכזי ערים, פעילים, מלווים, רבנים ומרצים בכל הארץ.
                  הצטרף אלינו ותהיה חלק מהשינוי.
                </p>
                <a href="/join?type=activist" className="inline-block bg-[var(--color-gold)] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[var(--color-gold-dark)] transition-colors">
                  הצטרף כפעיל
                </a>
              </div>

              <div className="card p-8">
                <h3 className="text-lg font-bold text-[var(--color-blue-deep)] mb-3">
                  שעות פעילות
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--color-warm-gray)]">ימים א&apos;-ה&apos;</span>
                    <span className="font-medium">09:00 - 21:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-warm-gray)]">יום ו&apos;</span>
                    <span className="font-medium">09:00 - 13:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-warm-gray)]">שבת</span>
                    <span className="font-medium text-[var(--color-gold)]">שבת שלום ♥</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
