import { Link } from "react-router-dom";
import { ArrowRight, Award, MapPin, Target, Building2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import CounterStat from "@/components/CounterStat";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import heroBanner from "@/assets/hero-banner.jpg";

const whyChooseUs = [
  { icon: Award, title: "INS Accreditation", desc: "Officially recognized for authenticity, professionalism, and reliability in media and advertising services." },
  { icon: MapPin, title: "PAN India Presence", desc: "Offices in Mumbai, Pune, and Delhi — local expertise with national reach for metro or regional campaigns." },
  { icon: Building2, title: "Sector-Wide Expertise", desc: "From defence awareness drives to bank promotions, government initiatives to real estate launches." },
  { icon: Target, title: "Impactful Communication", desc: "Every campaign is built to inform, inspire, and influence — creating messages that leave a lasting impression." },
];


const offices = [
  { city: "Mumbai", address: "D-33, Penta Galaxy, S.M Road, Wadala East, Mumbai - 400037", phone: "+91 9773016354" },
  { city: "Pune", address: "456 Tech Park, Hinjewadi, Pune - 411057", phone: "+91 20 9876 5432" },
  { city: "Delhi", address: "789 Corporate Tower, Connaught Place, Delhi - 110001", phone: "+91 11 2345 6789" },
];

export default function Index() {
  return (
    <>
      <SEO
        title="Fulrani Advertising Agency | Best Advertisement Company in India | Digital Marketing"
        description="Fulrani — India's top advertisement agency & digital marketing company since 1997. INS accredited ads agency offering print advertising, outdoor ads, digital marketing. 500+ clients in Mumbai, Pune, Delhi."
        keywords="Fulrani, Fulrani advertising, advertisement, advertisement company, advertising agency, ads agency, Fulrani advertisement agency, digital marketing company, best advertisement company India, advertising company Mumbai, ad agency near me"
        path="/"
      />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-accent/30 min-h-[80vh] flex items-center">
          <div className="container grid lg:grid-cols-2 gap-10 py-16">
            <div className="flex flex-col justify-center space-y-6">
              <p className="text-sm font-medium text-primary tracking-wide uppercase">Serving Since 1997 | INS Accredited</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
                India's Trusted <span className="text-gradient">Advertisement Agency</span> & Digital Marketing Company
              </h1>
              <p className="text-muted-foreground text-lg max-w-md">
                Fulrani Advertising — INS accredited ads agency trusted by 500+ clients. Print media advertising, digital marketing, outdoor ads & government tender advertising across India.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/services"><Button size="lg">Explore Our Ad Services <ArrowRight className="ml-1 h-4 w-4" /></Button></Link>
                <Link to="/contact"><Button size="lg" variant="outline">Get Free Ad Consultation</Button></Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <img src={heroBanner} alt="Fulrani Advertising team collaborating on marketing strategies" className="rounded-2xl shadow-elevated object-cover w-full h-[480px]" />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 border-b">
          <div className="container grid grid-cols-3 gap-6">
            <CounterStat end={500} suffix="+" label="Clients" />
            <CounterStat end={28} suffix="+" label="Years Experience" />
            <CounterStat end={1000} suffix="+" label="Campaigns Delivered" />
          </div>
        </section>

        {/* CTA banner */}
        <section className="py-10 bg-primary text-primary-foreground">
          <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-lg font-medium text-center md:text-left">Once we receive your consult request we match you up with a planner aligned to your goals.</p>
            <Link to="/contact"><Button variant="secondary" size="lg">Join Now</Button></Link>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">Why Choose Fulrani Advertisement Agency?</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              At Fulrani Advertising & Marketing, we don't just create ads — we build trust, visibility, and impact as India's leading advertisement company and digital marketing agency.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyChooseUs.map((item) => (
                <div key={item.title} className="bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-shadow">
                  <item.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-accent/20">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">What Clients Say About Fulrani Ads</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div key={t.name} className="bg-card rounded-xl p-6 shadow-card">
                  <div className="flex gap-1 text-primary mb-3">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-primary" />)}</div>
                  <p className="text-sm text-muted-foreground italic mb-4">"{t.text}"</p>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">Client</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pan India */}
        <section className="py-20">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">Fulrani Advertising — Pan India Advertisement Agency</h2>
            <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">Strategic offices in Mumbai, Pune & Delhi for comprehensive advertising coverage across India.</p>
            <div className="grid md:grid-cols-3 gap-6">
              {offices.map((o) => (
                <div key={o.city} className="bg-card rounded-xl p-6 shadow-card text-center">
                  <Building2 className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-lg mb-2">{o.city}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{o.address}</p>
                  <p className="text-sm text-primary font-medium">{o.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
