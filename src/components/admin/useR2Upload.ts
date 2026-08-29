"use client";

import { useRef, useState } from "react";
import { uploadToR2 } from "@/lib/upload-client";

export function useR2Upload() {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const keyRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File): Promise<boolean> {
    setUploading(true);
    setUploadError(null);
    const res = await uploadToR2(file);
    setUploading(false);
    if (!res.ok) {
      setUploadError(res.error);
      return false;
    }
    if (keyRef.current) keyRef.current.value = res.key;
    return true;
  }

  return { uploading, uploadError, keyRef, handleFile };
}
