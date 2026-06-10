import { Header } from "./header";
import { Footer } from "./footer";
import { TopUtilityBar } from "./top-utility-bar";
import { StickyUrgencyBar } from "./sticky-urgency-bar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <TopUtilityBar />
      <Header />
      <main className="flex-1 pb-24 lg:pb-14">
        {children}
      </main>
      <Footer />
      {/* Desktop-only: mobile already has its own sticky call/book bar */}
      <div className="hidden lg:block">
        <StickyUrgencyBar />
      </div>
    </div>
  );
}
