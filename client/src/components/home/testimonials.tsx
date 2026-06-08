import { TESTIMONIALS, BUSINESS_INFO } from "@shared/schema";
import { Star, Quote, ExternalLink, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Testimonials() {
  return (
    <section className="relative py-16 md:py-24 bg-background overflow-hidden">
      {/* Atmospheric sky glow behind the header */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[40rem] h-[40rem] bg-primary/10 blur-3xl rounded-full"
      />

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
            What Locals Say
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Real Words From Real Customers
          </h2>
          <p className="text-lg text-muted-foreground">
            In their own words — here's what people across the Highlands and beyond
            have told us about working with Complete Flow Plumbing.
          </p>
        </motion.div>

        {/* Scroll-snap carousel of quote cards */}
        <div
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          data-testid="testimonials-carousel"
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.figure
              key={testimonial.id}
              className="snap-start shrink-0 w-[85%] sm:w-[22rem] bg-card rounded-xl2 border border-border shadow-card group hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow transition-all p-6 flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: Math.min(index, 3) * 0.08 }}
              data-testid={`testimonial-${testimonial.id}`}
            >
              <Quote className="h-8 w-8 text-primary/30 mb-4" aria-hidden />

              {/* Sky stars — decoration only, no aggregate rating claimed */}
              <div className="flex items-center gap-1 mb-4" aria-hidden>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>

              <blockquote className="text-foreground/90 leading-relaxed mb-6 flex-1">
                "{testimonial.text}"
              </blockquote>

              <figcaption className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="flex items-center justify-center w-11 h-11 rounded-full bg-primary/15 text-primary font-bold text-lg shrink-0">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.suburb}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Google review CTAs — honest social-proof prompt, no aggregate number */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground rounded-full px-6 py-3 font-bold shadow-glow hover:brightness-110 transition"
            data-testid="view-reviews-google"
          >
            <a
              href={BUSINESS_INFO.googleReviewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <ExternalLink className="h-5 w-5" />
              See our reviews on Google
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="ring-1 ring-border hover:ring-primary text-foreground rounded-full px-6 py-3 font-semibold border-0 bg-transparent transition"
            data-testid="leave-review-google"
          >
            <a
              href={BUSINESS_INFO.googleReviewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <PenLine className="h-5 w-5 text-primary" />
              Leave us a review
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
