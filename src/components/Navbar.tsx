import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/fulrani-logo.png";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Blog", path: "/blog" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 glass-surface border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Fulrani Logo" className="h-10 w-auto" />
          <span className="hidden sm:block text-xs text-muted-foreground leading-tight">Advertising<br/>& Marketing</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                pathname === item.path
                  ? "text-primary bg-accent"
                  : "text-foreground/70 hover:text-primary hover:bg-accent/50"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+919999999999" className="flex items-center gap-1 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            +91 99999 99999
          </a>
          <Link to="/admin">
            <Button size="sm" variant="outline" className="text-xs">Admin</Button>
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden p-2">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="lg:hidden border-t bg-card p-4 space-y-1">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2 text-sm font-medium rounded-md ${
                pathname === item.path ? "text-primary bg-accent" : "text-foreground/70"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/admin" onClick={() => setOpen(false)}>
            <Button size="sm" variant="outline" className="mt-2 w-full text-xs">Admin Login</Button>
          </Link>
        </nav>
      )}
    </header>
  );
}
