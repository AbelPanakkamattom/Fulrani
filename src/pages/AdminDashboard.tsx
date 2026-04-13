import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authStore, blogStore, videoStore, imageStore, type BlogPost, type VideoPost, type ImagePost } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Plus, Pencil, Trash2, FileText, Video, Image } from "lucide-react";
import Navbar from "@/components/Navbar";

function BlogManager() {
  const [items, setItems] = useState<BlogPost[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState({ title: "", excerpt: "", content: "", image: "", author: "" });
  const { toast } = useToast();

  const refresh = () => setItems(blogStore.getAll());
  useEffect(refresh, []);

  const handleSave = () => {
    if (!form.title.trim()) return;
    if (editing) {
      blogStore.update(editing.id, form);
      toast({ title: "Blog updated" });
    } else {
      blogStore.add(form);
      toast({ title: "Blog added" });
    }
    setOpen(false);
    setEditing(null);
    setForm({ title: "", excerpt: "", content: "", image: "", author: "" });
    refresh();
  };

  const handleEdit = (item: BlogPost) => {
    setEditing(item);
    setForm({ title: item.title, excerpt: item.excerpt, content: item.content, image: item.image, author: item.author });
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    blogStore.delete(id);
    toast({ title: "Blog deleted" });
    refresh();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Blog Posts ({items.length})</h3>
        <Button size="sm" onClick={() => { setEditing(null); setForm({ title: "", excerpt: "", content: "", image: "", author: "" }); setOpen(true); }}>
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
                <TableCell>{new Date(i.date).toLocaleDateString()}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="icon" variant="ghost" onClick={() => handleEdit(i)}><Pencil className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(i.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
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
            <Input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            <Input placeholder="Short excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
            <Textarea placeholder="Full content" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={6} />
            <Button onClick={handleSave} className="w-full">{editing ? "Update" : "Publish"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function VideoManager() {
  const [items, setItems] = useState<VideoPost[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<VideoPost | null>(null);
  const [form, setForm] = useState({ title: "", url: "", thumbnail: "", description: "" });
  const { toast } = useToast();

  const refresh = () => setItems(videoStore.getAll());
  useEffect(refresh, []);

  const handleSave = () => {
    if (!form.title.trim() || !form.url.trim()) return;
    if (editing) {
      videoStore.update(editing.id, form);
      toast({ title: "Video updated" });
    } else {
      videoStore.add(form);
      toast({ title: "Video added" });
    }
    setOpen(false);
    setEditing(null);
    setForm({ title: "", url: "", thumbnail: "", description: "" });
    refresh();
  };

  const handleEdit = (item: VideoPost) => {
    setEditing(item);
    setForm({ title: item.title, url: item.url, thumbnail: item.thumbnail, description: item.description });
    setOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Videos ({items.length})</h3>
        <Button size="sm" onClick={() => { setEditing(null); setForm({ title: "", url: "", thumbnail: "", description: "" }); setOpen(true); }}>
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
                <TableCell>{new Date(i.date).toLocaleDateString()}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="icon" variant="ghost" onClick={() => handleEdit(i)}><Pencil className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => videoStore.delete(i.id) || refresh()}><Trash2 className="h-4 w-4 text-destructive" /></Button>
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
            <Input placeholder="YouTube URL" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
            <Input placeholder="Thumbnail URL (optional)" value={form.thumbnail} onChange={(e) => setForm({ ...form, thumbnail: e.target.value })} />
            <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
            <Button onClick={handleSave} className="w-full">{editing ? "Update" : "Add"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ImageManager() {
  const [items, setItems] = useState<ImagePost[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ImagePost | null>(null);
  const [form, setForm] = useState({ title: "", url: "", caption: "", category: "" });
  const { toast } = useToast();

  const refresh = () => setItems(imageStore.getAll());
  useEffect(refresh, []);

  const handleSave = () => {
    if (!form.title.trim() || !form.url.trim()) return;
    if (editing) {
      imageStore.update(editing.id, form);
      toast({ title: "Image updated" });
    } else {
      imageStore.add(form);
      toast({ title: "Image added" });
    }
    setOpen(false);
    setEditing(null);
    setForm({ title: "", url: "", caption: "", category: "" });
    refresh();
  };

  const handleEdit = (item: ImagePost) => {
    setEditing(item);
    setForm({ title: item.title, url: item.url, caption: item.caption, category: item.category });
    setOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Images ({items.length})</h3>
        <Button size="sm" onClick={() => { setEditing(null); setForm({ title: "", url: "", caption: "", category: "" }); setOpen(true); }}>
          <Plus className="h-4 w-4 mr-1" /> Add Image
        </Button>
      </div>
      {items.length === 0 ? <p className="text-muted-foreground text-sm py-8 text-center">No images yet.</p> : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((i) => (
            <div key={i.id} className="relative group rounded-lg overflow-hidden shadow-card">
              <img src={i.url} alt={i.title} className="w-full h-32 object-cover" />
              <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button size="icon" variant="secondary" onClick={() => handleEdit(i)}><Pencil className="h-4 w-4" /></Button>
                <Button size="icon" variant="destructive" onClick={() => { imageStore.delete(i.id); refresh(); }}><Trash2 className="h-4 w-4" /></Button>
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
            <Input placeholder="Image URL (png, jpg, etc.)" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
            <Input placeholder="Caption (optional)" value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} />
            <Input placeholder="Category (e.g. Campaign, Portfolio)" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <Button onClick={handleSave} className="w-full">{editing ? "Update" : "Add"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!authStore.isLoggedIn()) navigate("/admin");
  }, [navigate]);

  const handleLogout = () => {
    authStore.logout();
    toast({ title: "Logged out" });
    navigate("/admin");
  };

  if (!authStore.isLoggedIn()) return null;

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
