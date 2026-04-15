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

type Video = { id: string; title: string; video_url: string; thumbnail_url: string | null; description: string | null; created_at: string };

export default function VideoManager() {
  const [items, setItems] = useState<Video[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Video | null>(null);
  const [form, setForm] = useState({ title: "", description: "" });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbFile, setThumbFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const refresh = async () => {
    const { data } = await supabase.from("videos").select("*").order("created_at", { ascending: false });
    setItems(data || []);
  };

  useEffect(() => { refresh(); }, []);

  const handleSave = async () => {
    if (!form.title.trim()) return;
    if (!editing && !videoFile) {
      toast({ title: "Please select a video file", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      let video_url = editing?.video_url || "";
      let thumbnail_url = editing?.thumbnail_url || null;

      if (videoFile) {
        video_url = await uploadMedia(videoFile, "videos");
      }
      if (thumbFile) {
        thumbnail_url = await uploadMedia(thumbFile, "thumbnails");
      }

      if (editing) {
        await supabase.from("videos").update({ ...form, video_url, thumbnail_url }).eq("id", editing.id);
        toast({ title: "Video updated" });
      } else {
        await supabase.from("videos").insert({ ...form, video_url, thumbnail_url });
        toast({ title: "Video added" });
      }
      setOpen(false);
      setEditing(null);
      setForm({ title: "", description: "" });
      setVideoFile(null);
      setThumbFile(null);
      refresh();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
    }
    setLoading(false);
  };

  const handleEdit = (item: Video) => {
    setEditing(item);
    setForm({ title: item.title, description: item.description || "" });
    setVideoFile(null);
    setThumbFile(null);
    setOpen(true);
  };

  const handleDelete = async (item: Video) => {
    await deleteMediaFile(item.video_url);
    if (item.thumbnail_url) await deleteMediaFile(item.thumbnail_url);
    await supabase.from("videos").delete().eq("id", item.id);
    toast({ title: "Video deleted" });
    refresh();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Videos ({items.length})</h3>
        <Button size="sm" onClick={() => { setEditing(null); setForm({ title: "", description: "" }); setVideoFile(null); setThumbFile(null); setOpen(true); }}>
          <Plus className="h-4 w-4 mr-1" /> Add Video
        </Button>
      </div>
      {items.length === 0 ? <p className="text-muted-foreground text-sm py-8 text-center">No videos yet.</p> : (
        <Table>
          <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Date</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {items.map((i) => (
              <TableRow key={i.id}>
                <TableCell className="font-medium max-w-[200px] truncate">{i.title}</TableCell>
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
          <DialogHeader><DialogTitle>{editing ? "Edit Video" : "Add Video"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <FileUpload accept="video/*" label="Upload Video" currentUrl={editing?.video_url} onFileSelected={setVideoFile} onClear={() => setVideoFile(null)} preview={false} />
            <FileUpload accept="image/*" label="Thumbnail (optional)" currentUrl={editing?.thumbnail_url || undefined} onFileSelected={setThumbFile} onClear={() => setThumbFile(null)} />
            <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
            <Button onClick={handleSave} className="w-full" disabled={loading}>{loading ? "Saving..." : editing ? "Update" : "Add"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
