import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Newspaper, Monitor, Megaphone, FileText, Palette, BarChart3, ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";

const services = [
  { icon: Newspaper, title: "Print Media Advertising", desc: "Newspaper ads, magazine placements, and classified advertising across all leading publications in India." },
  { icon: Monitor, title: "Digital Marketing", desc: "SEO, social media marketing, Google Ads, email campaigns, and complete online brand management." },
  { icon: Megaphone, title: "Outdoor Advertising", desc: "Hoardings, billboards, bus shelters, transit media, and large-format OOH campaigns across India." },
  { icon: FileText, title: "Government Tenders", desc: "Specialized advertising for government and PSU tender notices, public announcements, and recruitment ads." },
  { icon: Palette, title: "Creative Design", desc: "Logo design, brand identity, brochures, catalogues, packaging design, and corporate collateral." },
  { icon: BarChart3, title: "Media Planning & Buying", desc: "Strategic media planning, rate negotiation, and cost-effective ad placement across all media channels." },
];

export default function Services() {
  return (
    <>
      <SEO
        title="Advertisement & Digital Marketing Services"
        description="Fulrani advertising services — print media ads, digital marketing, outdoor advertising, government tender ads, creative design & media planning. Best advertisement company for all ad needs."
        keywords="advertisement services, advertising services India, digital marketing services, print ads, outdoor advertising, government tender advertising, Fulrani services, ads company services, media planning"
        path="/services"
      />
      <Navbar />
      <main>
        <section className="py-20 bg-accent/20">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Our Services</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">Comprehensive advertising & marketing solutions for every industry and budget.</p>
          </div>
        </section>

        <section className="py-20">
          <div className="container grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s) => (
              <div key={s.title} className="bg-card rounded-xl p-8 shadow-card hover:shadow-elevated transition-shadow group">
                <s.icon className="h-12 w-12 text-primary mb-5 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 bg-primary text-primary-foreground text-center">
          <div className="container space-y-4">
            <h2 className="text-3xl font-display font-bold">Ready to Elevate Your Brand?</h2>
            <p className="opacity-80 max-w-lg mx-auto">Let's discuss how Fulrani can help you reach your target audience with impact.</p>
            <Link to="/contact"><Button variant="secondary" size="lg">Get a Free Consultation <ArrowRight className="ml-1 h-4 w-4" /></Button></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
