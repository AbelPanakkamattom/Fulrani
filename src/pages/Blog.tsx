import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogStore, videoStore, type BlogPost, type VideoPost } from "@/lib/store";
import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [videos, setVideos] = useState<VideoPost[]>([]);

  useEffect(() => {
    setBlogs(blogStore.getAll());
    setVideos(videoStore.getAll());
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <section className="py-20 bg-accent/20">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Blog & Media</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">Stay updated with our latest insights, campaigns, and industry news.</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            <Tabs defaultValue="blogs">
              <TabsList className="mb-8">
                <TabsTrigger value="blogs">Blog Posts</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
              </TabsList>

              <TabsContent value="blogs">
                {blogs.length === 0 ? (
                  <p className="text-center text-muted-foreground py-12">No blog posts yet. Check back soon!</p>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map((b) => (
                      <article key={b.id} className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow">
                        {b.image && <img src={b.image} alt={b.title} className="w-full h-48 object-cover" />}
                        <div className="p-5">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                            <Calendar className="h-3 w-3" />
                            {new Date(b.date).toLocaleDateString()}
                          </div>
                          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{b.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-3">{b.excerpt}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="videos">
                {videos.length === 0 ? (
                  <p className="text-center text-muted-foreground py-12">No videos yet. Check back soon!</p>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((v) => (
                      <div key={v.id} className="bg-card rounded-xl overflow-hidden shadow-card">
                        <div className="aspect-video">
                          <iframe
                            src={v.url.replace("watch?v=", "embed/")}
                            title={v.title}
                            className="w-full h-full"
                            allowFullScreen
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold mb-1">{v.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{v.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
