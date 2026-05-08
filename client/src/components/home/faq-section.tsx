import { HOME_FAQS } from "@shared/schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Got questions? We've got answers. If you can't find what you're looking for, 
            give us a call.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {HOME_FAQS.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`faq-${index}`}
              className="bg-card rounded-lg border border-border px-6"
              data-testid={`faq-item-${index}`}
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
