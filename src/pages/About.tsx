import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CounterStat from "@/components/CounterStat";
import SEO from "@/components/SEO";
import aboutTeam from "@/assets/about-team.jpg";
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
        title="About Fulrani Advertisement Agency"
        description="Fulrani Advertising & Marketing — 28+ years as India's trusted advertisement agency. INS accredited digital marketing company with 500+ clients across Mumbai, Pune, Delhi."
        keywords="about Fulrani, Fulrani advertising company, advertisement agency history, Fulrani digital marketing, INS accredited ad agency India"
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
            <img src={aboutTeam} alt="Fulrani advertising team at work" className="rounded-2xl shadow-elevated object-cover w-full h-[400px]" />
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
