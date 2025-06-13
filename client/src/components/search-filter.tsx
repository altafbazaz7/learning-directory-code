import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "..//components/ui/select";

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
    <section className="mb-8 border border-black" style={{ border: "2px solid #E5E7EB" }}>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Find the Right Learning Support</h2>
          <p className="text-slate-600">Connect with qualified professionals who can help your child thrive</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
          <div className="flex-1 relative f">
            <Input
              type="text"
              placeholder="Search by name or specialization..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              disabled={isLoading}
              style={{ border: "2px solid #E5E7EB", padding: "0.75rem 1rem", fontSize: "0.875rem" }}
              className="pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all "
            />
          </div>

            <div className="relative" style={{ border: "2px solid #E5E7EB", borderRadius: "0.5rem" , fontSize: "0.775rem" }}>
            <Select
              value={specialization}
              onValueChange={handleSpecializationChange}
              disabled={isLoading}
            >
              <SelectTrigger
                className="w-full sm:w-[200px] border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary pl-4 cursor-pointer transition-transform duration-200 hover:scale-105"
                style={{ paddingLeft: "1rem", cursor: "pointer" }}
              >
                <SelectValue placeholder="All Specializations" />
              </SelectTrigger>
              <SelectContent
                style={{
                  backgroundColor: "white",
                  borderRadius: "0.5rem",
                  border: "2px solid #E5E7EB",
                  zIndex: 1000,
                  transition: "opacity 0.3s ease, transform 0.3s cubic-bezier(0.4,0,0.2,1)",
                  opacity: 1,
                  transform: "translateY(0)",
                }}
                className="transition-all duration-300 ease-in-out pl-[10px]"
              >
                <SelectItem value="all" className="cursor-pointer transition-colors duration-150 hover:bg-slate-100">All Specializations</SelectItem>
                <SelectItem value="dyslexia" className="cursor-pointer transition-colors duration-150 hover:bg-slate-100">Dyslexia Support</SelectItem>
                <SelectItem value="adhd" className="cursor-pointer transition-colors duration-150 hover:bg-slate-100">ADHD Coaching</SelectItem>
                <SelectItem value="autism" className="cursor-pointer transition-colors duration-150 hover:bg-slate-100">Autism Support</SelectItem>
                <SelectItem value="speech" className="cursor-pointer transition-colors duration-150 hover:bg-slate-100">Speech Therapy</SelectItem>
                <SelectItem value="learning" className="cursor-pointer transition-colors duration-150 hover:bg-slate-100">Learning Disabilities</SelectItem>
                <SelectItem value="educational" className="cursor-pointer transition-colors duration-150 hover:bg-slate-100">Educational Psychology</SelectItem>
              </SelectContent>
            </Select>
            </div>
        </div>
      </div>
    </section>
  );
}
