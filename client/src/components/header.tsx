import { GraduationCap, Menu } from "lucide-react";
import { Link } from "wouter";
import { Button } from "../components/ui/button";

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
              <div className="flex gap-[10px] items-center">

                <div >
                  <img src="https://media.licdn.com/dms/image/v2/D560BAQHgjlTwZQNjCg/company-logo_200_200/company-logo_200_200/0/1690456261755/habot_connect_logo?e=2147483647&v=beta&t=NFoFVj0bGAwHBLsm3eGBsGSJPH3XodiU_Us7XK-Ii40" style={{ height: "80px" }} />

                </div>
                <div>

                  <h1 className="text-xl font-bold text-slate-900">Lost App</h1>
                </div>
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
