import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { uploadMedia, deleteMediaFile } from "@/lib/supabase-helpers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";
import FileUpload from "./FileUpload";

type Blog = { id: string; title: string; excerpt: string | null; content: string | null; image_url: string | null; author: string | null; created_at: string };

export default function BlogManager() {
  const [items, setItems] = useState<Blog[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Blog | null>(null);
  const [form, setForm] = useState({ title: "", excerpt: "", content: "", author: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const refresh = async () => {
    const { data } = await supabase.from("blogs").select("*").order("created_at", { ascending: false });
    setItems(data || []);
  };

  useEffect(() => { refresh(); }, []);

  const handleSave = async () => {
    if (!form.title.trim()) return;
    setLoading(true);
    try {
      let image_url = editing?.image_url || null;
      if (imageFile) {
        image_url = await uploadMedia(imageFile, "blogs");
      }

      if (editing) {
        await supabase.from("blogs").update({ ...form, image_url }).eq("id", editing.id);
        toast({ title: "Blog updated" });
      } else {
        await supabase.from("blogs").insert({ ...form, image_url });
        toast({ title: "Blog added" });
      }
      setOpen(false);
      setEditing(null);
      setForm({ title: "", excerpt: "", content: "", author: "" });
      setImageFile(null);
      refresh();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
    setLoading(false);
  };

  const handleEdit = (item: Blog) => {
    setEditing(item);
    setForm({ title: item.title, excerpt: item.excerpt || "", content: item.content || "", author: item.author || "" });
    setImageFile(null);
    setOpen(true);
  };

  const handleDelete = async (item: Blog) => {
    if (item.image_url) await deleteMediaFile(item.image_url);
    await supabase.from("blogs").delete().eq("id", item.id);
    toast({ title: "Blog deleted" });
    refresh();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Blog Posts ({items.length})</h3>
        <Button size="sm" onClick={() => { setEditing(null); setForm({ title: "", excerpt: "", content: "", author: "" }); setImageFile(null); setOpen(true); }}>
          <Plus className="h-4 w-4 mr-1" /> Add Blog
        </Button>
      </div>
      {items.length === 0 ? <p className="text-muted-foreground text-sm py-8 text-center">No blog posts yet.</p> : (
        <Table>
          <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Author</TableHead><TableHead>Date</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {items.map((i) => (
              <TableRow key={i.id}>
                <TableCell className="font-medium max-w-[200px] truncate">{i.title}</TableCell>
                <TableCell>{i.author}</TableCell>
                <TableCell>{new Date(i.created_at).toLocaleDateString()}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="icon" variant="ghost" onClick={() => handleEdit(i)}><Pencil className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(i)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Edit Blog" : "New Blog Post"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <Input placeholder="Author" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
            <FileUpload accept="image/*" label="Upload Image" currentUrl={editing?.image_url || undefined} onFileSelected={setImageFile} onClear={() => setImageFile(null)} />
            <Input placeholder="Short excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
            <Textarea placeholder="Full content" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={6} />
            <Button onClick={handleSave} className="w-full" disabled={loading}>{loading ? "Saving..." : editing ? "Update" : "Publish"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
