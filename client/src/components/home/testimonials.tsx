import { Card } from "@/components/ui/card";
import { TESTIMONIALS, BUSINESS_INFO } from "@shared/schema";
import { Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. See what our satisfied customers have to say about Complete Flow Plumbing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <Card 
              key={testimonial.id} 
              className="p-6"
              data-testid={`testimonial-${testimonial.id}`}
            >
              <Quote className="h-8 w-8 text-primary/30 mb-4" />
              
              <p className="text-foreground italic mb-4 line-clamp-4">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-semibold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.suburb} • {testimonial.service}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg" data-testid="view-all-reviews">
            <a href={BUSINESS_INFO.googleReviewLink} target="_blank" rel="noopener noreferrer">
              See All Reviews on Google
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
