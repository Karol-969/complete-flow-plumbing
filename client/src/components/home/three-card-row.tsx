import { Link } from "wouter";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Phone, CalendarCheck, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS_INFO } from "@shared/schema";
import p1 from "@assets/cfp-gallery-03.jpeg";
import p2 from "@assets/cfp-gallery-11.jpeg";
import p3 from "@assets/cfp-gallery-18.jpeg";

const EASE = [0.22, 1, 0.36, 1] as const;

type Card = {
  photo: string;
  alt: string;
  title: string;
  desc: string;
  cta: {
    label: string;
    icon?: typeof Phone;
    to?: string;
    href?: string;
  };
};

const CARDS: Card[] = [
  {
    photo: p1,
    alt: "Complete Flow Plumbing plumber on a job in Sydney",
    title: "Same-Day Response",
    desc: "Local plumbers on the way today across all 11 regions.",
    cta: { label: "Book Now", icon: CalendarCheck, to: "/contact" },
  },
  {
    photo: p2,
    alt: "Complete Flow Plumbing work in progress",
    title: "$0 Call-Out & Free Quotes",
    desc: "No call-out fee on standard jobs, with honest upfront pricing.",
    cta: {
      label: "Call Now",
      icon: Phone,
      href: `tel:${BUSINESS_INFO.phoneTel}`,
    },
  },
  {
    photo: p3,
    alt: "Tidy finished plumbing workmanship by Complete Flow Plumbing",
    title: "Honest, Tidy Workmanship",
    desc: "Backed by our Workmanship Guarantee — done right, cleaned up.",
    cta: { label: "Our Story", icon: BookOpen, to: "/about" },
  },
];

export function ThreeCardRow() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.12 },
    },
  };

  const cardVariants: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduce
        ? { duration: 0.4, ease: EASE }
        : { type: "spring", stiffness: 240, damping: 18, mass: 0.7 },
    },
  };

  return (
    <section className="bg-background py-16 md:py-24" data-testid="section-three-card-row">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {CARDS.map((card, index) => {
            const Icon = card.cta.icon;
            return (
              <motion.article
                key={card.title}
                variants={cardVariants}
                whileHover={
                  reduce
                    ? undefined
                    : {
                        y: -8,
                        transition: { type: "spring", stiffness: 300, damping: 20 },
                      }
                }
                className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-card transition-shadow hover:shadow-glow"
                data-testid={`card-three-row-${index}`}
              >
                {/* TOP — photo */}
                <div className="overflow-hidden">
                  <img
                    src={card.photo}
                    alt={card.alt}
                    loading="lazy"
                    className="h-48 md:h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* BODY */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold tracking-tight text-primary">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">{card.desc}</p>

                  <div className="mt-6">
                    {card.cta.href ? (
                      <Button
                        asChild
                        className="rounded-full font-bold"
                        data-testid={`button-three-row-${index}`}
                      >
                        <a href={card.cta.href}>
                          {Icon ? <Icon className="mr-2 h-4 w-4" /> : null}
                          {card.cta.label}
                        </a>
                      </Button>
                    ) : (
                      <Button
                        asChild
                        className="rounded-full font-bold"
                        data-testid={`button-three-row-${index}`}
                      >
                        <Link href={card.cta.to ?? "/contact"}>
                          {Icon ? <Icon className="mr-2 h-4 w-4" /> : null}
                          {card.cta.label}
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
