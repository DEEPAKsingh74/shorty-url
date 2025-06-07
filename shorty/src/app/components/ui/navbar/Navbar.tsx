import Link from "next/link";
import {
  FaLink,
  FaChartLine,
} from "react-icons/fa";
import MobileMenu from "./MobileMenu";
import MobileMenuButton from "./MobileMenuButton";
import AuthMenu from "./AuthMenu";

const Navbar = () => {

  return (
    <header
      className={`w-full z-50 transition-all duration-300 bg-white/90 backdrop-blur-sm py-4`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <FaLink className="h-6 w-6 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                TinyURL
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link
              href="#tool-info"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Features
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors flex items-center"
            >
              <FaChartLine className="mr-1" /> Dashboard
            </Link>
            <Link
              href="/pricing"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Pricing
            </Link>
            
            <AuthMenu/>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <MobileMenuButton />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileMenu />

    </header>
  );
};

export default Navbar;
