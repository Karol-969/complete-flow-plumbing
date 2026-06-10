import { Star, ShieldCheck, Clock, Wallet, type LucideIcon } from "lucide-react";
import { BUSINESS_INFO } from "@shared/schema";

type TrustItem = {
  icon: LucideIcon;
  label: string;
  /** When true, the icon is filled amber (for the rating star). */
  amber?: boolean;
};

const items: TrustItem[] = [
  {
    icon: Star,
    label: `${BUSINESS_INFO.googleRating} from ${BUSINESS_INFO.googleReviewCount} Google reviews`,
    amber: true,
  },
  {
    icon: ShieldCheck,
    label: `Licensed NSW · Lic ${BUSINESS_INFO.licence}`,
  },
  {
    icon: Clock,
    label: "24/7 Emergency",
  },
  {
    icon: Wallet,
    label: "No Call-Out Fee",
  },
];

export function TrustBand() {
  return (
    <section
      className="w-full bg-primary text-primary-foreground py-3 md:py-4"
      data-testid="section-trust-band"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {items.map(({ icon: Icon, label, amber }) => (
            <li
              key={label}
              className="inline-flex items-center gap-2 text-sm font-semibold whitespace-nowrap"
              data-testid={`trust-item-${label}`}
            >
              <Icon
                aria-hidden
                className={
                  amber
                    ? "h-4 w-4 shrink-0 fill-amber-400 text-amber-400"
                    : "h-4 w-4 shrink-0"
                }
              />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
