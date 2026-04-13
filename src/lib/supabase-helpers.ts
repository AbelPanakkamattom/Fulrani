import { supabase } from "@/integrations/supabase/client";

export async function uploadMedia(file: File, folder: string): Promise<string> {
  const ext = file.name.split(".").pop();
  const fileName = `${folder}/${crypto.randomUUID()}.${ext}`;
  
  const { error } = await supabase.storage.from("media").upload(fileName, file);
  if (error) throw error;
  
  const { data } = supabase.storage.from("media").getPublicUrl(fileName);
  return data.publicUrl;
}

export async function deleteMediaFile(url: string) {
  try {
    const path = url.split("/media/")[1];
    if (path) {
      await supabase.storage.from("media").remove([path]);
    }
  } catch {
    // Ignore storage cleanup errors
  }
}
