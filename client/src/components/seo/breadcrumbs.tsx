import { Link } from "wouter";
import { ChevronRight, Home } from "lucide-react";
import { BreadcrumbSchema } from "./structured-data";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems = [{ name: "Home", url: "/" }, ...items];
  
  return (
    <>
      <BreadcrumbSchema items={allItems} />
      <nav 
        aria-label="Breadcrumb" 
        className="py-3 px-4 sm:px-6 lg:px-8 bg-muted/30"
        data-testid="nav-breadcrumbs"
      >
        <ol className="flex items-center flex-wrap gap-1 text-sm max-w-7xl mx-auto">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            
            return (
              <li key={item.url} className="flex items-center gap-1">
                {index === 0 ? (
                  <Link 
                    href={item.url}
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                    data-testid="link-breadcrumb-home"
                  >
                    <Home className="h-4 w-4" />
                    <span className="sr-only">Home</span>
                  </Link>
                ) : isLast ? (
                  <span 
                    className="text-foreground font-medium"
                    aria-current="page"
                    data-testid={`text-breadcrumb-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link 
                    href={item.url}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-breadcrumb-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {item.name}
                  </Link>
                )}
                {!isLast && (
                  <ChevronRight className="h-4 w-4 text-muted-foreground/50" aria-hidden="true" />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
