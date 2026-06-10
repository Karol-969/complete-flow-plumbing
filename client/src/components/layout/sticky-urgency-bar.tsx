import { useState, useEffect } from "react";
import { Phone, X, Clock } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BUSINESS_INFO } from "@shared/schema";

export function StickyUrgencyBar() {
  const [hidden, setHidden] = useState(false);
  const [time, setTime] = useState("");
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);

    return () => clearInterval(interval);
  }, []);

  if (hidden) return null;

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { y: "100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed bottom-0 inset-x-0 z-40 bg-gradient-to-r from-[#0a66c2] to-[#04243b] text-white shadow-2xl"
    >
      <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-3 py-2.5 px-4">
        <p className="flex items-center gap-2 min-w-0 text-sm font-medium">
          <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="truncate">
            It's {time} - same-day spots fill fast. Book today.
          </span>
        </p>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            asChild
            size="sm"
            className="rounded-full bg-white text-[#04243b] hover:bg-white/90 font-bold"
          >
            <a href={`tel:${BUSINESS_INFO.phoneTel}`}>
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Call {BUSINESS_INFO.phone}</span>
              <span className="sm:hidden">Call</span>
            </a>
          </Button>

          <button
            type="button"
            onClick={() => setHidden(true)}
            aria-label="Dismiss"
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
