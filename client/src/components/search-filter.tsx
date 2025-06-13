import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
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
    setSpecialization(value);
    onSearch(searchQuery, value);
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
            <Select value={specialization} onValueChange={handleSpecializationChange} disabled={isLoading}>
              <SelectTrigger className="w-full sm:w-[200px] border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                <SelectValue placeholder="All Specializations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Specializations</SelectItem>
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
