import { useEffect, useState } from "react";
import { Users, MapPin, Building2, IndianRupee, Loader2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { publicCMSAPI } from "@/lib/api";

interface StatItem {
  _id: string;
  label: string;
  value: string;
  suffix?: string;
  icon?: string;
}

const iconMap: Record<string, any> = {
  users: Users,
  map: MapPin,
  building: Building2,
  rupee: IndianRupee,
  indianrupee: IndianRupee,
};

const StatsSection = () => {
  const { ref, isRevealed } = useScrollReveal();
  const [stats, setStats] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const res = await publicCMSAPI.listStats();
        if (res.status === 'ok' && res.data) {
          setStats(res.data || []);
        }
      } catch (error) {
        console.error('Failed to load stats:', error);
        setStats([]);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  const getIcon = (stat: StatItem) => {
    if (stat.icon) {
      const key = stat.icon.toLowerCase().replace(/\s+/g, '');
      return iconMap[key] || Users;
    }
    return Users;
  };

  return (
    <section className="py-4 md:py-6 bg-primary">
      <div ref={ref} className="container px-4">
        {loading ? (
          <div className="flex justify-center py-6">
            <Loader2 className="w-6 h-6 animate-spin text-primary-foreground" />
          </div>
        ) : stats.length === 0 ? (
          <div className="flex justify-center py-6">
            <p className="text-primary-foreground/80 text-sm">Stats will appear here once published.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:flex md:items-center md:justify-between md:gap-4">
            {stats.map((stat, index) => {
              const Icon = getIcon(stat);
              return (
                <div
                  key={stat._id}
                  className={`flex items-center gap-2 md:gap-3 bg-primary-foreground/5 md:bg-transparent rounded-lg p-2 md:p-0 card-scroll-reveal ${isRevealed ? 'revealed' : ''}`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-xs md:text-lg font-bold text-primary-foreground whitespace-nowrap">
                      {stat.value}{" "}
                      {stat.suffix && <span className="text-accent">{stat.suffix}</span>}
                    </p>
                    <p className="text-[9px] md:text-xs text-primary-foreground/70 whitespace-nowrap">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default StatsSection;
