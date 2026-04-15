import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }
    setSending(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      message: form.message.trim(),
    });
    setSending(false);
    if (error) {
      toast({ title: "Failed to send message", variant: "destructive" });
    } else {
      toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
      setForm({ name: "", email: "", phone: "", message: "" });
    }
  };

  return (
    <>
      <SEO
        title="Contact Fulrani Advertisement Agency"
        description="Contact Fulrani Advertising — India's top advertisement agency. Offices in Mumbai, Pune & Delhi. Call +91 9773016354 for ads, digital marketing, print media advertising enquiries."
        keywords="contact Fulrani, advertisement agency contact, advertising company Mumbai contact, Fulrani phone number, ads agency near me, digital marketing company contact"
        path="/contact"
      />
      <Navbar />
      <main>
        <section className="py-20 bg-accent/20">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Contact Us</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">Let's discuss your next big campaign. Reach out and we'll respond within 24 hours.</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-display font-bold mb-6">Get in Touch</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input placeholder="Full Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} />
                <Input type="email" placeholder="Email Address *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} />
                <Input placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={20} />
                <Textarea placeholder="Your Message *" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} maxLength={1000} />
                <Button type="submit" size="lg" className="w-full" disabled={sending}>{sending ? "Sending..." : "Send Message"}</Button>
              </form>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-display font-bold mb-6">Our Offices</h2>
              {[
                { city: "Mumbai (Head Office)", address: "D-33, Penta Galaxy, S.M Road, Wadala East, Mumbai - 400037", phone: "+91 9773016354" },
                { city: "Pune", address: "456 Tech Park, Hinjewadi, Pune - 411057", phone: "+91 20 9876 5432" },
                { city: "Delhi", address: "789 Corporate Tower, Connaught Place, Delhi - 110001", phone: "+91 11 2345 6789" },
              ].map((o) => (
                <div key={o.city} className="bg-card rounded-xl p-5 shadow-card">
                  <h3 className="font-semibold text-primary mb-2">{o.city}</h3>
                  <p className="text-sm text-muted-foreground flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" />{o.address}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1"><Phone className="h-4 w-4 shrink-0" />{o.phone}</p>
                </div>
              ))}
              <div className="bg-card rounded-xl p-5 shadow-card">
                <div className="flex items-center gap-2 mb-2"><Mail className="h-4 w-4 text-primary" /><span className="text-sm">info@fulrani.com</span></div>
                <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /><span className="text-sm text-muted-foreground">Mon–Sat: 9:00 AM – 6:00 PM</span></div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
