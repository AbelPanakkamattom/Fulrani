import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { uploadMedia, deleteMediaFile } from "@/lib/supabase-helpers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";
import FileUpload from "./FileUpload";

type ImageItem = { id: string; title: string; image_url: string; caption: string | null; category: string | null; created_at: string };

export default function ImageManager() {
  const [items, setItems] = useState<ImageItem[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ImageItem | null>(null);
  const [form, setForm] = useState({ title: "", caption: "", category: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const refresh = async () => {
    const { data } = await supabase.from("images").select("*").order("created_at", { ascending: false });
    setItems(data || []);
  };

  useEffect(() => { refresh(); }, []);

  const handleSave = async () => {
    if (!form.title.trim()) return;
    if (!editing && !imageFile) {
      toast({ title: "Please select an image file", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      let image_url = editing?.image_url || "";

      if (imageFile) {
        image_url = await uploadMedia(imageFile, "images");
      }

      if (editing) {
        await supabase.from("images").update({ ...form, image_url }).eq("id", editing.id);
        toast({ title: "Image updated" });
      } else {
        await supabase.from("images").insert({ ...form, image_url });
        toast({ title: "Image added" });
      }
      setOpen(false);
      setEditing(null);
      setForm({ title: "", caption: "", category: "" });
      setImageFile(null);
      refresh();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
    setLoading(false);
  };

  const handleEdit = (item: ImageItem) => {
    setEditing(item);
    setForm({ title: item.title, caption: item.caption || "", category: item.category || "" });
    setImageFile(null);
    setOpen(true);
  };

  const handleDelete = async (item: ImageItem) => {
    await deleteMediaFile(item.image_url);
    await supabase.from("images").delete().eq("id", item.id);
    toast({ title: "Image deleted" });
    refresh();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Images ({items.length})</h3>
        <Button size="sm" onClick={() => { setEditing(null); setForm({ title: "", caption: "", category: "" }); setImageFile(null); setOpen(true); }}>
          <Plus className="h-4 w-4 mr-1" /> Add Image
        </Button>
      </div>
      {items.length === 0 ? <p className="text-muted-foreground text-sm py-8 text-center">No images yet.</p> : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((i) => (
            <div key={i.id} className="relative group rounded-lg overflow-hidden shadow-card">
              <img src={i.image_url} alt={i.title} className="w-full h-32 object-cover" />
              <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button size="icon" variant="secondary" onClick={() => handleEdit(i)}><Pencil className="h-4 w-4" /></Button>
                <Button size="icon" variant="destructive" onClick={() => handleDelete(i)}><Trash2 className="h-4 w-4" /></Button>
              </div>
              <p className="text-xs p-2 truncate">{i.title}</p>
            </div>
          ))}
        </div>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Edit Image" : "Add Image"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <FileUpload accept="image/*" label="Upload Image (PNG, JPG, etc.)" currentUrl={editing?.image_url} onFileSelected={setImageFile} onClear={() => setImageFile(null)} />
            <Input placeholder="Caption (optional)" value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} />
            <Input placeholder="Category (e.g. Campaign, Portfolio)" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <Button onClick={handleSave} className="w-full" disabled={loading}>{loading ? "Saving..." : editing ? "Update" : "Add"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
