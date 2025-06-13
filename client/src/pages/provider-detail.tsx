import { useQuery } from "@tanstack/react-query";
import { useRoute, Link, useLocation } from "wouter";
import { Header } from "../components/header";
import { StarRating } from "../components/star-rating";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
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
import { api } from "../lib/api";

export default function ProviderDetailPage() {
  const [match, params] = useRoute('/providers/:id');
  const [, setLocation] = useLocation();
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

  const LoadingSkeleton = () => (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-8 w-8" />
      </div>
      <div className="px-6 py-6">
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
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6">
            <Skeleton className="h-10 w-32" />
          </div>
          <LoadingSkeleton />
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
                 <span className="text-white font-semibold text-lg">
              {provider.avatarUrl ?
                <img src={provider.avatarUrl} alt={`${provider.name}'s avatar`} className="w-full h-full rounded-lg object-cover" /> : null}
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

            {/* About Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">About</h3>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {provider.longDescription}
              </p>
            </div>

            {/* Services & Qualifications */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Services Offered</h3>
                <ul className="space-y-2">
                  {provider.specialization.includes("Dyslexia") && (
                    <>
                      <li className="flex items-center text-slate-600">
                        <Check className="text-secondary mr-3 w-4 h-4" />
                        One-on-one dyslexia tutoring
                      </li>
                      <li className="flex items-center text-slate-600">
                        <Check className="text-secondary mr-3 w-4 h-4" />
                        Reading comprehension support
                      </li>
                      <li className="flex items-center text-slate-600">
                        <Check className="text-secondary mr-3 w-4 h-4" />
                        Study skills development
                      </li>
                      <li className="flex items-center text-slate-600">
                        <Check className="text-secondary mr-3 w-4 h-4" />
                        Parent consultation & training
                      </li>
                    </>
                  )}
                  {provider.specialization.includes("ADHD") && (
                    <>
                      <li className="flex items-center text-slate-600">
                        <Check className="text-secondary mr-3 w-4 h-4" />
                        ADHD coaching sessions
                      </li>
                      <li className="flex items-center text-slate-600">
                        <Check className="text-secondary mr-3 w-4 h-4" />
                        Executive function training
                      </li>
                      <li className="flex items-center text-slate-600">
                        <Check className="text-secondary mr-3 w-4 h-4" />
                        Behavioral intervention plans
                      </li>
                      <li className="flex items-center text-slate-600">
                        <Check className="text-secondary mr-3 w-4 h-4" />
                        Family consultation
                      </li>
                    </>
                  )}
                  {provider.specialization.includes("Speech") && (
                    <>
                      <li className="flex items-center text-slate-600">
                        <Check className="text-secondary mr-3 w-4 h-4" />
                        Articulation therapy
                      </li>
                      <li className="flex items-center text-slate-600">
                        <Check className="text-secondary mr-3 w-4 h-4" />
                        Language development
                      </li>
                      <li className="flex items-center text-slate-600">
                        <Check className="text-secondary mr-3 w-4 h-4" />
                        Communication skills training
                      </li>
                      <li className="flex items-center text-slate-600">
                        <Check className="text-secondary mr-3 w-4 h-4" />
                        Parent education
                      </li>
                    </>
                  )}
                  {provider.specialization.includes("Autism") && (
                    <>
                      <li className="flex items-center text-slate-600">
                        <Check className="text-secondary mr-3 w-4 h-4" />
                        ABA therapy sessions
                      </li>
                      <li className="flex items-center text-slate-600">
                        <Check className="text-secondary mr-3 w-4 h-4" />
                        Social skills development
                      </li>
                      <li className="flex items-center text-slate-600">
                        <Check className="text-secondary mr-3 w-4 h-4" />
                        Behavioral support plans
                      </li>
                      <li className="flex items-center text-slate-600">
                        <Check className="text-secondary mr-3 w-4 h-4" />
                        Family training & support
                      </li>
                    </>
                  )}
                  {(provider.specialization.includes("Learning") || provider.specialization.includes("Educational")) && (
                    <>
                      <li className="flex items-center text-slate-600">
                        <Check className="text-secondary mr-3 w-4 h-4" />
                        Learning assessments
                      </li>
                      <li className="flex items-center text-slate-600">
                        <Check className="text-secondary mr-3 w-4 h-4" />
                        Academic coaching
                      </li>
                      <li className="flex items-center text-slate-600">
                        <Check className="text-secondary mr-3 w-4 h-4" />
                        Study strategies training
                      </li>
                      <li className="flex items-center text-slate-600">
                        <Check className="text-secondary mr-3 w-4 h-4" />
                        Educational planning
                      </li>
                    </>
                  )}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Qualifications</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-slate-600">
                    <GraduationCap className="text-primary mr-3 w-4 h-4" />
                    M.Ed. Special Education
                  </li>
                  <li className="flex items-center text-slate-600">
                    <IdCard className="text-primary mr-3 w-4 h-4" />
                    {provider.specialization.includes("Dyslexia") && "Orton-Gillingham Certified"}
                    {provider.specialization.includes("ADHD") && "Licensed Psychologist"}
                    {provider.specialization.includes("Speech") && "CCC-SLP Certified"}
                    {provider.specialization.includes("Autism") && "BCBA Certified"}
                    {(provider.specialization.includes("Learning") || provider.specialization.includes("Educational")) && "Licensed Educational Psychologist"}
                  </li>
                  <li className="flex items-center text-slate-600">
                    <Award className="text-primary mr-3 w-4 h-4" />
                    {provider.name.includes("Dr.") ? "10+" : "8+"} years experience
                  </li>
                  <li className="flex items-center text-slate-600">
                    <Users className="text-primary mr-3 w-4 h-4" />
                    {provider.reviewCount * 5}+ children helped
                  </li>
                </ul>
              </div>
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

          {/* Footer */}
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
                Book Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
