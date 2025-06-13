# Component and Page Files (Part 3)

## File: client/src/components/header.tsx
```typescript
import { GraduationCap, Menu } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="text-white text-lg" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Habot Connect</h1>
                <p className="text-xs text-slate-500">Learning Support Directory</p>
              </div>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-slate-600 hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/providers" className="text-primary font-medium">
              Find Providers
            </Link>
            <a href="#" className="text-slate-600 hover:text-primary transition-colors">
              About
            </a>
            <a href="#" className="text-slate-600 hover:text-primary transition-colors">
              Contact
            </a>
          </nav>
          
          <Button variant="ghost" size="sm" className="md:hidden p-2 text-slate-600 hover:text-primary">
            <Menu className="text-lg" />
          </Button>
        </div>
      </div>
    </header>
  );
}
```

## File: client/src/components/star-rating.tsx
```typescript
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  showReviews?: boolean;
}

export function StarRating({ rating, reviewCount, showReviews = true }: StarRatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.floor(rating);
    const partial = i === Math.floor(rating) && rating % 1 !== 0;
    
    return (
      <Star
        key={i}
        className={`text-sm ${
          filled ? "text-accent fill-current" : 
          partial ? "text-accent fill-current opacity-50" : 
          "text-slate-300"
        }`}
      />
    );
  });

  return (
    <div className="flex items-center space-x-1">
      <div className="flex">{stars}</div>
      <span className="text-sm font-medium text-slate-700 ml-2">{rating}</span>
      {showReviews && reviewCount && (
        <>
          <span className="text-sm text-slate-500">·</span>
          <span className="text-sm text-slate-500">{reviewCount} reviews</span>
        </>
      )}
    </div>
  );
}
```

## File: client/src/components/search-filter.tsx
```typescript
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SearchFilterProps {
  onSearch: (query: string, specialization: string) => void;
  isLoading?: boolean;
}

export function SearchFilter({ onSearch, isLoading }: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [specialization, setSpecialization] = useState("");

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch(value, specialization);
  };

  const handleSpecializationChange = (value: string) => {
    const filterValue = value === "all" ? "" : value;
    setSpecialization(filterValue);
    onSearch(searchQuery, filterValue);
  };

  return (
    <section className="mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Find the Right Learning Support</h2>
          <p className="text-slate-600">Connect with qualified professionals who can help your child thrive</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Search by name or specialization..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              disabled={isLoading}
              className="pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          </div>
          
          <div className="relative">
            <Select value={specialization || "all"} onValueChange={handleSpecializationChange} disabled={isLoading}>
              <SelectTrigger className="w-full sm:w-[200px] border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                <SelectValue placeholder="All Specializations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specializations</SelectItem>
                <SelectItem value="dyslexia">Dyslexia Support</SelectItem>
                <SelectItem value="adhd">ADHD Coaching</SelectItem>
                <SelectItem value="autism">Autism Support</SelectItem>
                <SelectItem value="speech">Speech Therapy</SelectItem>
                <SelectItem value="learning">Learning Disabilities</SelectItem>
                <SelectItem value="educational">Educational Psychology</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </section>
  );
}
```

## File: client/src/components/provider-card.tsx
```typescript
import { Provider } from "@shared/schema";
import { MapPin, ArrowRight } from "lucide-react";
import { StarRating } from "./star-rating";
import { Card, CardContent } from "@/components/ui/card";

interface ProviderCardProps {
  provider: Provider;
  onClick: () => void;
}

export function ProviderCard({ provider, onClick }: ProviderCardProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

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
              {getInitials(provider.name)}
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
```

## File: client/src/pages/providers.tsx
```typescript
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Header } from "@/components/header";
import { SearchFilter } from "@/components/search-filter";
import { ProviderCard } from "@/components/provider-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Search, RefreshCw } from "lucide-react";
import { api } from "@/lib/api";

export default function ProvidersPage() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [sortBy, setSortBy] = useState("rating");

  const { 
    data: providers = [], 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['/api/providers', searchQuery, specialization],
    queryFn: () => api.searchProviders(searchQuery, specialization),
  });

  const handleSearch = (query: string, spec: string) => {
    setSearchQuery(query);
    setSpecialization(spec);
  };

  const handleProviderClick = (providerId: number) => {
    setLocation(`/providers/${providerId}`);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSpecialization("");
  };

  const sortedProviders = [...providers].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return parseFloat(b.rating) - parseFloat(a.rating);
      case "name":
        return a.name.localeCompare(b.name);
      case "location":
        return a.location.localeCompare(b.location);
      default:
        return 0;
    }
  });

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-start space-x-4 mb-4">
            <Skeleton className="w-12 h-12 rounded-lg" />
            <div className="flex-1">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
          <Skeleton className="h-3 w-full mb-2" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      ))}
    </div>
  );

  const ErrorState = () => (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="text-red-500 text-xl" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Something went wrong</h3>
        <p className="text-slate-600 mb-4">We couldn't load the providers. Please try again.</p>
        <Button onClick={() => refetch()} className="bg-primary text-white hover:bg-blue-600">
          <RefreshCw className="mr-2 w-4 h-4" />
          Try Again
        </Button>
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search className="text-slate-400 text-xl" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">No providers found</h3>
        <p className="text-slate-600 mb-4">Try adjusting your search criteria or filters.</p>
        <Button onClick={clearSearch} className="bg-primary text-white hover:bg-blue-600">
          Clear Search
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchFilter onSearch={handleSearch} isLoading={isLoading} />

        <section className="mb-6">
          <div className="flex justify-between items-center">
            <p className="text-slate-600">
              {sortedProviders.length} providers found
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-500">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="location">Location</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        <section>
          {error ? (
            <ErrorState />
          ) : isLoading ? (
            <LoadingSkeleton />
          ) : sortedProviders.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProviders.map((provider) => (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  onClick={() => handleProviderClick(provider.id)}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
```

