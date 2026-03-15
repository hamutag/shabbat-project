"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ContactForm from "@/components/contact/ContactForm";
import { PageHero } from "@/components/ui/PageHero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  MessageCircle,
  User,
  Phone,
  Mail,
  Clock,
  Heart,
  Users,
  ArrowLeft,
} from "lucide-react";

export default function ContactPageContent() {
  return (
    <>
      <PageHero
        title="צור קשר"
        subtitle="נשמח לשמוע ממך. כל שאלה, הצעה או רעיון — אנחנו כאן"
        icon={<MessageCircle className="w-8 h-8" />}
        gradient="light"
      />

      <div className="container-main py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <AnimatedSection variant="fadeUp">
            <ContactForm />
          </AnimatedSection>

          {/* Contact Info */}
          <div className="space-y-6">
            <AnimatedSection variant="fadeUp" delay={0.1}>
              <div className="card p-8 backdrop-blur-lg bg-white/80 border border-white/40">
                <h2 className="text-xl font-bold text-[var(--color-blue-deep)] mb-6 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-[var(--color-gold)]" />
                  פרטי התקשרות
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-gold)]/10 flex items-center justify-center text-[var(--color-gold)]">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-[var(--color-blue-deep)]">ארנון דהאן</p>
                      <p className="text-sm text-[var(--color-warm-gray)]">מייסד פרויקט השבת</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-gold)]/10 flex items-center justify-center text-[var(--color-gold)]">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-[var(--color-blue-deep)]" dir="ltr">058-7267726</p>
                      <p className="text-sm text-[var(--color-warm-gray)]">טלפון</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-gold)]/10 flex items-center justify-center text-[var(--color-gold)]">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-[var(--color-blue-deep)]" dir="ltr">dahanarnon@gmail.com</p>
                      <p className="text-sm text-[var(--color-warm-gray)]">אימייל</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection variant="fadeUp" delay={0.2}>
              <motion.div
                whileHover={{ y: -2 }}
                className="card p-8 bg-[var(--color-blue-deep)] text-white relative overflow-hidden"
              >
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-[var(--color-gold)]/10 rounded-full blur-2xl" />
                <h3 className="text-lg font-bold text-[var(--color-gold)] mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  רוצה להיות חלק מהצוות?
                </h3>
                <p className="text-sm text-gray-300 mb-4">
                  אנחנו מחפשים רכזי ערים, פעילים, מלווים, רבנים ומרצים בכל הארץ.
                  הצטרף אלינו ותהיה חלק מהשינוי.
                </p>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/join?type=activist"
                    className="inline-flex items-center gap-2 bg-[var(--color-gold)] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[var(--color-gold-dark)] transition-colors"
                  >
                    הצטרף כפעיל
                    <ArrowLeft className="w-4 h-4" />
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection variant="fadeUp" delay={0.3}>
              <div className="card p-8 backdrop-blur-lg bg-white/80 border border-white/40">
                <h3 className="text-lg font-bold text-[var(--color-blue-deep)] mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[var(--color-gold)]" />
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
                    <span className="font-medium text-[var(--color-gold)] flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 fill-[var(--color-gold)]" />
                      שבת שלום
                    </span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </>
  );
}
