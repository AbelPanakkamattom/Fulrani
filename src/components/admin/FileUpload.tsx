import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

interface FileUploadProps {
  accept: string;
  label: string;
  currentUrl?: string;
  onFileSelected: (file: File) => void;
  onClear?: () => void;
  preview?: boolean;
}

export default function FileUpload({ accept, label, currentUrl, onFileSelected, onClear, preview = true }: FileUploadProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    if (preview && file.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(file));
    }
    onFileSelected(file);
  };

  const displayUrl = previewUrl || currentUrl;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Button type="button" variant="outline" size="sm" onClick={() => ref.current?.click()}>
          <Upload className="h-4 w-4 mr-1" /> {label}
        </Button>
        {fileName && <span className="text-sm text-muted-foreground truncate max-w-[200px]">{fileName}</span>}
        {(displayUrl || fileName) && onClear && (
          <Button type="button" variant="ghost" size="icon" className="h-6 w-6" onClick={() => { setPreviewUrl(null); setFileName(""); onClear(); }}>
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
      {preview && displayUrl && (
        <img src={displayUrl} alt="Preview" className="h-24 w-auto rounded-md object-cover border" />
      )}
      {!preview && displayUrl && (
        <video src={displayUrl} className="h-24 w-auto rounded-md border" controls />
      )}
      <input ref={ref} type="file" accept={accept} className="hidden" onChange={handleChange} />
    </div>
  );
}
