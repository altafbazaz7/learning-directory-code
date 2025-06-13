import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Header } from "../components/header";
import { SearchFilter } from "../components/search-filter";
import { ProviderCard } from "../components/provider-card";
import { Skeleton } from "../components/ui/skeleton";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { AlertCircle, Search, RefreshCw } from "lucide-react";
import { api } from "../lib/api";
import { Provider } from "../../../shared/schema";

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
           <div className="flex items-center space-x-4 border border-slate-300 rounded-md p-2 bg-white shadow-sm">
  <span className="text-sm text-slate-500">Sort by:</span>
  <Select value={sortBy} onValueChange={setSortBy}>
    <SelectTrigger
      className="w-32 bg-white border border-slate-300 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-primary focus:border-primary"
      style={{ zIndex: 20 }}
    >
      <SelectValue />
    </SelectTrigger>
    <SelectContent
      className="bg-white border border-slate-300 shadow-lg animate-fade-in"
      style={{ zIndex: 30, animation: "fadeIn 0.2s ease" }}
    >
      <SelectItem className="cursor-pointer transition-colors duration-150 hover:bg-slate-100" value="rating">
        Rating
      </SelectItem>
      <SelectItem className="cursor-pointer transition-colors duration-150 hover:bg-slate-100" value="name">
        Name
      </SelectItem>
      <SelectItem className="cursor-pointer transition-colors duration-150 hover:bg-slate-100" value="location">
        Location
      </SelectItem>
    </SelectContent>
    <style>
      {`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}
    </style>
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

      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <i className="fas fa-graduation-cap text-white"></i>
                </div>
                <span className="text-lg font-bold text-slate-900">Habot Connect</span>
              </div>
              <p className="text-slate-600 max-w-md">
                Connecting families with qualified learning support professionals to help every child reach their full potential.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-600 hover:text-primary transition-colors">Find Providers</a></li>
                <li><a href="#" className="text-slate-600 hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="text-slate-600 hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="text-slate-600 hover:text-primary transition-colors">Help Center</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-600 hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-slate-600 hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-slate-600 hover:text-primary transition-colors">Safety</a></li>
                <li><a href="#" className="text-slate-600 hover:text-primary transition-colors">Accessibility</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-200 mt-8 pt-8 text-center text-slate-500">
            <p>&copy; 2024 Habot Connect DMCC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
