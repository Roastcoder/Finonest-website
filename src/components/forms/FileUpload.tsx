import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, FileText, Image, Loader2, CheckCircle } from "lucide-react";

interface FileUploadProps {
  label: string;
  accept?: string;
  maxSize?: number; // in MB
  onUpload: (file: File) => Promise<void>;
  onRemove?: () => void;
  hint?: string;
  className?: string;
}

const FileUpload = ({
  label,
  accept = "image/*,.pdf",
  maxSize = 5,
  onUpload,
  onRemove,
  hint,
  className = ""
}: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate file size
    if (selectedFile.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return;
    }

    setError(null);
    setFile(selectedFile);

    // Create preview for images
    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }

    // Auto upload
    setUploading(true);
    try {
      await onUpload(selectedFile);
      setUploaded(true);
    } catch (err) {
      setError("Failed to upload file");
      setFile(null);
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    setUploaded(false);
    setError(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    onRemove?.();
  };

  const getFileIcon = () => {
    if (!file) return <Upload className="w-8 h-8 text-muted-foreground" />;
    if (file.type.startsWith("image/")) return <Image className="w-8 h-8 text-primary" />;
    return <FileText className="w-8 h-8 text-primary" />;
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-foreground mb-2">
        {label}
      </label>
      
      <div
        className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all ${
          error
            ? "border-destructive bg-destructive/5"
            : uploaded
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={uploading}
        />

        {uploading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground mt-2">Uploading...</p>
          </div>
        ) : file ? (
          <div className="flex flex-col items-center">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg mb-2"
              />
            ) : (
              getFileIcon()
            )}
            <p className="text-sm font-medium text-foreground mt-2">{file.name}</p>
            <p className="text-xs text-muted-foreground">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
            {uploaded && (
              <div className="flex items-center gap-1 text-primary mt-2">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Uploaded</span>
              </div>
            )}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="mt-2"
            >
              <X className="w-4 h-4 mr-1" />
              Remove
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {getFileIcon()}
            <p className="text-sm text-muted-foreground mt-2">
              Drag & drop or click to upload
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Max size: {maxSize}MB
            </p>
          </div>
        )}
      </div>

      {hint && !error && (
        <p className="text-xs text-muted-foreground mt-2">{hint}</p>
      )}
      
      {error && (
        <p className="text-sm text-destructive mt-2">{error}</p>
      )}
    </div>
  );
};

export default FileUpload;
