"use client";

import { useState } from "react";
import axios from "axios";
import { isVideoUrl } from "@/lib/utils";

interface Props {
  label: string;
  folder?: string;
  value: string;
  onChange: (url: string) => void;
  accept?: string;
}

export function ImageUploader({
  label,
  folder = "uploads",
  value,
  onChange,
  accept = "image/*",
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const authResponse = await axios.get("/api/imagekit-auth");
      const authData = authResponse.data;

      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "fileName",
        `${folder}-${Date.now()}-${file.name}`
      );
      formData.append("folder", `portfolio/${folder}`);
      formData.append("publicKey", authData.publicKey);
      formData.append("signature", authData.signature);
      formData.append("expire", authData.expire);
      formData.append("token", authData.token);

      const response = await axios.post(
        "https://upload.imagekit.io/api/v1/files/upload",
        formData
      );

      onChange(response.data.url);
    } catch (err) {
      console.error(err);
      setError("Upload gagal, coba lagi.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div>
      <label className="block text-meta-xs tracking-widest text-muted mb-2">
        {label}
      </label>

      {value && !accept.startsWith("image") && !isVideoUrl(value) && (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="block mb-3 text-meta-sm font-mono text-accent break-all"
        >
          {value.split("/").pop()} ↗
        </a>
      )}

      {value && isVideoUrl(value) && (
        <video
          src={value}
          muted
          loop
          autoPlay
          playsInline
          className="mb-3 border border-line rounded-[10px] w-full max-w-xs aspect-video object-cover"
        />
      )}

      {value && accept.startsWith("image") && !isVideoUrl(value) && (
        <div className="mb-3 border border-line rounded-[10px] relative w-full max-w-xs aspect-video overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt={label}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        disabled={uploading}
        className="text-meta-sm font-mono text-muted file:mr-3 file:py-2 file:px-4 file:border file:border-line file:rounded-[9px] file:bg-base file:text-fg file:text-meta-xs file:tracking-widest file:cursor-pointer file:hover:border-accent file:transition-colors disabled:opacity-50"
      />

      {uploading && (
        <p className="text-meta-xs text-accent mt-2">Uploading...</p>
      )}
      {error && <p className="text-meta-xs text-accent2 mt-2">{error}</p>}
    </div>
  );
}
