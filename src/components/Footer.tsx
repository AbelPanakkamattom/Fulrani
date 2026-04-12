import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-display font-bold mb-4">Fulrani</h3>
            <p className="text-sm opacity-70 leading-relaxed">
              28+ years of excellence in advertising & marketing. INS Accredited agency trusted by 500+ clients across India.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link to="/about" className="hover:opacity-100 transition-opacity">About Us</Link></li>
              <li><Link to="/services" className="hover:opacity-100 transition-opacity">Services</Link></li>
              <li><Link to="/blog" className="hover:opacity-100 transition-opacity">Blog</Link></li>
              <li><Link to="/contact" className="hover:opacity-100 transition-opacity">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li>Print Media Advertising</li>
              <li>Digital Marketing</li>
              <li>Outdoor Advertising</li>
              <li>Government Tenders</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm opacity-70">
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" /> Mumbai, Pune, Delhi</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /> +91 99999 99999</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /> info@fulrani.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-background/10 mt-8 pt-6 text-center text-sm opacity-50">
          © {new Date().getFullYear()} Fulrani Advertising & Marketing. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
