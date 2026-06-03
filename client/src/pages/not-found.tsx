import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Home, Phone } from "lucide-react";
import { BUSINESS_INFO } from "@shared/schema";

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center py-16">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Page Not Found
          </h2>
          <p className="text-muted-foreground mb-8">
            Sorry, we couldn't find the page you're looking for. 
            It may have been moved or doesn't exist.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild data-testid="404-home">
              <Link href="/">
                <Home className="h-5 w-5 mr-2" />
                Go Home
              </Link>
            </Button>
            <Button asChild variant="outline" data-testid="404-call">
              <a href={`tel:${BUSINESS_INFO.phoneTel}`}>
                <Phone className="h-5 w-5 mr-2" />
                Call Us
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
