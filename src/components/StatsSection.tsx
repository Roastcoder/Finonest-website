import { Users, MapPin, Building2, IndianRupee } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const stats = [
  {
    icon: Users,
    value: "5.8 Lacs",
    suffix: "+",
    label: "Customers Annually",
  },
  {
    icon: MapPin,
    value: "150",
    suffix: "+",
    label: "Cities Covered",
  },
  {
    icon: Building2,
    value: "587",
    suffix: "+",
    label: "Branches",
  },
  {
    icon: IndianRupee,
    value: "61,000",
    suffix: "Cr+",
    label: "Disbursed Annually",
  },
];

const StatsSection = () => {
  const { ref, isRevealed } = useScrollReveal();

  return (
    <section className="py-4 md:py-6 bg-primary">
      <div ref={ref} className="container px-4">
        {/* 2x2 Grid on mobile, row on desktop */}
        <div className="grid grid-cols-2 gap-3 md:flex md:items-center md:justify-between md:gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 md:gap-3 bg-primary-foreground/5 md:bg-transparent rounded-lg p-2 md:p-0 card-scroll-reveal ${isRevealed ? 'revealed' : ''}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                <stat.icon className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs md:text-lg font-bold text-primary-foreground whitespace-nowrap">
                  {stat.value}{" "}
                  <span className="text-accent">{stat.suffix}</span>
                </p>
                <p className="text-[9px] md:text-xs text-primary-foreground/70 whitespace-nowrap">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
