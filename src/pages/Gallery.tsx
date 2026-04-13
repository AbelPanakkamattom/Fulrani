import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type ImageItem = { id: string; title: string; image_url: string; caption: string | null; category: string | null; created_at: string };

export default function Gallery() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [selected, setSelected] = useState<ImageItem | null>(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    supabase.from("images").select("*").order("created_at", { ascending: false }).then(({ data }) => setImages(data || []));
  }, []);

  const categories = ["All", ...Array.from(new Set(images.map((i) => i.category).filter(Boolean)))];
  const filtered = filter === "All" ? images : images.filter((i) => i.category === filter);

  return (
    <>
      <Navbar />
      <main>
        <section className="py-20 bg-accent/20">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Gallery</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">Our campaign snapshots, creative work, and portfolio highlights.</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            {images.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">No images yet. Check back soon!</p>
            ) : (
              <>
                <div className="flex flex-wrap gap-2 justify-center mb-8">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setFilter(c)}
                      className={`px-4 py-2 text-sm rounded-full transition-colors ${filter === c ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-accent"}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                  {filtered.map((img) => (
                    <div key={img.id} className="break-inside-avoid cursor-pointer group" onClick={() => setSelected(img)}>
                      <img src={img.image_url} alt={img.caption || img.title} className="rounded-lg w-full shadow-card group-hover:shadow-elevated transition-shadow" />
                      {img.caption && <p className="text-xs text-muted-foreground mt-1">{img.caption}</p>}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
          <DialogContent className="max-w-3xl p-2">
            {selected && <img src={selected.image_url} alt={selected.caption || selected.title} className="w-full rounded-lg" />}
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </>
  );
}
