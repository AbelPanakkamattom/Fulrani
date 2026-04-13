import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { LogOut, FileText, Video, Image } from "lucide-react";
import Navbar from "@/components/Navbar";
import BlogManager from "@/components/admin/BlogManager";
import VideoManager from "@/components/admin/VideoManager";
import ImageManager from "@/components/admin/ImageManager";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate("/admin");
      } else {
        setAuthenticated(true);
      }
    });
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Logged out" });
    navigate("/admin");
  };

  if (!authenticated) return null;

  return (
    <>
      <Navbar />
      <main className="py-8">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground text-sm">Manage blogs, videos, and images</p>
            </div>
            <Button variant="outline" onClick={handleLogout}><LogOut className="h-4 w-4 mr-2" /> Logout</Button>
          </div>

          <Tabs defaultValue="blogs">
            <TabsList className="mb-6">
              <TabsTrigger value="blogs" className="gap-2"><FileText className="h-4 w-4" /> Blogs</TabsTrigger>
              <TabsTrigger value="videos" className="gap-2"><Video className="h-4 w-4" /> Videos</TabsTrigger>
              <TabsTrigger value="images" className="gap-2"><Image className="h-4 w-4" /> Images</TabsTrigger>
            </TabsList>
            <TabsContent value="blogs"><BlogManager /></TabsContent>
            <TabsContent value="videos"><VideoManager /></TabsContent>
            <TabsContent value="images"><ImageManager /></TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
}
