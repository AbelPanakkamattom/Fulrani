CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Contact messages are publicly insertable" ON public.contact_messages FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Authenticated users can read messages" ON public.contact_messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can update messages" ON public.contact_messages FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete messages" ON public.contact_messages FOR DELETE TO authenticated USING (true);