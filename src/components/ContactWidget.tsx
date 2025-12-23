import { Phone, MessageCircle, Instagram } from "lucide-react";

interface ContactWidgetProps {
  variant?: "horizontal" | "vertical" | "compact";
  showLabels?: boolean;
  className?: string;
}

const ContactWidget = ({ 
  variant = "horizontal", 
  showLabels = true, 
  className = "" 
}: ContactWidgetProps) => {
  const contacts = {
    phone: {
      label: "Call Us",
      value: "+91 94625 53887",
      href: "tel:+919462553887",
      icon: Phone,
      color: "text-blue-600 hover:text-blue-700"
    },
    whatsapp: {
      label: "WhatsApp",
      value: "Chat Now",
      href: "https://api.whatsapp.com/send/?phone=919462553887&text=Hi+Finonest+Team%2C+I+need+assistance.&type=phone_number&app_absent=0",
      icon: MessageCircle,
      color: "text-green-600 hover:text-green-700"
    },
    instagram: {
      label: "Instagram",
      value: "@finonest.india",
      href: "https://www.instagram.com/finonest.india/",
      icon: Instagram,
      color: "text-pink-600 hover:text-pink-700"
    }
  };

  const baseClasses = variant === "vertical" 
    ? "flex flex-col gap-3" 
    : variant === "compact"
    ? "flex gap-2"
    : "flex flex-wrap gap-4";

  return (
    <div className={`${baseClasses} ${className}`}>
      {Object.entries(contacts).map(([key, contact]) => {
        const Icon = contact.icon;
        return (
          <a
            key={key}
            href={contact.href}
            target={key === "instagram" ? "_blank" : undefined}
            rel={key === "instagram" ? "noopener noreferrer" : undefined}
            className={`flex items-center gap-2 ${contact.color} transition-colors ${
              variant === "compact" ? "p-2 rounded-full bg-muted/50 hover:bg-muted" : ""
            }`}
          >
            <Icon className={variant === "compact" ? "w-4 h-4" : "w-5 h-5"} />
            {showLabels && variant !== "compact" && (
              <span className="text-sm font-medium">{contact.value}</span>
            )}
          </a>
        );
      })}
    </div>
  );
};

export default ContactWidget;