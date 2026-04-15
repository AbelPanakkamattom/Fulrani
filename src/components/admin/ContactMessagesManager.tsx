import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Trash2, Mail, MailOpen } from "lucide-react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  read: boolean;
  created_at: string;
}

export default function ContactMessagesManager() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast({ title: "Error loading messages", variant: "destructive" });
    else setMessages(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchMessages(); }, []);

  const toggleRead = async (msg: ContactMessage) => {
    await supabase.from("contact_messages").update({ read: !msg.read }).eq("id", msg.id);
    fetchMessages();
  };

  const deleteMessage = async (id: string) => {
    await supabase.from("contact_messages").delete().eq("id", id);
    toast({ title: "Message deleted" });
    fetchMessages();
  };

  if (loading) return <p className="text-muted-foreground">Loading messages...</p>;
  if (!messages.length) return <p className="text-muted-foreground">No messages yet.</p>;

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div key={msg.id} className={`bg-card rounded-xl p-5 shadow-card border-l-4 ${msg.read ? "border-l-muted" : "border-l-primary"}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">{msg.name}</span>
                {!msg.read && <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">New</span>}
              </div>
              <p className="text-sm text-muted-foreground">{msg.email}{msg.phone ? ` • ${msg.phone}` : ""}</p>
              <p className="text-sm mt-2 whitespace-pre-wrap">{msg.message}</p>
              <p className="text-xs text-muted-foreground mt-2">{new Date(msg.created_at).toLocaleString()}</p>
            </div>
            <div className="flex gap-1 shrink-0">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleRead(msg)} title={msg.read ? "Mark unread" : "Mark read"}>
                {msg.read ? <MailOpen className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteMessage(msg.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
