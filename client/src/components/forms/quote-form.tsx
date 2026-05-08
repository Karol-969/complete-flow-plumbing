import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { quoteRequestSchema, type QuoteRequest, SERVICES, ALL_LOCATIONS } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Loader2, Send, CheckCircle } from "lucide-react";
import { useState } from "react";

export function QuoteForm() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<QuoteRequest>({
    resolver: zodResolver(quoteRequestSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      suburb: "",
      serviceType: "",
      urgency: "this_week",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: QuoteRequest) => {
      const response = await apiRequest("POST", "/api/quotes", data);
      return response;
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Quote Request Sent!",
        description: "We'll get back to you as soon as possible.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send your request. Please try again or call us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: QuoteRequest) => {
    mutation.mutate(data);
  };

  if (submitted) {
    return (
      <Card className="p-8 text-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-success/10 mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-success" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Thank You!
        </h3>
        <p className="text-muted-foreground mb-4">
          Your quote request has been submitted. We'll be in touch shortly.
        </p>
        <Button onClick={() => setSubmitted(false)} variant="outline" data-testid="button-submit-another">
          Submit Another Request
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6 md:p-8">
      <h3 className="text-xl font-semibold text-foreground mb-6">
        Request a Free Quote
      </h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your name" 
                      {...field} 
                      className="h-12"
                      data-testid="quote-name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your phone number" 
                      type="tel"
                      {...field} 
                      className="h-12"
                      data-testid="quote-phone"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email (optional)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Your email address" 
                    type="email"
                    {...field} 
                    className="h-12"
                    data-testid="quote-email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="suburb"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Suburb *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12" data-testid="quote-suburb">
                        <SelectValue placeholder="Select your suburb" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ALL_LOCATIONS.map((location) => (
                        <SelectItem key={location.id} value={location.name}>
                          {location.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="serviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Needed *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12" data-testid="quote-service">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SERVICES.map((service) => (
                        <SelectItem key={service.id} value={service.title}>
                          {service.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="urgency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How Urgent? *</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-2 md:grid-cols-4 gap-3"
                  >
                    <div className="flex items-center space-x-2 bg-muted/50 rounded-md p-3 border border-border hover-elevate">
                      <RadioGroupItem value="emergency" id="emergency" data-testid="quote-urgency-emergency" />
                      <label htmlFor="emergency" className="text-sm font-medium cursor-pointer">
                        Emergency
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 bg-muted/50 rounded-md p-3 border border-border hover-elevate">
                      <RadioGroupItem value="today" id="today" data-testid="quote-urgency-today" />
                      <label htmlFor="today" className="text-sm font-medium cursor-pointer">
                        Today
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 bg-muted/50 rounded-md p-3 border border-border hover-elevate">
                      <RadioGroupItem value="this_week" id="this_week" data-testid="quote-urgency-week" />
                      <label htmlFor="this_week" className="text-sm font-medium cursor-pointer">
                        This Week
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 bg-muted/50 rounded-md p-3 border border-border hover-elevate">
                      <RadioGroupItem value="flexible" id="flexible" data-testid="quote-urgency-flexible" />
                      <label htmlFor="flexible" className="text-sm font-medium cursor-pointer">
                        Flexible
                      </label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Details</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us more about your plumbing issue..."
                    className="min-h-[100px]"
                    {...field} 
                    data-testid="quote-message"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            size="lg" 
            className="w-full h-14 text-lg"
            disabled={mutation.isPending}
            data-testid="quote-submit"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                Get Free Quote
              </>
            )}
          </Button>
        </form>
      </Form>
    </Card>
  );
}