## File: client/src/pages/provider-detail.tsx
```typescript
import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Header } from "@/components/header";
import { StarRating } from "@/components/star-rating";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  ArrowLeft, 
  MapPin, 
  Mail, 
  Phone, 
  Check, 
  GraduationCap, 
  IdCard, 
  Award, 
  Users,
  Heart,
  Calendar,
  AlertCircle
} from "lucide-react";
import { api } from "@/lib/api";

export default function ProviderDetailPage() {
  const [match, params] = useRoute('/providers/:id');
  const providerId = params?.id ? parseInt(params.id) : null;

  const { data: provider, isLoading, error } = useQuery({
    queryKey: ['/api/providers', providerId],
    queryFn: () => providerId ? api.getProvider(providerId) : null,
    enabled: !!providerId,
  });

  if (!providerId) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Invalid Provider ID</h1>
            <Link href="/providers">
              <Button className="bg-primary text-white hover:bg-blue-600">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Providers
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (error || (!isLoading && !provider)) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Provider Not Found</h1>
            <p className="text-slate-600 mb-4">The provider you're looking for doesn't exist.</p>
            <Link href="/providers">
              <Button className="bg-primary text-white hover:bg-blue-600">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Providers
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6">
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-start space-x-6 mb-8">
              <Skeleton className="w-20 h-20 rounded-xl" />
              <div className="flex-1">
                <Skeleton className="h-8 w-64 mb-2" />
                <Skeleton className="h-6 w-48 mb-3" />
                <Skeleton className="h-4 w-32 mb-4" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!provider) return null;

  const availabilityText = provider.available 
    ? "Available this week" 
    : provider.specialization.includes("Speech") 
      ? "Next available: Tomorrow"
      : "Next available: Next week";

  const availabilityColor = provider.available ? "bg-secondary" : "bg-accent";

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/providers">
            <Button variant="ghost" className="text-slate-600 hover:text-slate-800">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to List
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Provider Details</h2>
          </div>

          <div className="px-6 py-6">
            <div className="flex items-start space-x-6 mb-8">
              <div className={`w-20 h-20 bg-gradient-to-br ${getGradientClass(provider.id)} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <span className="text-white font-bold text-2xl">
                  {getInitials(provider.name)}
                </span>
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-slate-900 mb-2">{provider.name}</h1>
                <p className="text-lg text-secondary font-medium mb-3">{provider.specialization}</p>
                
                <div className="flex items-center space-x-4 mb-4">
                  <StarRating 
                    rating={parseFloat(provider.rating)} 
                    reviewCount={provider.reviewCount}
                  />
                  
                  <div className="flex items-center text-slate-600">
                    <MapPin className="text-slate-400 mr-2 w-4 h-4" />
                    <span>{provider.location}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 ${availabilityColor} rounded-full`}></div>
                  <span className="text-sm text-slate-600">{availabilityText}</span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">About</h3>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {provider.longDescription}
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Contact Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <Mail className="text-white w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <p className="font-medium text-slate-900">{provider.contactEmail}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                    <Phone className="text-white w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Phone</p>
                    <p className="font-medium text-slate-900">{provider.phoneNumber}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 px-6 py-4 flex items-center justify-between rounded-b-xl">
            <Link href="/providers">
              <Button variant="ghost" className="text-slate-600 hover:text-slate-800">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to List
              </Button>
            </Link>
            <div className="flex space-x-3">
              <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
                <Heart className="mr-2 w-4 h-4" />
                Save
              </Button>
              <Button className="bg-primary text-white hover:bg-blue-600">
                <Calendar className="mr-2 w-4 h-4" />
                Contact Provider
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## File: client/src/pages/not-found.tsx
```typescript
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="text-slate-400 w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-slate-700 mb-4">Page Not Found</h2>
        <p className="text-slate-600 mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/providers">
          <Button className="bg-primary text-white hover:bg-blue-600">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Providers
          </Button>
        </Link>
      </div>
    </div>
  );
}
```

## Continue in next message for server files...