import { useState } from "react";
import { authStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  if (authStore.isLoggedIn()) {
    navigate("/admin/dashboard");
    return null;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (authStore.login(email, password)) {
      toast({ title: "Welcome back, Admin!" });
      navigate("/admin/dashboard");
    } else {
      toast({ title: "Invalid credentials", variant: "destructive" });
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-[80vh] flex items-center justify-center py-16">
        <div className="bg-card rounded-2xl shadow-elevated p-8 w-full max-w-md mx-4">
          <div className="text-center mb-6">
            <div className="h-14 w-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-2xl font-display font-bold">Admin Login</h1>
            <p className="text-sm text-muted-foreground mt-1">Access the Fulrani admin panel</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <Button type="submit" className="w-full" size="lg">Sign In</Button>
          </form>
          <p className="text-xs text-muted-foreground text-center mt-4">Demo: admin@fulrani.com / fulrani2024</p>
        </div>
      </main>
    </>
  );
}
