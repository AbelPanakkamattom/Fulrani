import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CounterStat from "@/components/CounterStat";
import SEO from "@/components/SEO";
import { Award, Users, Globe, Briefcase, UserCircle } from "lucide-react";

const values = [
  { icon: Award, title: "Integrity", desc: "We maintain the highest standards of professionalism and transparency." },
  { icon: Users, title: "Client-Centric", desc: "Your goals drive our strategy — every campaign is tailored to your needs." },
  { icon: Globe, title: "Innovation", desc: "We stay ahead with cutting-edge marketing solutions and creative thinking." },
  { icon: Briefcase, title: "Results-Driven", desc: "Every rupee you invest is optimized for maximum ROI and brand impact." },
];

export default function About() {
  return (
    <>
      <SEO
        title="About Fulrani Advertising - 28+ Years of Excellence in India"
        description="Discover Fulrani Advertising's journey — 28 years of trusted excellence as an INS accredited advertisement agency. Our mission, values, and commitment to serving 500+ clients with integrity and innovation."
        keywords="Fulrani history, about Fulrani, INS accredited agency, advertising company India, Fulrani teams, advertising agency excellence, professional advertising services"
        path="/about"
      />
      <Navbar />
      <main>
        <section className="py-20 bg-accent/20">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">About Fulrani</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">28+ years of trusted excellence in advertising and marketing across India.</p>
          </div>
        </section>

        <section className="py-20">
          <div className="container grid lg:grid-cols-2 gap-12 items-center">
            <img src="/about-team.jpg" alt="Fulrani advertising team at work" />
            <div className="space-y-5">
              <h2 className="text-3xl font-display font-bold">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed">
                Founded in 1997, Fulrani Advertising & Marketing has grown from a small agency in Mumbai to a PAN India powerhouse. With INS accreditation and 500+ satisfied clients, we specialize in print media, digital marketing, outdoor advertising, and government tenders.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our client portfolio spans Government bodies, Defence establishments, Banks, Real Estate developers, and Educational institutions. We combine creative thinking with strategic execution to deliver campaigns that leave a lasting impact.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-primary text-primary-foreground">
          <div className="container grid grid-cols-2 md:grid-cols-4 gap-6">
            <CounterStat end={500} suffix="+" label="Clients" />
            <CounterStat end={28} suffix="+" label="Years" />
            <CounterStat end={1000} suffix="+" label="Campaigns" />
            <CounterStat end={3} label="Offices" />
          </div>
        </section>

        {/* Our Team */}
        <section className="py-20 bg-accent/20">
          <div className="container">
            <h2 className="text-3xl font-display font-bold text-center mb-2">Our Team</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Meet the experienced professionals who drive Fulrani's success and innovation in the advertising industry.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                { name: "Mrs. Vidya Deepak Shedge", role: "Proprietor & Founder", location: "Mumbai" },
                { name: "Deepak Shedge", role: "CEO and Creative Head", location: "Mumbai" },
                { name: "Santosh Balan", role: "Consultant Marketing and PR", location: "Mumbai" },
                { name: "Murli", role: "Chief Marketing & Creative Consultant", location: "Mumbai" },
                { name: "Vijay Pawar", role: "Associate Creative Director", location: "Mumbai" },
                { name: "Sanvedana Deepak Shedge", role: "Chief Manager", location: "Mumbai" },
                { name: "Vishwanath Bhau Dongre", role: "Sr. Media Manager", location: "Mumbai" },
                { name: "Sagar Shedge", role: "Business Development Manager", location: "Mumbai" },
                { name: "Rajesh Shrivastav", role: "Client Servicing Head", location: "Mumbai" },
                { name: "Charudutta Shedge", role: "Client Servicing Head", location: "Mumbai" },
                { name: "Kritirani Paitha", role: "Media Co-ordinator", location: "Mumbai" },
              ].map((member) => (
                <div key={member.name} className="bg-card rounded-xl p-4 md:p-6 shadow-card text-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-accent mx-auto mb-3 flex items-center justify-center overflow-hidden">
                    <UserCircle className="h-16 w-16 md:h-20 md:w-20 text-muted-foreground/40" />
                  </div>
                  <h3 className="font-semibold text-sm md:text-base leading-tight">{member.name}</h3>
                  <p className="text-xs md:text-sm text-primary mt-1">{member.role}</p>
                  <p className="text-xs text-muted-foreground mt-1">{member.location}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <h2 className="text-3xl font-display font-bold text-center mb-12">Our Values</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v) => (
                <div key={v.title} className="bg-card rounded-xl p-6 shadow-card text-center">
                  <v.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
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
