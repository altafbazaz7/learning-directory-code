import { Provider } from "../../../shared/schema";
import { MapPin, ArrowRight, Clock } from "lucide-react";
import { StarRating } from "./star-rating";
import { Card, CardContent } from "../components/ui/card";

interface ProviderCardProps {
  provider: Provider;
  onClick: () => void;
}

export function ProviderCard({ provider, onClick }: ProviderCardProps) {

  const getGradientClass = (id: number) => {
    const gradients = [
      "from-primary to-secondary",
      "from-secondary to-primary",
      "from-accent to-primary",
      "from-primary to-accent",
      "from-secondary to-accent",
      "from-accent to-secondary"
    ];
    return gradients[id % gradients.length];
  };

  const availabilityText = provider.available
    ? "Available this week"
    : provider.specialization.includes("Speech")
      ? "Next available: Tomorrow"
      : "Next available: Next week";

  const availabilityColor = provider.available ? "bg-secondary" : "bg-accent";

  return (
    <Card
      className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start space-x-4 mb-4">
          <div className={`w-12 h-12 bg-gradient-to-br ${getGradientClass(provider.id)} rounded-lg flex items-center justify-center flex-shrink-0`}>
            <span className="text-white font-semibold text-lg">
              {provider.avatarUrl ?
                <img src={provider.avatarUrl} alt={`${provider.name}'s avatar`} className="w-full h-full rounded-lg object-cover" /> : null}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 group-hover:text-primary transition-colors">
              {provider.name}
            </h3>
            <p className="text-sm text-secondary font-medium">
              {provider.specialization}
            </p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-slate-600">
            <MapPin className="text-slate-400 w-4 h-4 mr-1" />
            <span>{provider.location}</span>
          </div>

          <StarRating
            rating={parseFloat(provider.rating)}
            reviewCount={provider.reviewCount}
          />
        </div>

        <p className="text-sm text-slate-600 line-clamp-2 mb-4">
          {provider.shortDescription}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 ${availabilityColor} rounded-full`}></div>
            <span className="text-xs text-slate-500">{availabilityText}</span>
          </div>
          <span className="text-primary font-medium text-sm group-hover:underline flex items-center">
            View Details <ArrowRight className="ml-1 w-4 h-4" />
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
