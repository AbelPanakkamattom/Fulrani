import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type ImageItem = {
  id: string;
  title: string;
  image_url: string;
  caption: string | null;
  category: string | null;
  created_at: string;
};

export default function Gallery() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [selected, setSelected] = useState<ImageItem | null>(null);
  const [filter, setFilter] = useState("All");
  const [tab, setTab] = useState("images");

  useEffect(() => {
    supabase
      .from("images")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => setImages(data || []));
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(images.map((i) => i.category).filter(Boolean))),
  ];

  const filtered =
    filter === "All"
      ? images
      : images.filter((i) => i.category === filter);

  return (
    <>
      <SEO
        title="Gallery - Fulrani Advertising Portfolio, Blogs & Videos"
        description="Explore Fulrani Advertising's images, blogs, and videos showcasing creative campaigns, marketing insights, and portfolio work."
        keywords="advertising gallery, marketing blogs, campaign videos, portfolio, Fulrani gallery"
        path="/gallery"
      />

      <Navbar />

      <main>
        {/* HEADER */}
        <section className="py-20 bg-accent/20">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Gallery
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Images, Blogs & Videos
            </p>
          </div>
        </section>

        {/* TABS */}
        <div className="flex justify-center gap-4 my-8">
          {["images", "blogs", "videos"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-full text-sm ${
                tab === t
                  ? "bg-primary text-white"
                  : "bg-secondary hover:bg-accent"
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        {/* ================= IMAGES ================= */}
        {tab === "images" && (
          <section className="py-16">
            <div className="container">
              {images.length === 0 ? (
                <p className="text-center text-muted-foreground py-12">
                  No images yet.
                </p>
              ) : (
                <>
                  <div className="flex flex-wrap gap-2 justify-center mb-8">
                    {categories.map((c) => (
                      <button
                        key={c}
                        onClick={() => setFilter(c)}
                        className={`px-4 py-2 text-sm rounded-full ${
                          filter === c
                            ? "bg-primary text-white"
                            : "bg-secondary"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>

                  <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                    {filtered.map((img) => (
                      <div
                        key={img.id}
                        className="cursor-pointer"
                        onClick={() => setSelected(img)}
                      >
                        <img
                          src={img.image_url}
                          alt={img.title}
                          className="rounded-lg w-full"
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        )}

        {/* ================= BLOGS ================= */}
        {tab === "blogs" && (
          <section className="py-16">
            <div className="container space-y-6">
              <div className="p-6 border rounded-lg shadow">
                <h2 className="text-xl font-bold">
                  Why Digital Marketing is Important
                </h2>
                <p className="text-muted-foreground">
                  Digital marketing helps businesses grow online, reach targeted
                  audiences, and increase ROI.
                </p>
              </div>

              <div className="p-6 border rounded-lg shadow">
                <h2 className="text-xl font-bold">
                  Outdoor Advertising Trends in India
                </h2>
                <p className="text-muted-foreground">
                  Outdoor ads like hoardings and billboards still dominate brand
                  visibility in India.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ================= VIDEOS ================= */}
        {tab === "videos" && (
          <section className="py-16">
            <div className="container grid md:grid-cols-2 gap-6">
              <iframe
                className="w-full h-64 rounded"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Video"
                allowFullScreen
              />

              <iframe
                className="w-full h-64 rounded"
                src="https://www.youtube.com/embed/tgbNymZ7vqY"
                title="Video"
                allowFullScreen
              />
            </div>
          </section>
        )}

        {/* IMAGE POPUP */}
        <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
          <DialogContent className="max-w-3xl p-2">
            {selected && (
              <img
                src={selected.image_url}
                alt={selected.title}
                className="w-full rounded-lg"
              />
            )}
          </DialogContent>
        </Dialog>
      </main>

      <Footer />
    </>
  );
}