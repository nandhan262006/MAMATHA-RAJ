"use client";

import { useRef, useState } from "react";
import { uploadToR2 } from "@/lib/upload-client";

export type UploadProgress = {
  percent: number;
  bytesUploaded: number;
  bytesTotal: number;
};

export function useR2Upload() {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [progress, setProgress] = useState<UploadProgress | null>(null);
  const keyRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File): Promise<boolean> {
    setUploading(true);
    setUploadError(null);
    setProgress({ percent: 0, bytesUploaded: 0, bytesTotal: file.size });
    const res = await uploadToR2(file, (loaded, total) => {
      setProgress({
        percent: total > 0 ? Math.round((loaded / total) * 100) : 0,
        bytesUploaded: loaded,
        bytesTotal: total,
      });
    });
    setUploading(false);
    setProgress(null);
    if (!res.ok) {
      setUploadError(res.error);
      return false;
    }
    if (keyRef.current) keyRef.current.value = res.key;
    return true;
  }

  return { uploading, uploadError, progress, keyRef, handleFile };
}
